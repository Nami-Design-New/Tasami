import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useEditWorkingGroup() {
  const { mutate: editWorkingGroup, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(
        `/dh-working-groups/${payload?.id}`,
        payload
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Editing working group");
      }
      return res.data;
    },
  });

  return { editWorkingGroup, isPending };
}
