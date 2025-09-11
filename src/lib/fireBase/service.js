import { axiosInstance } from "../axios";
import { getToken, messaging, onMessage } from "./config";
import { toast } from "sonner";

const sendTokenToServer = async (token) => {
  const prevToken = localStorage.getItem("firebase_token");
  console.log("[FCM] Previous token:", prevToken);
  console.log("[FCM] New token:", token);

  if (prevToken === token) {
    console.log("[FCM] Token unchanged, not sending to server");
    return;
  }

  try {
    console.log("[FCM] Sending token to server...");
    const response = await axiosInstance.post("/auth/firebase-token", {
      token,
      type: "web",
    });

    console.log("[FCM] Server response:", response.status, response.data);

    if (response.status === 200) {
      localStorage.setItem("firebase_token", token);
      console.log("[FCM] Token saved to localStorage");
    }
  } catch (error) {
    console.error("[FCM] Error sending token to server:", error);
  }
};

const requestPermission = async () => {
  console.log("[FCM] Requesting notification permission...");

  try {
    const permission = await Notification.requestPermission();
    console.log("[FCM] Permission result:", permission);

    if (permission !== "granted") {
      console.warn("[FCM] Permission not granted, aborting");
      return;
    }

    console.log("[FCM] Registering service worker...");
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    if (registration) {
      console.log(
        "[FCM] Service worker registered successfully:",
        registration
      );
    }

    console.log("[FCM] Service worker registered, waiting until active...");

    // 🔑 Ensure service worker is active
    await navigator.serviceWorker.ready;

    console.log("[FCM] Getting FCM token...");
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("[FCM] Token retrieved:", token);
      await sendTokenToServer(token);
    } else {
      console.warn("[FCM] No token retrieved");
    }
  } catch (error) {
    console.error("[FCM] Error getting permission or token:", error);
  }
};

const listenToMessages = (refetchSettings, refetchNotifications) => {
  console.log("[FCM] Setting up onMessage listener...");

  const unsubscribe = onMessage(messaging, (payload) => {
    try {
      console.log("[FCM] Foreground message received:", payload);

      const { notification } = payload;
      console.log("[FCM] Notification object:", notification);

      if (!notification || Notification.permission !== "granted") {
        console.warn("[FCM] No notification or permission denied, skipping");
        return;
      }

      if (document.visibilityState === "visible") {
        console.log("[FCM] Document visible, updating queries...");
        updateQueries(refetchSettings, refetchNotifications, payload);
        // return;
      }

      const title = notification.title || "New Notification";
      const options = {
        body: notification.body || "",
        icon: "https://via.placeholder.com/128  ",
        tag: "notification",
        data: payload.data,
      };

      console.log("[FCM] Showing foreground notification:", {
        title,
        options,
      });

      new Notification(title, options);
      toast.info(payload.notification?.title);

      console.log("[FCM] Updating queries after notification");
      updateQueries(refetchSettings, refetchNotifications, payload);
    } catch (error) {
      console.error("[FCM] Error handling incoming message:", error);
    }
  });

  return unsubscribe;
};

const updateQueries = (refetchSettings, refetchNotifications, payload) => {
  console.log("[FCM] updateQueries triggered with payload:", payload);

  refetchNotifications();
  refetchSettings();

  if (payload.data?.notification_type === "wallet" && payload.data?.order_id) {
    console.log("[FCM] Wallet notification, refetching again");
    refetchSettings();
    refetchNotifications();
  }
};

export { requestPermission, listenToMessages };
