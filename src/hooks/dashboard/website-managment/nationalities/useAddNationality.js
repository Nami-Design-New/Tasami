import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useAddNationality() {
  const { mutate: addNationality, isPending: isAddingNationality } =
    useMutation({
      mutationFn: async (payload) => {
        const res = await adminAxiosInstance.post("dh-nationalities", payload);
        if (res.data.code !== 200) {
          throw new Error(res.data.message || "Error adding dh nationality");
        }
        return res.data;
      },
    });

  return { addNationality, isAddingNationality };
}
