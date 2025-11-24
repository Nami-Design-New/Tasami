import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuth,
  setAuthed,
  setRole,
  setUser,
} from "../../../redux/slices/authAdmin";
import { getToken } from "../../../utils/token";
import useGetAdminProfile from "./profile/useGetAdminProfile";

export default function useAdminAuth() {
  const dispatch = useDispatch();
  const { isAuthed, user } = useSelector((s) => s.adminAuth);

  const token = getToken("admin_token");

  // Call backend only if token exists
  const { profile, isLoading, isFetching, isSuccess } = useGetAdminProfile(
    !!token
  );

  useEffect(() => {
    if (!token) {
      dispatch(clearAuth());
      return;
    }

    // If we have a token, set authed immediately
    // This prevents redirect while profile is loading
    if (!isAuthed) {
      dispatch(setAuthed(true));
    }

    // When backend confirms token → set user and role
    if (isSuccess && profile) {
      dispatch(setUser(profile));
      if (profile.role) {
        dispatch(setRole(profile.role));
      }
    }
  }, [token, isSuccess, profile, dispatch, isAuthed]);

  const loading = token ? isLoading || isFetching : false;

  return { loading, isAuthed: !!token || isAuthed, admin: user };
}
