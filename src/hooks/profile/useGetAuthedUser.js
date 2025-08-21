import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetAuthedUser(enabled) {
  const {
    data: authedUser,
    isLoading,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["authedUser"],
    queryFn: getProfile,
    enabled,
    retry: false,
  });
  return { authedUser, isLoading, isFetching, isSuccess };
}

const getProfile = async () => {
  const res = await axiosInstance.get("auth/my-profile");
  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Something went wrong");
  }

  return res.data.data;
};
