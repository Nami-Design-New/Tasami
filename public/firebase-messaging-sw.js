/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

console.log("[SW] Loading firebase-messaging-sw.js...");

firebase.initializeApp({
  apiKey: "AIzaSyBlnHC6QbOODn6lqOYy9QdD9ouTJIK4sYA",
  authDomain: "tasamii.firebaseapp.com",
  projectId: "tasamii",
  storageBucket: "tasamii.firebasestorage.app",
  messagingSenderId: "344403740571",
  appId: "1:344403740571:web:1cbe4898845c49f7fe433e",
  measurementId: "G-5XL214WKTJ",
});

console.log("[SW] Firebase initialized");

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[SW] Received background message:", payload);

  const title =
    payload.notification?.title || payload.data?.title || "New Notification";
  const body =
    payload.notification?.body || payload.data?.body || "You have a message";

  console.log("[SW] Extracted title:", title);
  console.log("[SW] Extracted body:", body);
  console.log("[SW] Notification data:", payload.data);

  const notificationOptions = {
    body,
    icon: "https://via.placeholder.com/128",
    data: payload.data,
    tag: "notification",
    requireInteraction: true,
    actions: [
      {
        action: "open",
        title: "Open",
      },
    ],
  };

  console.log("[SW] Showing notification with options:", notificationOptions);

  self.registration
    .showNotification(title, options)
    .then(() => console.log("[SW] showNotification SUCCESS"))
    .catch((err) => console.error("[SW] showNotification FAILED:", err));
});

self.addEventListener("notificationclick", function (event) {
  console.log("[SW] Notification clicked:", event.notification);

  event.notification.close();

  const urlToOpen = new URL("/", self.location.origin).href;
  console.log("[SW] Target URL:", urlToOpen);

  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      console.log("[SW] Existing window clients:", windowClients);

      let matchingClient = null;
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        console.log("[SW] Checking window client:", windowClient.url);
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        console.log("[SW] Found matching client, focusing...");
        return matchingClient.focus();
      } else {
        console.log("[SW] No matching client, opening new window...");
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});

console.log("[SW] firebase-messaging-sw.js ready");
