/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBlnHC6QbOODn6lqOYy9QdD9ouTJIK4sYA",
  authDomain: "tasamii.firebaseapp.com",
  projectId: "tasamii",
  storageBucket: "tasamii.firebasestorage.app",
  messagingSenderId: "344403740571",
  appId: "1:344403740571:web:1cbe4898845c49f7fe433e",
  measurementId: "G-5XL214WKTJ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const title =
    payload.notification?.title || payload.data?.title || "New Notification";
  const body =
    payload.notification?.body || payload.data?.body || "You have a message";

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

self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked:", event.notification);

  event.notification.close();

  const data = event.notification.data || {};
  let url = "/";

  // 🔀 Route based on type
  switch (data.notification_type) {
    case "wallet":
      url = `/wallet/${data.order_id}`;
      break;
    case "order":
      url = `/orders/${data.order_id}`;
      break;
    case "chat":
      url = `/chat/${data.chat_id}`;
      break;
    default:
      url = "/";
  }

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Check if an app tab is already open
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin)) {
            client.focus();
            // You can also communicate to your React app if needed:
            // client.postMessage({ action: "navigate", url });
            return client.navigate(url);
          }
        }
        // Otherwise open a new tab
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
