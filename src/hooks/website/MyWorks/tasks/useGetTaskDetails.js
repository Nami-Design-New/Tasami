import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { useLocation, useParams } from "react-router";

export default function useGetTaskDetails() {
  const { id: routeWorkId, taskId } = useParams();
  const { pathname } = useLocation();
  const routeScope = pathname.includes("/my-contracts/")
    ? "assistant"
    : pathname.includes("/my-works/")
      ? "beneficiary"
      : "legacy";

  const {
    data: taskDetails,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["task-details", routeScope, routeWorkId, taskId],
    queryFn: async () => {
      const res = await axiosInstance.get(`tasks/${taskId}`, {
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 404,
      });
      const responseCode = Number(res?.data?.code ?? res?.status);

      if (responseCode === 404 || res.status === 404) {
        const error = new Error(res?.data?.message || "Task not found");
        error.status = 404;
        throw error;
      }

      if (responseCode === 200) {
        return res.data.data;
      }

      if (res.data.code !== 200) {
        throw new Error(res?.data?.message || "Error Fetching Task Details");
      }
    },
    enabled: Boolean(taskId),
    retry: (failureCount, error) => error?.status !== 404 && failureCount < 3,
  });

  return { taskDetails, isLoading, error, isError };
}
