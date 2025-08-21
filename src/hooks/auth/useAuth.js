import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken, removeToken } from "../../utils/token";
import useGetAuthedUser from "../profile/useGetAuthedUser";
import { clearAuth, setUser } from "../../redux/slices/authRole";

export default function useAuth() {
  const dispatch = useDispatch();
  const { isAuthed, user } = useSelector((s) => s.authRole);

  const rawToken = getToken();

  const { authedUser, isLoading, isFetching, isSuccess } = useGetAuthedUser(
    !!rawToken
  );

  useEffect(() => {
    if (!rawToken) {
      dispatch(clearAuth());
      removeToken();
      return;
    }

    if (isSuccess && authedUser) {
      dispatch(setUser(authedUser));
    }
  }, [rawToken, isSuccess, authedUser, dispatch]);

  const loading = rawToken ? isLoading || isFetching : false;

  return { loading, isAuthed, user };
}
