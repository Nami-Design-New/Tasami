import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useEditCV() {
  const { mutate: editCV, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/my-profile", {
        ...data,
      });

      if (res.data.code !== 200) {
        throw new Error("Failed to edit CV");
      }

      return res.data;
    },
  });
  return { editCV, isPending };
}
