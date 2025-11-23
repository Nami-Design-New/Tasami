export async function shareContent({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      console.error("Share failed:", err);
    }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Clipboard failed:", err);
    }
  }
}
