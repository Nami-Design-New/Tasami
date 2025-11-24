import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useChangeProfileImage() {
  const { mutate: changeProfileImage, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-employee-image", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Changing image");
      }
      return res.data;
    },
  });

  return { changeProfileImage, isPending };
}
