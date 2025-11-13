import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useAddNewGroup() {
  const { mutate: addNewWorkingGroup, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-working-groups", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Add new working group");
      }
      return res.data;
    },
  });
  return { addNewWorkingGroup, isPending };
}
