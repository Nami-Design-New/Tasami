import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteAccount() {
  const { mutate: deleteAccount, isPending: isDeletingAccount } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`auth/my-profile/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { deleteAccount, isDeletingAccount };
}
