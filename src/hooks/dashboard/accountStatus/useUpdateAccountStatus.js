import { useMutation } from "@tanstack/react-query";

import { adminAxiosInstance } from "../../../lib/adminAxios";

const ACCOUNT_STATUS_ENDPOINTS = {
  user: "dh-users",
  employee: "dh-employees",
};

export default function useUpdateAccountStatus() {
  const { mutate: updateAccountStatus, isPending } = useMutation({
    mutationFn: async ({ accountType, id, payload }) => {
      const endpoint = ACCOUNT_STATUS_ENDPOINTS[accountType];
      if (!endpoint) throw new Error("Unsupported account type");

      const res = await adminAxiosInstance.post(
        endpoint + "/" + id + "/dh-account-status",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to update account status");
      }

      return res.data;
    },
  });

  return { updateAccountStatus, isPending };
}
