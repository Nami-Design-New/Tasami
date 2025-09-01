import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useEditExp() {
  const { mutate: editExp, isPending } = useMutation({
    mutationFn: async ({ id, ...data }) => {
      const res = await axiosInstance.put(`user-experience/${id}`, null, {
        params: data,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { editExp, isPending };
}
