import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useChangeGroup() {
  const { mutate: changeGroup, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("change-contract-group", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Changing Group");
      }
      return res.data;
    },
  });
  return { changeGroup, isPending };
}
