import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useEditSpecialization() {
  const { mutate: editSpecialization, isPending } = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await adminAxiosInstance.post(
        `dh-subcategories/${id}`,
        payload
      );

      if (res.data.code !== 200) {
        throw new Error(res.message || "Error Editing Specialization");
      }
      return res.data;
    },
  });
  return { editSpecialization, isPending };
}
