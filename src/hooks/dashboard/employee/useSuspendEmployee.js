import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useSuspendEmployee() {
  const { mutate: suspendEmployee, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-stop-employee", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to suspend employee");
      }
      return res.data;
    },
  });
  return { suspendEmployee, isPending };
}
