import { toast } from "sonner";
import i18n from "i18next";

// handle change
export const handleChange = (e, setFormData) => {
  setFormData((prv) => ({
    ...prv,
    [e.target.name]: e.target.value,
  }));
};

//  Utility to capitalize work

export function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}

// Utility to Format data to YMD

export const formatYMD = (date) => {
  if (!date) return "";

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Utility to generate community-related URLs

export const handleCopy = (link) => {
  if (!link) return;
  navigator.clipboard
    .writeText(link)
    .then(() => {
      // Optional: show a success message
      toast.success("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    });
};

// Utility to formate date time
export function formatDate(dateString) {
  const date = new Date(dateString);

  const lang = i18n.language === "ar" ? "ar-EG" : "en-US";

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString(lang, { month: "long" });
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // For Arabic, ensure the numerals and order look natural
  if (lang.startsWith("ar")) {
    return `${day} ${month} ${year} | ${hours}:${minutes}`;
  }

  return `${day} ${month} ${year} | ${hours}:${minutes}`;
}

// add aspected ratio

export async function getAspectRatio(file) {
  return new Promise((resolve) => {
    if (file.type.startsWith("image/")) {
      const img = new Image();
      img.onload = () => resolve((img.width / img.height).toFixed(2));
      img.onerror = () => resolve(null);
      img.src = URL.createObjectURL(file);
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve((video.videoWidth / video.videoHeight).toFixed(2));
      };
      video.onerror = () => resolve(null);
      video.src = URL.createObjectURL(file);
    } else {
      resolve(null);
    }
  });
}
