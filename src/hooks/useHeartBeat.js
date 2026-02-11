// hooks/useHeartbeat.js
"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export function useHeartbeat(chatId, interval = 20000) {
  console.log(chatId);

  const query = useQuery({
    queryKey: ["heartbeat", chatId],
    queryFn: async () => {
      const res = await axiosInstance.post("heartbeat", { chat_id: chatId });
      return res.data;
    },
    refetchInterval: interval,
    enabled: !!chatId,
  });

  return query; // { data, isLoading, isError, error }
}
