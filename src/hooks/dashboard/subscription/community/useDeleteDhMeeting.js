import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeletDhMeeting() {
  const { mutate: deleteDhMeeting, isPending: isDhMeetingDelete } = useMutation(
    {
      mutationFn: async (id) => {
        const res = await adminAxiosInstance.delete(
          `dh-community-meetings/${id}`
        );
        if (res.data.code !== 200) {
          throw new Error(res.data || "Error Deleting Meeting");
        }
        return res.data;
      },
    }
  );
  return { deleteDhMeeting, isDhMeetingDelete };
}
