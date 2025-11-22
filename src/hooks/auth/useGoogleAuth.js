import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { auth, googleProvider } from "../../lib/fireBase/config";
import { setAuthed, setUser } from "../../redux/slices/authRole";
import { setToken } from "../../utils/token";
import { useSocialLoginMutation } from "./useSocialLoginMutation";

export default function useGoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { socialLogin, isPending } = useSocialLoginMutation({
    onSuccess: (res) => {
      toast.success(t("auth.loginSuccess"));
      dispatch(setUser(res.data));
      setToken(res.data.token);
      dispatch(setAuthed(true));
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || t("auth.loginErorr"));
    },
  });

  const handleGoogleLogin = async () => {
    if (loading) return; // prevent multiple popups
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // send to API
      socialLogin({
        social_id: user.uid,
        image_url: user.photoURL,
        name: user.displayName,
        email: user.email,
      });
    } catch (error) {
      if (error.code !== "auth/cancelled-popup-request") {
        toast.error(t(error.message));
      } else {
        console.error("Google login popup canceled (duplicate click)", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleGoogleLogin, loading: loading || isPending };
}
