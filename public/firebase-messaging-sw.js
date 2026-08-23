/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js",
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

  self.registration
    .showNotification(title, notificationOptions)
    .then(() => console.log("[SW] showNotification SUCCESS"))
    .catch((err) => console.error("[SW] showNotification FAILED:", err));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const notificationType = data.notification_type || data.type;
  const operationId = data.operation_id;
  const communityId = data.community_id;
  let url = "/";

  switch (notificationType) {
    case "wallet":
      url = `/my-profile/my-wallet`;
      break;
    case "package":
      url = `/my-platform`;
      break;
    case "offer_accepted":
      url = `/my-contracts/${operationId}`;
      break;
    case "contract_request":
      url = `/my-contracts/${operationId}`;
      break;
    case "help_service":
      url = `/offers/${operationId}`;
      break;
    case "goal":
      url = `/goal/${operationId}`;
      break;
    case "follow":
      url = `/my-platform/my-audience?tab=followers`;
      break;
    case "community_new_member":
      url = `/my-platform/my-audience?tab=members`;
      break;
    case "consultation":
      url = `/consultaion-details/${operationId}`;
      break;
    case "inquiry":
      url = `/notifications?tab=inquries`;
      break;
    case "meeting":
      url =
        operationId && communityId
          ? `/community/${communityId}/meetings?meeting_id=${operationId}`
          : "/notifications";
      break;
    case "post":
      url = `/posts/${operationId}`;
      break;
    case "comment":
      url = `/posts/${operationId}`;
      break;
    case "offer":
      url = `/my-works/${operationId}`;
      break;
    case "work":
      url = `/goal/${operationId}`;
      break;
    case "general":
      url = `/notifications`;
      break;
    case "community_chat":
      url = `/community/${operationId}/chats/`;
      break;
    case "task":
      url = `/tasks/${operationId}/`;
      break;
    case "group_chat":
      url = `/chat/${operationId}`;
      break;
    case "contract":
      url = `/my-contracts/${operationId}/beneficiaries`;
      break;
    default:
      url = "/";
  }

  event.waitUntil(
    (async () => {
      const windowClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        if (client.url.includes(self.location.origin)) {
          await client.focus();
          return client.navigate(url);
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })(),
  );
});
