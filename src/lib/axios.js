import { createApiClient } from "./createApiClient";

export const axiosInstance = createApiClient({
  tokenKey: "token",
  loginPath: "/login",
  area: "website-api",
});
