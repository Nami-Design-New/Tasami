import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useAnswerInquriy() {
  const { mutate: answer, isPending } = useMutation({
    mutationFn: async ({ work_id, answer }) => {
      const res = await axiosInstance.put(`inquires/${work_id}`, null, {
        params: {
          answer,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || " Error answer Inquriy");
      }
      return res.data;
    },
  });
  return { answer, isPending };
}
