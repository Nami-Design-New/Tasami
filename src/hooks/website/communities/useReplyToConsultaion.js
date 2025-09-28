import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useReplyToConsultaion() {
  const { id } = useParams();
  const { mutate: replyToConsultaion, isPending } = useMutation({
    mutationFn: async (answer) => {
      const res = await axiosInstance.put(`consultations/${id}`, null, {
        params: {
          answer,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to reply to consultaion");
      }
      return res.data;
    },
  });
  return { replyToConsultaion, isPending };
}
