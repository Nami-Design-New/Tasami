import { useEffect, useRef, useState } from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

export default function PostMedia({ post }) {
  const media = post?.file;
  const videoRef = useRef(null);
  // helper local
  const isVideo = (url) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".webm", ".ogg"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      on: {
        "Carousel.change": () => {
          const video = videoRef.current;
          if (video) video.play();
        },
        close: () => {
          const video = videoRef.current;
          if (video) {
            video.play();
          }
        },
      },
    });
    return () => {
      Fancybox.destroy();
    };
  }, []);

  if (!media) return null;

  return (
    <div className="media_wrapper relative">
      <a href={media} data-fancybox="gallery">
        {isVideo(media) ? (
          <>
            <video
              ref={videoRef}
              src={media}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={(e) => e.preventDefault()}
              className="max-h-[500px] w-full rounded-xl mx-auto"
            />
          </>
        ) : (
          <img
            src={media}
            alt={post?.title || "post media"}
            className="max-h-[500px] w-full rounded-xl object-contain mx-auto"
          />
        )}
      </a>
    </div>
  );
}
