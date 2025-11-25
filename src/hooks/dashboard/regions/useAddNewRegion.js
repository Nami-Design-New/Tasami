import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useAddNewRegion() {
  const { mutate: addNewRegion, isPending: addingRegion } = useMutation({
    mutationFn: async (payload) => {},
  });
  return {};
}
