import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useDeleteCity() {
  const { mutate: deleteCity, isPending: isDeletingCity } = useMutation({
    mutationFn: async (cityId) => {
      const res = await adminAxiosInstance.delete(`dh-cities/${cityId}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error deleting city");
      }
      return res.data;
    },
  });
  return { deleteCity, isDeletingCity };
}
