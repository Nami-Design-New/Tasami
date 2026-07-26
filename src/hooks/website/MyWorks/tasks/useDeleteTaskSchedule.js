import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useDeleteTaskSchedule() {
  const { mutateAsync: deleteTaskSchedule, isPending } = useMutation({
    mutationFn: async ({ taskId, scheduleId }) => {
      const res = await axiosInstance.delete(
        `tasks/${taskId}/schedules/${scheduleId}`,
      );
      return res.data;
    },
  });

  return { deleteTaskSchedule, isPending };
}
