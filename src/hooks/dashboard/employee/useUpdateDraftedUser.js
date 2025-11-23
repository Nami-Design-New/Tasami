import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useUpdateDraftedUser() {
  const { mutate: updateDraftedUser, isPending } = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await adminAxiosInstance.post(
        `dh-draft-employees/${id}`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error update data");
      }

      return res.data;
    },
  });
  return { updateDraftedUser, isPending };
}
