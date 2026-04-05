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

class DashboardUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const formData = new FormData();
    formData.append("image", file);

    const res = await adminAxiosInstance.post("upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("[CKEditorUploader] upload-image raw response:", res);
    console.log("[CKEditorUploader] upload-image response data:", res?.data);

    const normalizedData = normalizeResponseData(res?.data);

    if (normalizedData?.code && normalizedData.code !== 200) {
      console.error(
        "[CKEditorUploader] upload-image error response:",
        normalizedData
      );
      throw new Error(normalizedData.message || "Image upload failed");
    }

    const preferredUrlCandidates = [
      normalizedData?.data,
      normalizedData?.url,
      normalizedData?.image,
      normalizedData?.data?.url,
      normalizedData?.data?.image,
      normalizedData?.data?.path,
      normalizedData?.path,
      normalizedData,
    ];

    const url =
      preferredUrlCandidates.map(toUrlString).find(Boolean) ||
      findFirstUrl(normalizedData);

    console.log("[CKEditorUploader] resolved image url:", url);

    if (!url) {
      console.error(
        "[CKEditorUploader] upload-image missing image url in response:",
        normalizedData
      );
      throw new Error("No image url returned from upload endpoint");
    }

    return { default: url };
  }

  abort() {}
}

export function dashboardCkEditorUploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new DashboardUploadAdapter(loader);
  };
}
