import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useAddNewAssistance() {
  const { mutate: addNewAssistance, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("my-help-service", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { addNewAssistance, isPending };
}
