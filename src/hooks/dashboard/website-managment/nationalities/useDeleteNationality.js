import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteNationality() {
  const { mutate: deleteNationality, isPending: isDeletingNationality } =
    useMutation({
      mutationFn: async (id) => {
        const res = await adminAxiosInstance.delete(`dh-nationalities/${id}`);
        if (res.data.code !== 200) {
          throw new Error(res.data.message || "Failed to delete nationality");
        }
        return res.data;
      },
    });
  return { deleteNationality, isDeletingNationality };
}
