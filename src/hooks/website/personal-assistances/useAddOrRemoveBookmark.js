import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useAddOrRemoveBookmark() {
  const { mutate: toggleBookmark, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post("my-saved-help-offers", {
        work_id: id,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Bookmark");
      }

      return res.data;
    },
  });

  return { toggleBookmark, isPending };
}
