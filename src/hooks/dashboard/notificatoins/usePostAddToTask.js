import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function usePostAddToTask() {
  const { mutate: addToTask, isPending: isAddingToTask } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-tasks-notifications`, payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { addToTask, isAddingToTask };
}
