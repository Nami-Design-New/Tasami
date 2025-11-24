import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function usePostAddTaskFile() {
  const { mutate: addTaskFile } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-task-files`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });
  return { addTaskFile };
}
