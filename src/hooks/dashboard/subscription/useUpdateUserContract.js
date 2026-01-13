import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useUpdateUserContract() {
  const { mutate: updateUserContract, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(
        `dh-user-contracts/${payload.id}`,
        {
          _method: "put",
          is_active: payload?.is_active,
        }
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Update User Contract");
      }
      return res.data;
    },
  });
  return { updateUserContract, isPending };
}
