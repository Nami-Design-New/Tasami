import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useAddNewSpecialization() {
  const { mutate: addNewSpecialization, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-subcategories", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error Adding new Category");
      }
      return res.data;
    },
  });
  return { addNewSpecialization, isPending };
}
