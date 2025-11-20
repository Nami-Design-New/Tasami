import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useDeleteEmployeeAttachment() {
  const { mutate: deleteEmployeeFiles, isPending } = useMutation({
    mutationFn: async (fileId) => {
      const res = await adminAxiosInstance.delete(
        `dh-employee-files/${fileId}`
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Deleting attachment");
      }

      return res.data;
    },
  });
  return { deleteEmployeeFiles, isPending };
}
