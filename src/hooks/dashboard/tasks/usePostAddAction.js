import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function usePostAddAction() {
  const { mutate: addAction, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-task-actions`, payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { addAction, isPending };
}
