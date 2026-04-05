import { useEffect, useRef } from "react";
import sanitizeRichContent, {
  normalizeCkEditorEmbeds,
} from "../utils/sanitizeRichContent";

function createIframe(src) {
  const wrapper = document.createElement("div");
  wrapper.className = "ck-media__wrapper";

  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  iframe.setAttribute("allowfullscreen", "");
  iframe.style.width = "100%";
  iframe.style.aspectRatio = "16 / 9";
  iframe.style.minHeight = "320px";
  iframe.style.display = "block";

  wrapper.appendChild(iframe);
  return wrapper;
}

function createVideo(src) {
  const wrapper = document.createElement("div");
  wrapper.className = "ck-media__wrapper";

  const video = document.createElement("video");
  video.controls = true;
  video.playsInline = true;
  video.style.width = "100%";
  video.style.maxWidth = "100%";
  video.style.minHeight = "320px";
  video.style.display = "block";

  const source = document.createElement("source");
  source.src = src;
  video.appendChild(source);
  wrapper.appendChild(video);

  return wrapper;
}

export default function RichContent({ className, html }) {
  const ref = useRef(null);
  const sanitizedHtml = sanitizeRichContent(normalizeCkEditorEmbeds(html));

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.querySelectorAll("figure.media").forEach((node) => {
      const iframe = node.querySelector("iframe");
      const source = node.querySelector("video source");

      if (iframe?.src) {
        node.replaceWith(createIframe(iframe.src));
        return;
      }

      if (source?.src) {
        node.replaceWith(createVideo(source.src));
      }
    });

    root.querySelectorAll("[data-oembed-url]").forEach((node) => {
      const iframe = node.querySelector("iframe");
      const host = node.closest("figure.media") || node;

      if (iframe?.src) {
        host.replaceWith(createIframe(iframe.src));
      }
    });

    root.querySelectorAll("iframe").forEach((iframe) => {
      iframe.style.width = "100%";
      iframe.style.aspectRatio = "16 / 9";
      iframe.style.minHeight = "320px";
      iframe.style.display = "block";
      iframe.setAttribute("allowfullscreen", "");
    });

    root.querySelectorAll("video").forEach((video) => {
      video.controls = true;
      video.playsInline = true;
      video.style.width = "100%";
      video.style.maxWidth = "100%";
      video.style.minHeight = "320px";
      video.style.display = "block";
    });
  }, [sanitizedHtml]);

  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
