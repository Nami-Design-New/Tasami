import { useMutation } from "@tanstack/react-query";
import React from "react";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useAddNewSubject() {
  const { mutate: addNewSubject, isPending: isAddingNewSubject } = useMutation({
    mutationFn: async (newSubjectData) => {
      const res = await adminAxiosInstance.post(
        "dh-task-systems",
        newSubjectData
      );
      if (res.data.code !== 200) {
        throw new Error(res.message || "Error adding new subject");
      }
      return res.data;
    },
  });
  return { addNewSubject, isAddingNewSubject };
}
