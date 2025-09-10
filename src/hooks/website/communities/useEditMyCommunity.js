import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

const editMyCommunity = async ({ communityId, formData }) => {
  const res = await axiosInstance.post(`community/${communityId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res.data);

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Something went wrong");
  }
  return res.data;
};

export default function useEditMyCommunity() {
  const { mutate: editCommunity, isPending } = useMutation({
    mutationFn: editMyCommunity,
  });
  return { editCommunity, isPending };
}
