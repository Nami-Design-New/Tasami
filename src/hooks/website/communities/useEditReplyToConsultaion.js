import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useEditReplyToConsultation() {
  const { id } = useParams();
  const { mutate: editReplyToConsultation, isPending } = useMutation({
    mutationFn: async (answer) => {
      const res = await axiosInstance.put(`consultations-update/${id}`, null, {
        params: {
          answer,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to edit reply to consultation");
      }
      return res.data;
    },
  });
  return { editReplyToConsultation, isPending };
}
