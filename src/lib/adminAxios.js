import { createApiClient } from "./createApiClient";

export const adminAxiosInstance = createApiClient({
  tokenKey: "admin_token",
  loginPath: "/dashboard/login",
  area: "dashboard-api",
});
