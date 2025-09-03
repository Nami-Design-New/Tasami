import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useAddGroup() {
  const { mutate: addGroup, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("helper-groups", data);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "something went wrong");
      }

      return res.data;
    },
  });
  return { addGroup, isPending };
}
