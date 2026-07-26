import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetWorkDetails() {
  const { id } = useParams();
  const {
    data: workDetails,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["work-details", id],
    queryFn: async ({ signal }) => {
      const res = await axiosInstance.get(`my-works/${id}`, {
        signal,
        skipNotFoundRedirect: true,
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 404,
      });
      const responseCode = Number(res?.data?.code ?? res?.status);

      if (responseCode === 200) {
        return res.data.data;
      }

      const requestError = new Error(
        res?.data?.message || "Error fetching work details",
      );
      requestError.status = responseCode;
      requestError.responseData = res?.data;
      throw requestError;
    },
    enabled: Boolean(id),
    retry: (failureCount, requestError) =>
      requestError?.status !== 404 && failureCount < 3,
  });

  return { workDetails, error, isError, isLoading };
}
