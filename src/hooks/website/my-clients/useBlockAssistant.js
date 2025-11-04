import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useBlockAssistant() {
  const { mutate: blockAssistant, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post("clients-of-helper", {
        to_user_id: id,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Block Assistance");
      }
      return res.data;
    },
  });
  return { blockAssistant, isPending };
}
