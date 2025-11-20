import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useCreateEmployee() {
  const { mutate: createEmployee, isPending: isCreatingEmployee } = useMutation(
    {
      mutationFn: async (payload) => {
        const res = await adminAxiosInstance.post("dh-employees", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data.code !== 200) {
          throw new Error(res.data.message || "");
        }
        return res.data;
      },
    }
  );
  return { createEmployee, isCreatingEmployee };
}
