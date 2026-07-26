import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetPostDetails() {
  const { id } = useParams();
  const {
    data: postDetails,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["post-details", id],
    queryFn: async ({ signal }) => {
      const res = await axiosInstance.get(`posts/${id}`, {
        signal,
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 404,
      });
      const responseCode = Number(res?.data?.code ?? res?.status);

      if (responseCode === 200) {
        return res.data.data;
      }

      const requestError = new Error(
        res?.data?.message || "Error fetching post details",
      );
      requestError.status = responseCode;
      requestError.responseData = res?.data;
      throw requestError;
    },
    enabled: Boolean(id),
    retry: (failureCount, requestError) =>
      requestError?.status !== 404 && failureCount < 3,
  });

  return { postDetails, error, isError, isLoading };
}
