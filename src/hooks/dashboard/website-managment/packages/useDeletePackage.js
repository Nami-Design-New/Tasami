import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeletePackage() {
  const {
    mutate: deletePackage,
    mutateAsync: deletePackageAsync,
    isPending,
  } = useMutation({
    mutationFn: async (id) => {
      const res = await adminAxiosInstance.delete(`dh-packages/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error deleting package");
      }
      return res.data;
    },
  });

  return { deletePackage, deletePackageAsync, isPending };
}
