import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";
export default function useUpdatePackage() {
  const {
    mutate: updatePackage,
    mutateAsync: updatePackageAsync,
    isPending,
  } = useMutation({
    mutationFn: async ({ id, ...packageData }) => {
      const res = await adminAxiosInstance.put(
        `dh-packages/${id}`,
        packageData
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error updating package");
      }
      return res.data;
    },
  });

  return { updatePackage, updatePackageAsync, isPending };
}
