import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";
export default function useUpdatePackage() {
  const { mutate: updatePackage, isPending } = useMutation({
    mutationFn: async ({ id, ...packageData }) => {
      const res = await adminAxiosInstance.post(
        `dh-packages/${id}`,
        packageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error updating package");
      }
      return res.data;
    },
  });

  return { updatePackage, isPending };
}
