import { useNavigate } from "react-router";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import useGetReels from "../../hooks/website/communities/useGetReels";
import { useSelector } from "react-redux";

export default function Reels() {
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const {
    reels,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetReels();
  const allReels = reels?.pages?.flatMap((page) => page.data) ?? [];
  return (
    <section className="reel page">
      <div className="container">
        <div className="d-flex align-items-center justify-content">
          <RoundedBackButton onClick={() => navigate(-1)}>
            <i
              className={
                lang === "ar"
                  ? "fa-solid fa-angle-right"
                  : "fa-solid fa-angle-left"
              }
            ></i>
          </RoundedBackButton>
        </div>
      </div>
    </section>
  );
}
