// useAcceptOrRefuseContract.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useAcceptOrRefuseContract() {
  const queryClient = useQueryClient();
  const { mutate: acceptOrRefuse, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.put(`contract-request/${data.id}`, {
        status: data.status,
        group_id: data.groupId,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to update contract status");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counters-notify"] });
    },
  });

  return { acceptOrRefuse, isPending };
}
