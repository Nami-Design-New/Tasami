import React from "react";
import { adminAxiosInstance } from "../../../lib/adminAxios";
import { useMutation } from "@tanstack/react-query";

export default function useAddCity() {
  const { mutate: addCity, isPending: isAddingCity } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-cities", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { addCity, isAddingCity };
}
