import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useShareConsultation() {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.post("consultation-share", {
        consultation_id: id,
      });
      if (data.code !== 200) {
        throw new Error("Error sharing consultation");
      }
      return data;
    },
  });
}
