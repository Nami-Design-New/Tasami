import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useEditRegion() {
  const { mutate: editRegion, isPending: isEditingRegion } = useMutation({
    mutationFn: async ({ regionId, regionData }) => {
      const res = await adminAxiosInstance.post(
        `dh-regions/${regionId}`,
        regionData
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error editing region");
      }
      return res.data;
    },
  });
  return { editRegion, isEditingRegion };
}
