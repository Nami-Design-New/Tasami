import { dashboardCkEditorUploadPlugin } from "./ckeditorUploadAdapter";

const selfHostedVideoProvider = {
  name: "selfHostedVideo",
  url: /^https?:\/\/.+\.(mp4|webm|ogg)(\?.*)?(#.*)?$/i,
  html: (match) => {
    const videoUrl = match[0];
    return (
      '<div class="ck-media__wrapper">' +
      `<video controls playsinline style="width:100%;max-width:100%;">` +
      `<source src="${videoUrl}" />` +
      "Your browser does not support the video tag." +
      "</video>" +
      "</div>"
    );
  },
};

export const dashboardCkEditorConfig = {
  extraPlugins: [dashboardCkEditorUploadPlugin],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "imageUpload",
    "mediaEmbed",
    "|",
    "undo",
    "redo",
  ],
  mediaEmbed: {
    previewsInData: true,
    extraProviders: [selfHostedVideoProvider],
  },
};
