import DOMPurify from "dompurify";

function getEmbedHtml(url) {
  const safeUrl = (url || "").trim();

  if (!safeUrl) return "";

  if (/\.(mp4|webm|ogg)(\?.*)?(#.*)?$/i.test(safeUrl)) {
    return `
      <div class="ck-media__wrapper">
        <video controls playsinline style="width:100%;max-width:100%;">
          <source src="${safeUrl}" />
          Your browser does not support the video tag.
        </video>
      </div>
    `;
  }

  const youtubeMatch =
    safeUrl.match(
      /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([^&?/]+)/i,
    ) || [];
  const youtubeId = youtubeMatch[1];

  if (youtubeId) {
    return `
      <div class="ck-media__wrapper">
        <iframe
          src="https://www.youtube.com/embed/${youtubeId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          style="width:100%;aspect-ratio:16/9;"
        ></iframe>
      </div>
    `;
  }

  const vimeoMatch = safeUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/i) || [];
  const vimeoId = vimeoMatch[1];

  if (vimeoId) {
    return `
      <div class="ck-media__wrapper">
        <iframe
          src="https://player.vimeo.com/video/${vimeoId}"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          style="width:100%;aspect-ratio:16/9;"
        ></iframe>
      </div>
    `;
  }

  return `
    <p>
      <a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a>
    </p>
  `;
}

function normalizeCkEditorEmbeds(html) {
  console.log(html);

  if (!html) return "";

  return html
    .replace(
      /<figure[^>]*class="[^"]*media[^"]*"[^>]*>[\s\S]*?<iframe[^>]*src="([^"]+)"[^>]*><\/iframe>[\s\S]*?<\/figure>/gi,
      (_, src) => `
        <div class="ck-media__wrapper">
          <iframe
            src="${src}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            style="width:100%;aspect-ratio:16/9;"
          ></iframe>
        </div>
      `,
    )
    .replace(
      /<figure[^>]*class="[^"]*media[^"]*"[^>]*>[\s\S]*?<video[^>]*>[\s\S]*?<source[^>]*src="([^"]+)"[^>]*>[\s\S]*?<\/video>[\s\S]*?<\/figure>/gi,
      (_, src) => getEmbedHtml(src),
    )
    .replace(
      /<figure[^>]*class="[^"]*media[^"]*"[^>]*>\s*<oembed[^>]*url="([^"]+)"[^>]*><\/oembed>\s*<\/figure>/gi,
      (_, url) => getEmbedHtml(url),
    )
    .replace(/<oembed[^>]*url="([^"]+)"[^>]*><\/oembed>/gi, (_, url) =>
      getEmbedHtml(url),
    );
}

export default function sanitizeRichContent(html) {
  return DOMPurify.sanitize(normalizeCkEditorEmbeds(html), {
    ADD_TAGS: ["iframe", "video", "source"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "srcset",
      "sizes",
      "type",
      "controls",
      "playsinline",
      "autoplay",
      "muted",
      "loop",
      "poster",
      "preload",
      "width",
      "height",
      "class",
      "style",
    ],
  });
}

export { normalizeCkEditorEmbeds };
