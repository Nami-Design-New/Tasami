import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useCreateChatRoom() {
  const { mutate: createChatRoom, isPending } = useMutation({
    mutationFn: async ({ chater_id, chater_type }) => {
      const res = await adminAxiosInstance.post("dh-chats", null, {
        params: { chater_id, chater_type },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });

  return { createChatRoom, isPending };
}
