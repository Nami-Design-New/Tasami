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

export async function uploadDashboardMedia(file, fieldName = "image") {
  const formData = new FormData();
  formData.append(fieldName, file);

  const res = await adminAxiosInstance.post("upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const normalizedData = normalizeResponseData(res?.data);

  if (normalizedData?.code && normalizedData.code !== 200) {
    throw new Error(normalizedData.message || "Upload failed");
  }

  const candidates = [
    normalizedData?.data,
    normalizedData?.url,
    normalizedData?.image,
    normalizedData?.video,
    normalizedData?.data?.url,
    normalizedData?.data?.image,
    normalizedData?.data?.video,
    normalizedData?.path,
    normalizedData?.data?.path,
    normalizedData,
  ];

  const url = candidates.map(toUrlString).find(Boolean) || findFirstUrl(normalizedData);

  if (!url) {
    throw new Error("No media url returned from upload endpoint");
  }

  return url;
}

