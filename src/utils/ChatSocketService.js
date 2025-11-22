import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";

window.Pusher = Pusher;

export class ChatSocketService {
  constructor() {
    this.echo = null;
    this.messageCallback = null;
    this.statusCallback = null;
  }

  onMessage(callback) {
    this.messageCallback = callback;
  }

  onStatusChange(callback) {
    this.statusCallback = callback;
  }

  connectPrivate({ token, communityId }) {
    const api = axios.create({
      baseURL: import.meta.env.VITE_API_URL_SOCKET,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
      cluster: "mt1",
      authorizer: (channel) => ({
        authorize: (socketId, callback) => {
          api
            .post("/broadcasting/auth", {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then((response) => callback(false, response.data))
            .catch((error) => callback(true, error));
        },
      }),
    });

    // --- Debug connection states ---
    const connection = this.echo.connector.pusher.connection;

    connection.bind("connecting", () => {
      // console.log("🟡 Connecting to socket...");
      this.statusCallback?.("connecting");
    });

    connection.bind("connected", () => {
      // console.log("🟢 Socket connected successfully!");
      this.statusCallback?.("connected");
    });

    connection.bind("disconnected", () => {
      // console.log("🔴 Socket disconnected!");
      this.statusCallback?.("disconnected");
    });

    connection.bind("error", (error) => {
      // console.error("⚠️ Socket connection error:", error);
      this.statusCallback?.("error");
    });

    connection.bind("state_change", (state) => {
      // console.log("🔄 Socket state change:", state);
    });

    // --- Listen to channel messages ---
    this.echo
      .private(`communitychat.${communityId}`)
      .listen("CommunityMessageSent", (event) => {
        // console.log("📨 New message received via socket:", event.message);
        // console.log("📨 Event received via socket:", event);
        this.messageCallback?.(event.message);
      });

    // console.log(`✅ Subscribed to private-communitychat.${communityId}`);
  }

  disconnect() {
    if (this.echo) {
      this.echo.disconnect();
      // console.log("🔌 Socket manually disconnected");
    }
  }
}
