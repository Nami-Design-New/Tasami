import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";
export default function useCreatePackage() {
  const {
    mutate: createPackage,
    mutateAsync: createPackageAsync,
    isPending,
  } = useMutation({
    mutationFn: async (packageData) => {
      const res = await adminAxiosInstance.post("dh-packages", packageData);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error creating package");
      }
      return res.data;
    },
  });

  return { createPackage, createPackageAsync, isPending };
}
