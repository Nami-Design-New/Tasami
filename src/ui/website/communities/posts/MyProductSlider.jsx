import { useEffect } from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

export default function PostMedia({ post }) {
  const media = post?.file;

  // helper local
  const isVideo = (url) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".webm", ".ogg"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => {
      Fancybox.destroy();
    };
  }, []);

  if (!media) return null;

  return (
    <div className="media_wrapper relative">
      <a href={media} data-fancybox="gallery">
        {isVideo(media) ? (
          <video
            src={media}
            controls
            className="max-h-[500px] w-full rounded-xl mx-auto"
          />
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
