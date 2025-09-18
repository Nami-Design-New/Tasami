import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useEditGroup() {
  const { mutate: editGroup, isPending } = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await axiosInstance.put(`helper-groups/${id}`, null, {
        params: payload,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error editing Group");
      }
      return res.data;
    },
  });

  return { editGroup, isPending };
}
