import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useContactUs() {
  const { mutate: contactUs, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("contact-us", payload);
      if (res.data.code !== 200) {
        throw new Error(res?.data?.message);
      }
      return res.data;
    },
  });

  return { contactUs, isPending };
}
