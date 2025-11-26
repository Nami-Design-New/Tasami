import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useAddCountry() {
  const { mutate: addCountry, isPending: isAddingCountry } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-countries", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { addCountry, isAddingCountry };
}
