import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

/**
 * Props:
 * - label, hint
 * - files: initial files array (File[])
 * - onFilesChange(updatedFilesArray)
 * - multiple: boolean (default true)
 */
export default function FileUploader({
  hint,
  label,
  files: initialFiles = [],
  onDelete,
  onFilesChange,
  multiple = true,
}) {
  const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const [files, setFiles] = useState(toArray(initialFiles));
  const [previews, setPreviews] = useState([]); // data URLs for images

  // sync initialFiles when it actually changes (avoid infinite loop)
  useEffect(() => {
    const init = toArray(initialFiles);
    const curKey = files.map((f) => `${f.name}-${f.size}`).join("|");
    const newKey = init.map((f) => `${f.name}-${f.size}`).join("|");
    if (newKey !== curKey) setFiles(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialFiles.map((f) => `${f.name}-${f.size}`))]);

  // generate preview URLs for images and revoke on cleanup
  useEffect(() => {
    const objectUrls = files.map((file) =>
      file?.type?.startsWith("image/") ? URL.createObjectURL(file) : null
    );
    setPreviews(objectUrls);
    return () => {
      objectUrls.forEach((u) => u && URL.revokeObjectURL(u));
    };
  }, [files]);

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

  // Note: we always render the hidden input (getInputProps) so open() will work.
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple,
    // keep default noClick: false so dropzone is clickable when shown
  });

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  // helper: render a friendly filename (truncate)
  const shortName = (name = "") =>
    name.length > 26 ? name.slice(0, 12) + "…" + name.slice(-10) : name;

  return (
    <section className="file_upload_grid">
      {label && (
        <label className="fu-label">
          <span className="label-text">{label}</span>
          {hint && <small className="label-hint">({hint})</small>}
        </label>
      )}

      {/* Always render the hidden input so open() works even when dropzone not present */}
      <input {...getInputProps()} style={{ display: "none" }} />

      <div className="images_grid_upload">
        {/* SINGLE MODE */}
        {!multiple && (
          <>
            {files.length === 0 ? (
              // show dropzone when there's no file
              <div
                {...getRootProps()}
                className={`file_upload dropzone single ${
                  isDragActive ? "active" : ""
                }`}
              >
                <section className="icon">
                  <img src="/images/imageUpload.svg" alt="Upload Icon" />
                  <p>Drag & drop or click to upload</p>
                </section>
              </div>
            ) : (
              // show uploaded image and actions
              <div className="uploaded_file single">
                <img
                  src={previews[0] || "/images/docs.svg"}
                  alt={files[0]?.name || "file"}
                />
                <div className="actions">
                  <button
                    type="button"
                    className="change"
                    onClick={open} // open() works because input is mounted
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    className="delete "
                    onClick={() => removeFile(0)}
                  >
                    Delete
                  </button>
                </div>

                <div className="meta">
                  <small>{shortName(files[0]?.name)}</small>
                </div>
              </div>
            )}
          </>
        )}

        {/* MULTIPLE MODE */}
        {multiple && (
          <>
            {/* dropzone (clickable) */}
            <div
              {...getRootProps()}
              className={`file_upload dropzone multiple ${
                isDragActive ? "active" : ""
              }`}
            >
              <section className="icon">
                <img src="/images/imageUpload.svg" alt="Upload Icon" />
                <p>Drag & drop or click to upload</p>
              </section>
            </div>

            {/* uploaded files grid */}
            <div className="uploads_wrapper multiple">
              {files.map((file, i) => (
                <div className="uploaded_file" key={i}>
                  <img
                    src={previews[i] || "/images/docs.svg"}
                    alt={file?.name || `file-${i}`}
                    className={file?.type?.startsWith("image/") ? "" : "icon"}
                  />
                  <button
                    type="button"
                    className="delete multiple"
                    onClick={() => {
                      removeFile(i);
                      onDelete?.(file?.id);
                    }}
                    aria-label={`Remove ${file?.name}`}
                  >
                    ✕
                  </button>
                  <div className="meta">
                    <small>{shortName(file?.name)}</small>
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
