import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useUpdateWithdrawRequest() {
  const { mutate: updateWithdrawRequest, isPending } = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await adminAxiosInstance.post(
        `dh-withdraw-requests/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.code !== 200) {
        throw new Error("Error Updatin withdraw requset status");
      }
      return res.data;
    },
  });
  return { updateWithdrawRequest, isPending };
}
