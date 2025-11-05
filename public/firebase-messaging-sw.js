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

  switch (data.notification_type) {
    case "wallet":
      url = `/my-profile/my-wallet`;
      break;
    case "package":
      url = `/my-platform`;
      break;
    case "offer_accepted":
      url = `/my-works/${data?.operation_id}`;
      break;
    case "contract_request":
      url = `/my-contracts/${data?.operation_id}`;
      break;
    case "help_service ":
      url = `/offers/${data?.operation_id}`;
      break;
    case "goal":
      url = `/goal/${data?.operation_id}`;
      break;
    case "follow":
      url = `/my-audience`;
      break;
    case "community_new_member":
      url = `/my-audience`;
      break;
    case "consultation":
      url = `/consultaion-details/${data.operation_id}`;
      break;
    case "inquiry":
      url = `/notifications?tab=inquries`;
      break;
    case "meeting":
      url = `my-community/meetings`;
      break;
    case "post":
      url = `/posts/${data.operation_id}`;
      break;
    case "comment":
      url = `/posts/${data.operation_id}`;
      break;
    case "offer":
      url = `/goal/${data?.operation_id}`;
      break;
    case "work":
      url = `/goal/${data?.operation_id}`;
      break;
    case "general":
      url = `/notifications`;
      break;
    case "community_chat":
      url = `/community/${data.operation_id}/chats/`;
      break;
    case "group_chat":
      url = `/chat/${data.operation_id}`;
      break;
    default:
      url = "/ ";
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
