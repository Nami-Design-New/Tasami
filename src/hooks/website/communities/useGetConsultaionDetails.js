import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useParams } from "react-router";

export default function useGetConsultaionDetails() {
  const { id } = useParams();
  const {
    data: consultaionDetails,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["consultaion-details", id],
    queryFn: async ({ signal }) => {
      const res = await axiosInstance.get(`/consultations/${id}`, {
        signal,
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 404,
      });
      const responseCode = Number(res?.data?.code ?? res?.status);

      if (responseCode === 200) {
        return res.data.data;
      }

      const requestError = new Error(
        res?.data?.message || "Failed to fetch consultation details",
      );
      requestError.status = responseCode;
      requestError.responseData = res?.data;
      throw requestError;
    },
    enabled: Boolean(id),
    retry: (failureCount, requestError) =>
      Number(requestError?.status ?? requestError?.response?.status) !== 404 &&
      failureCount < 3,
  });
  return { consultaionDetails, error, isError, isLoading };
}
