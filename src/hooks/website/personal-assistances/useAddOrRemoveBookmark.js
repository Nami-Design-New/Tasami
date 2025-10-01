import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useAddOrRemoveBookmark() {
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["bookmarked-offers"] });
      queryClient.refetchQueries({ queryKey: ["homeData"] });
      queryClient.refetchQueries({ queryKey: ["offer-details"] });
      queryClient.refetchQueries({ queryKey: ["personal-offers"] });
    },
  });

  return { toggleBookmark, isPending };
}
