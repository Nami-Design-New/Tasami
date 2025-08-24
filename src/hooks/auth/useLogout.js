import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useLogout() {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: async (firebaseToken) => {
      const res = await axiosInstance.post("auth/logout", {
        firebase_token: firebaseToken,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Logout failed");
      }
      return res.data;
    },
  });
  return { logout, isPending };
}
