import { axiosInstance } from "../axios";
import { getToken, messaging, onMessage } from "./config";
import { toast } from "sonner";

const sendTokenToServer = async (token) => {
  const prevToken = localStorage.getItem("firebase_token");

  if (prevToken === token) {
    return;
  }

  try {
    const response = await axiosInstance.post("/auth/firebase-token", {
      token,
      type: "web",
    });

    if (response.status === 200) {
      localStorage.setItem("firebase_token", token);
    }
  } catch (error) {
    console.error("[FCM] Error sending token to server:", error);
  }
};

const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    // 🔑 Ensure service worker is active
    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      await sendTokenToServer(token);
    } else {
      console.warn("[FCM] No token retrieved");
    }
  } catch (error) {
    console.error("[FCM] Error getting permission or token:", error);
  }
};

const listenToMessages = (refetchSettings, refetchNotifications) => {
  const unsubscribe = onMessage(messaging, (payload) => {
    try {
      const { notification } = payload;

      if (!notification || Notification.permission !== "granted") {
        return;
      }

      if (document.visibilityState === "visible") {
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

      new Notification(title, options);
      toast.info(payload.notification?.title);

      updateQueries(refetchSettings, refetchNotifications, payload);
    } catch (error) {
      console.error("[FCM] Error handling incoming message:", error);
    }
  });

  return unsubscribe;
};

const updateQueries = (refetchSettings, refetchNotifications, payload) => {
  refetchNotifications();
  refetchSettings();

  if (payload.data?.notification_type === "wallet" && payload.data?.order_id) {
    refetchSettings();
    refetchNotifications();
  }
};

export { requestPermission, listenToMessages };
