import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useEditPermissions() {
  const { mutate: editPermissions, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(
        "dh-employee-permissions",
        payload
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error fetching data");
      }

      return res.data;
    },
  });
  return { editPermissions, isPending };
}
