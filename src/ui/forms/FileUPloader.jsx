import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

export default function FileUploader({
  hint,
  label,
  files: initialFiles = [],
  onDelete,
  onFilesChange,
  multiple = true,
  aspectRatio,
}) {
  const { t } = useTranslation();
  const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const [files, setFiles] = useState(toArray(initialFiles));
  const [previews, setPreviews] = useState([]);

  /** -----------------------------------------------
   * Sync files coming from parent (edit mode)
   * ----------------------------------------------- */
  useEffect(() => {
    const init = toArray(initialFiles);

    const fileKey = (f) =>
      typeof f === "string" ? f : `${f.name}-${f.size}-${f.type}`;

    const currentKey = files.map(fileKey).join("|");
    const newKey = init.map(fileKey).join("|");

    if (currentKey !== newKey) {
      setFiles(init);
    }
  }, [JSON.stringify(initialFiles)]);

  /** -----------------------------------------------
   * Generate previews for:
   * - File images
   * - File videos
   * - URL images
   * - URL videos
   * ----------------------------------------------- */
  useEffect(() => {
    const generated = files.map((file) => {
      // If string → treat as URL
      if (typeof file === "string") {
        return file;
      }

      // File object → generate preview
      return URL.createObjectURL(file);
    });

    setPreviews(generated);

    // cleanup blobs created by URL.createObjectURL()
    return () => {
      generated.forEach((url, i) => {
        if (files[i] instanceof File && url?.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [files]);

  /** -----------------------------------------------
   * On drop
   * ----------------------------------------------- */
  const onDrop = useCallback(
    (acceptedFiles) => {
      let updated;
      if (multiple) {
        updated = [...files, ...acceptedFiles];
      } else {
        updated = acceptedFiles.length > 0 ? [acceptedFiles[0]] : [];
      }
      setFiles(updated);
      onFilesChange?.(updated);
    },
    [files, multiple, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple,
  });

  /** -----------------------------------------------
   * Remove file
   * ----------------------------------------------- */
  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  /** -----------------------------------------------
   * Utility - extract filename from File or URL
   * ----------------------------------------------- */
  const shortName = (file) => {
    if (!file) return "";

    if (typeof file === "string") {
      const name = file.split("/").pop() || "file";
      return name.length > 26
        ? name.slice(0, 12) + "…" + name.slice(-10)
        : name;
    }

    const name = file.name || "file";
    return name.length > 26 ? name.slice(0, 12) + "…" + name.slice(-10) : name;
  };

  /** -----------------------------------------------
   * Render: image or video preview
   * ----------------------------------------------- */
  const renderPreview = (src, file) => {
    if (!src) return <img src="/images/docs.svg" alt="file" />;

    const isVideo =
      typeof file === "string"
        ? file.match(/\.(mp4|mov|webm|avi|ogg)$/i)
        : file?.type?.startsWith("video/");

    const isImage =
      typeof file === "string"
        ? file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
        : file?.type?.startsWith("image/");

    if (isVideo) {
      return (
        <video
          src={src}
          controls
          className="uploaded_video"
          style={{
            maxHeight: "170px",
            borderRadius: "8px",
            aspectRatio: aspectRatio || "auto",
          }}
        />
      );
    }

    if (isImage) {
      return (
        <img
          src={src}
          alt={shortName(file)}
          className="uploaded_image"
          style={{ objectFit: "contain", aspectRatio: aspectRatio || "auto" }}
        />
      );
    }

    return <img src="/images/docs.svg" alt="file" />;
  };

  return (
    <section className="file_upload_grid">
      {label && (
        <label className="fu-label">
          <span className="label-text">{label}</span>
          {hint && <small className="label-hint">({hint})</small>}
        </label>
      )}

      <input {...getInputProps()} style={{ display: "none" }} />

      <div className="images_grid_upload">
        {/* ---------------- SINGLE MODE ---------------- */}
        {!multiple && (
          <>
            {files.length === 0 ? (
              <div
                {...getRootProps()}
                className={`file_upload dropzone single ${
                  isDragActive ? "active" : ""
                }`}
              >
                <section className="icon">
                  <img src="/images/imageUpload.svg" alt="Upload Icon" />
                  <p>{t("dashboard.fileUploader.dragDrop")}</p>
                </section>
              </div>
            ) : (
              <div className="uploaded_file single">
                {renderPreview(previews[0], files[0])}

                <div className="actions">
                  <button type="button" className="change" onClick={open}>
                    Change
                  </button>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => removeFile(0)}
                  >
                    Delete
                  </button>
                </div>

                {/* <div className="meta">
                  <small>{shortName(files[0])}</small>
                </div> */}
              </div>
            )}
          </>
        )}

        {/* ---------------- MULTIPLE MODE ---------------- */}
        {multiple && (
          <>
            <div
              {...getRootProps()}
              className={`file_upload dropzone multiple ${
                isDragActive ? "active" : ""
              }`}
            >
              <section className="icon">
                <img src="/images/imageUpload.svg" alt="Upload Icon" />
                <p>{t("dashboard.fileUploader.dragDrop")}</p>
              </section>
            </div>

            <div className="uploads_wrapper multiple">
              {files.map((file, i) => (
                <div className="uploaded_file" key={i}>
                  {renderPreview(previews[i], file)}

                  <button
                    type="button"
                    className="delete multiple"
                    onClick={() => {
                      removeFile(i);
                      onDelete?.(file?.id);
                    }}
                  >
                    ✕
                  </button>

                  <div className="meta">
                    <small>{shortName(file)}</small>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
