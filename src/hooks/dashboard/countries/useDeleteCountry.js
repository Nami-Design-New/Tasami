import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useDeleteCountry() {
  const { mutate: deleteCountry, isPending: isDeletingCountry } = useMutation({
    mutationFn: async (countryId) => {
      const res = await adminAxiosInstance.delete(`dh-countries/${countryId}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error deleting country");
      }
      return res.data;
    },
  });
  return { deleteCountry, isDeletingCountry };
}
