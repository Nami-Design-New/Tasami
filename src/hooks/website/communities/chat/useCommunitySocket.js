import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useCommunitySocket(onNewMessage) {
  const socketRef = useRef();

  useEffect(() => {
    // Connect to backend socket server
    socketRef.current = io("http://192.168.1.44:8000/api/");

    // Listen for the backend event
    socketRef.current.on("communityMessageSent", (message) => {
      onNewMessage?.(message);
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [onNewMessage]);

  return socketRef.current;
}
