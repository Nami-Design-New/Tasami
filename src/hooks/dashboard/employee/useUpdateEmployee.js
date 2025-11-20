import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useUpdateEmployee() {
  const { mutate: updateEmployee, isPending } = useMutation({
    mutationFn: async ({ employeeId, payload }) => {
      console.log(payload);

      const res = await adminAxiosInstance.post(
        `dh-employees/${employeeId}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Updating Employee Data");
      }
      return res.data;
    },
  });
  return { updateEmployee, isPending };
}
