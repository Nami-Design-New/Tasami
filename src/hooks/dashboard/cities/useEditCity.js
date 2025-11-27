import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useEditCity() {
  const { mutate: editCity, isPending: isEditingCity } = useMutation({
    mutationFn: async ({ cityId, cityData }) => {
      const res = await adminAxiosInstance.post(
        `dh-cities/${cityId}`,
        cityData
      );
      if (res.data.code !== 200) {
        throw new Error(res?.data?.message || "Error update city ");
      }
      return res.data;
    },
  });

  return { editCity, isEditingCity };
}
