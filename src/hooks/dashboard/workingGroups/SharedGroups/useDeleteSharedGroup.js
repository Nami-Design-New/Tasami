import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteSharedGroup() {
  const { mutate: deleteSharedGroup, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(
        `dh-shared-groups/${payload.groupId}`,
        {
          _method: "put",
          shared_id: payload?.shared_id,
        }
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Deleting Shared Group");
      }
      return res.data;
    },
  });
  return { deleteSharedGroup, isPending };
}
