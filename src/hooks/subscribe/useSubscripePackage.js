import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useSubscripePackage() {
  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async ({ packageId, paymentMethod }) => {
      const res = await axiosInstance.post("current-package", {
        package_id: packageId,
        payment_method: paymentMethod,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data;
    },
  });

  return { subscribe, isPending };
}
