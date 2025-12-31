import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteDhConsultation() {
  const { mutate: deleteDhConsultation, isPending: isDeletingDhConsultation } =
    useMutation({
      mutationFn: async (id) => {
        const res = await adminAxiosInstance.delete(
          `dh-community-consultations/${id}`
        );
        if (res.data.code !== 200) {
          throw new Error(res.data.message || "Something went wrong");
        }
        return res.data;
      },
    });
  return { deleteDhConsultation, isDeletingDhConsultation };
}
