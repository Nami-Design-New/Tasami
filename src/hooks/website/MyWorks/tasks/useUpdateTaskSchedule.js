import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useUpdateTaskSchedule() {
  const { mutateAsync: updateTaskSchedule, isPending } = useMutation({
    mutationFn: async ({ taskId, scheduleId, ...payload }) => {
      const res = await axiosInstance.patch(
        `tasks/${taskId}/schedules/${scheduleId}`,
        payload,
      );
      return res.data;
    },
  });

  return { updateTaskSchedule, isPending };
}
