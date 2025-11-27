import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useEditCountry() {
  const { mutate: editCountry, isPending: isEditingCountry } = useMutation({
    mutationFn: async ({ countryId, countryData }) => {
      const res = await adminAxiosInstance.post(
        `dh-countries/${countryId}`,
        countryData
      );
      if (res.data.code !== 200) {
        throw new Error(res?.data?.message || "Error update country ");
      }
      return res.data;
    },
  });

  return { editCountry, isEditingCountry };
}
