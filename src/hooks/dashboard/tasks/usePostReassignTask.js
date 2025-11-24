import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function usePostReassignTask() {
  const { mutate: reassignTask, isPending: isReassigning } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-task-resend`, payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { reassignTask, isReassigning };
}
