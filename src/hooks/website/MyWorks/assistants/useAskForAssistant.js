import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useAskForAssistant() {
  const { mutate: askForAssistant, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("ask-for-helper", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { askForAssistant, isPending };
}
