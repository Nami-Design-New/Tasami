import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useUpdateNationality() {
  const { mutate: updateNationality, isPending: isUpdatingNationality } =
    useMutation({
      mutationFn: async ({ id, ...payload }) => {
        const res = await adminAxiosInstance.post(
          `dh-nationalities/${id}}`,
          payload
        );
        if (res.data.code !== 200) {
          throw new Error(res.data.message || "Error updating dh nationality");
        }
        return res.data;
      },
    });

  return { updateNationality, isUpdatingNationality };
}
