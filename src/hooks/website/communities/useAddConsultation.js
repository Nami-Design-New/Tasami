import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useAddConsultation() {
  const { mutate: addConsultaion, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("consultations", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error add consultaion");
      }
      return res.data;
    },
  });

  return { addConsultaion, isPending };
}
