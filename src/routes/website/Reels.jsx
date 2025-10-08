import { Card, Placeholder } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useGetReels from "../../hooks/website/communities/useGetReels";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import ReelCard from "../../ui/website/communities/ReelCard";

export default function Reels() {
  const { t } = useTranslation();
  const { reels, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetReels();

  const allReels = reels?.pages?.flatMap((page) => page.data) ?? [];

  return (
    <section className="reels-page no-scroll-bar">
      <div className="container">
        {!isLoading && allReels.length === 0 && (
          <EmptySection height="500px" message={t("community.noPosts")} />
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
            {(isLoading || isFetchingNextPage) && (
              <div className="reel-item">
                <Card
                  style={{
                    width: "100%",
                    borderRadius: "24px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                  }}
                  className="social-card"
                >
                  {/* Video Placeholder */}
                  <Placeholder
                    as="div"
                    animation="glow"
                    className="w-100 h-100"
                    xs={12}
                  >
                    <Placeholder
                      className="w-100 h-100 bg-secondary"
                      style={{ borderRadius: "24px" }}
                      xs={12}
                    />
                  </Placeholder>

                  {/* Bottom text placeholder */}
                  <Card.Body
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "16px",
                      right: "16px",
                    }}
                  >
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={8} />
                      <Placeholder xs={6} />
                    </Placeholder>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}
