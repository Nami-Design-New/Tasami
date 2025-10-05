import { useNavigate } from "react-router";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import useGetReels from "../../hooks/website/communities/useGetReels";
import { useSelector } from "react-redux";
import EmptySection from "../../ui/EmptySection";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import ReelCard from "../../ui/website/communities/ReelCard";

export default function Reels() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const { reels, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetReels();

  const allReels = reels?.pages?.flatMap((page) => page.data) ?? [];

  return (
    <section className="reels-page">
      <div className="container">
        <div className="reels-header">
          <RoundedBackButton onClick={() => navigate(-1)}>
            <i
              className={
                lang === "ar"
                  ? "fa-solid fa-angle-right"
                  : "fa-solid fa-angle-left"
              }
            ></i>
          </RoundedBackButton>
          <h1>مجتمعات تسامي</h1>
        </div>

        {!isLoading && allReels.length === 0 && (
          <EmptySection height="500px" message={t("communty.noPosts")} />
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          <div className="reels-feed">
            {allReels.map((reel) => (
              <div className="reel-item" key={reel.id}>
                <ReelCard reel={reel} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}
