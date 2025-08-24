import { signInWithPopup } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { auth, googleProvider } from "../../lib/firebase";
import { setAuthed, setUser } from "../../redux/slices/authRole";
import { setToken } from "../../utils/token";
import { useSocialLoginMutation } from "./useSocialLoginMutation";

export default function useGoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { socialLogin, isPending } = useSocialLoginMutation({
    onSuccess: (res) => {
      toast.success(t("auth.loginSuccess"));
      dispatch(setUser(res.data));
      setToken(res.data.token);
      dispatch(setAuthed(true));
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error(error.message || t("auth.loginErorr"));
    },
  });

  const handleGoogleLogin = async () => {
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
      console.error("Google Login Error:", error);
      toast.error(t("auth.loginErorr"));
    }
  };

  return { handleGoogleLogin, isPending };
}
