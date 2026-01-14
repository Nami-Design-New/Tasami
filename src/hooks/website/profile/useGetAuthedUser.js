// // import { useQuery } from "@tanstack/react-query";
// // import { axiosInstance } from "../../../lib/axios";

// // export default function useGetAuthedUser(enabled) {
// //   const {
// //     data: authedUser,
// //     isLoading,
// //     isFetching,
// //     isSuccess,
// //   } = useQuery({
// //     queryKey: ["authedUser"],
// //     queryFn: getProfile,
// //     enabled,
// //     retry: false,
// //   });
// //   return { authedUser, isLoading, isFetching, isSuccess };
// // }

// // const getProfile = async () => {
// //   const res = await axiosInstance.get("auth/my-profile");
// //   if (res.data.code !== 200) {
// //     throw new Error(res.data.message || "Something went wrong");
// //   }

// //   return res.data.data;
// // };
// // ============================================
// // 2. UPDATED PROFILE HOOK: useGetAuthedUser.js
// // ============================================

// import { useQuery } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import { axiosInstance } from "../../../lib/axios";
// import { setUser } from "../../../redux/slices/authRole";

// export default function useGetAuthedUser(enabled) {
//   const dispatch = useDispatch();

//   const {
//     data: authedUser,
//     isLoading,
//     isFetching,
//     isSuccess,
//   } = useQuery({
//     queryKey: ["authedUser"],
//     queryFn: getProfile,
//     enabled,
//     retry: false,
//     onSuccess: (data) => {
//       // Dispatch user data to Redux - this will trigger level-up check
//       dispatch(setUser(data));
//     },
//   });

//   return { authedUser, isLoading, isFetching, isSuccess };
// }

// const getProfile = async () => {
//   const res = await axiosInstance.get("auth/my-profile");
//   if (res.data.code !== 200) {
//     throw new Error(res.data.message || "Something went wrong");
//   }

//   return res.data.data;
// };

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

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
