import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useChangeEmployeePassword() {
  const { mutate: changeEmployeePassword, isPending } = useMutation({
    mutationFn: async ({ employeeId, payload }) => {
      const res = await adminAxiosInstance.post(
        `dh-employee-password/${employeeId}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error changing employee password");
      }

      return res.data;
    },
  });

  return { changeEmployeePassword, isPending };
}
