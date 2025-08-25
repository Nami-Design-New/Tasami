import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useUpdateUserCategories() {
  const { mutate: updateUserCategories, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/user-categories", data);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { updateUserCategories, isPending };
}
