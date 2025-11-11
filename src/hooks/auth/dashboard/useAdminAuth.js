import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setAuthed, setUser } from "../../../redux/slices/authAdmin";
import { getToken, removeToken } from "../../../utils/token";
import useGetAdminProfile from "./profile/useGetAdminProfile";

export default function useAdminAuth() {
  const dispatch = useDispatch();
  const { isAuthed, admin } = useSelector((s) => s.adminAuth);
  console.log(useSelector((s) => s.adminAuth));

  const token = getToken("admin_token");

  //   Call backend only if token exists
  const { profile, isLoading, isFetching, isSuccess } = useGetAdminProfile(
    !!token
  );

  useEffect(() => {
    if (!token) {
      dispatch(clearAuth());
      removeToken();
      return;
    }

    // If login just happened, token is fresh
    dispatch(setAuthed(true));

    // When backend confirms token → set user
    if (isSuccess && profile) {
      dispatch(setUser(profile));
    }
  }, [token, isSuccess, profile, dispatch]);

  const loading = token ? isLoading || isFetching : false;

  console.log(isAuthed, admin);

  return { loading, isAuthed, admin };
}
