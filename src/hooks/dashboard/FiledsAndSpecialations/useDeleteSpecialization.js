import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useDeleteSpecialization() {
  const { mutate: deleteSpecialization, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await adminAxiosInstance.delete(`dh-subcategories/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.message || "Error Deleting Specialization");
      }
      return res.data;
    },
  });
  return { deleteSpecialization, isPending };
}
