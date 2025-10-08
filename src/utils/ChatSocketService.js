import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";

window.Pusher = Pusher;

export class ChatSocketService {
  constructor() {
    this.echo = null;
    this.messageCallback = null;
  }

  onMessage(callback) {
    this.messageCallback = callback;
  }

  connectPrivate({ token, communityId }) {
    const api = axios.create({
      baseURL: "http://192.168.1.44:8000/",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.echo = new Echo({
      broadcaster: "pusher",
      key: "qnhndime6vasnevta7py",
      wsHost: "192.168.1.44",
      wsPort: 8080,
      forceTLS: false,
      encrypted: false,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
      cluster: "mt1",

      authorizer: (channel, options) => ({
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

    this.echo
      .private(`communitychat.${communityId}`)
      .listen("CommunityMessageSent", (event) => {
        console.log("New message:", event.message);
        if (this.messageCallback) {
          console.log(this.messageCallback);

          this.messageCallback(event.message);
        }
      });

    console.log(`Subscribed to private-communitychat.${communityId}`);
  }

  disconnect() {
    if (this.echo) {
      this.echo.disconnect();
      console.log("Disconnected");
    }
  }
}
