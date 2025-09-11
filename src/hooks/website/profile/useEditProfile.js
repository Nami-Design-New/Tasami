import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useEditProfile() {
  const { mutate: editProfile, isPending: isEditingProfile } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("auth/my-profile", payload);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }

      return res.data;
    },
  });
  return { editProfile, isEditingProfile };
}
