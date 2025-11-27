import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useDeleteRegion() {
  const { mutate: deleteRegion, isPending: isDeletingRegion } = useMutation({
    mutationFn: async (regionId) => {
      const res = await adminAxiosInstance.delete(`dh-regions/${regionId}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error deleting region");
      }
      return res.data;
    },
  });
  return { deleteRegion, isDeletingRegion };
}
