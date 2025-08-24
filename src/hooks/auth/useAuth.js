import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken, removeToken } from "../../utils/token";
import useGetAuthedUser from "../profile/useGetAuthedUser";
import { clearAuth, setUser, setAuthed } from "../../redux/slices/authRole";

export default function useAuth() {
  const dispatch = useDispatch();
  const { isAuthed, user } = useSelector((s) => s.authRole);

  const token = getToken();

  // Call backend only if token exists
  const { authedUser, isLoading, isFetching, isSuccess } = useGetAuthedUser(
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
    if (isSuccess && authedUser) {
      dispatch(setUser(authedUser));
    }
  }, [token, isSuccess, authedUser, dispatch]);

  const loading = token ? isLoading || isFetching : false;

  return { loading, isAuthed, user };
}
