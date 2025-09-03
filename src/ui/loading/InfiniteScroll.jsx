// components/common/InfiniteScroll.jsx
import { useEffect, useRef, useCallback } from "react";

export default function InfiniteScroll({
  children,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  loaderHeight = "2px",
}) {
  const loaderRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      }
    },
    [hasNextPage, isFetchingNextPage, onLoadMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <>
      {children}
      <div ref={loaderRef} style={{ height: loaderHeight }} />
    </>
  );
}
