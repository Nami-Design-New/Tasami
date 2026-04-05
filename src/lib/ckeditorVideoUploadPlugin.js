import { ButtonView, Plugin } from "ckeditor5";
import { adminAxiosInstance } from "./adminAxios";

function normalizeResponseData(raw) {
  if (typeof raw !== "string") return raw;
  const trimmed = raw.trim();

  if (!trimmed) return raw;

  try {
    return JSON.parse(trimmed);
  } catch {
    return raw;
  }
}

function toUrlString(value) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/^"+|"+$/g, "");
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  return null;
}

function findFirstUrl(value) {
  const direct = toUrlString(value);
  if (direct) return direct;

  if (!value || typeof value !== "object") return null;

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstUrl(item);
      if (found) return found;
    }
    return null;
  }

  for (const key of Object.keys(value)) {
    const found = findFirstUrl(value[key]);
    if (found) return found;
  }

  return null;
}

async function uploadVideoAndResolveUrl(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await adminAxiosInstance.post("upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("[CKEditorVideoUploader] upload response:", res?.data);

  const normalizedData = normalizeResponseData(res?.data);

  if (normalizedData?.code && normalizedData.code !== 200) {
    throw new Error(normalizedData.message || "Video upload failed");
  }

  const candidates = [
    normalizedData?.data,
    normalizedData?.url,
    normalizedData?.video,
    normalizedData?.image,
    normalizedData?.data?.url,
    normalizedData?.data?.video,
    normalizedData?.data?.image,
    normalizedData?.path,
    normalizedData?.data?.path,
    normalizedData,
  ];

  const url = candidates.map(toUrlString).find(Boolean) || findFirstUrl(normalizedData);

  if (!url) {
    throw new Error("No video url returned from upload endpoint");
  }

  return url;
}

export default class DashboardVideoUploadPlugin extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("uploadVideo", (locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: "Upload Video",
        withText: true,
        tooltip: true,
      });

      button.on("execute", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "video/*,.mp4,.webm,.ogg";

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;

          try {
            const videoUrl = await uploadVideoAndResolveUrl(file);
            editor.execute("mediaEmbed", videoUrl);
          } catch (error) {
            console.error("[CKEditorVideoUploader] upload failed:", error);
            window.alert(error?.message || "Video upload failed");
          }
        };

        input.click();
      });

      return button;
    });
  }
}
