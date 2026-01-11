import { useEffect, useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * Utility functions - separated for easier testing
 */
const FileUtils = {
  /**
   * Normalize input to array format
   */
  toArray: (value) => {
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
  },

  /**
   * Normalize different file formats to a consistent structure
   * Supports: File objects, URL strings, {id, file} objects
   */
  normalizeFile: (file) => {
    // Already a File/Blob object
    if (file instanceof File || file instanceof Blob) {
      return {
        type: "file",
        data: file,
        id: `${file.name}-${file.size}-${file.lastModified}`,
        name: file.name,
        mimeType: file.type,
      };
    }

    // URL string
    if (typeof file === "string") {
      return {
        type: "url",
        data: file,
        id: file,
        name: file.split("/").pop() || "file",
        mimeType: FileUtils.getMimeTypeFromUrl(file),
      };
    }

    // Object format: {id, file}
    if (file && typeof file === "object" && file.file) {
      return {
        type: "object",
        data: file.file,
        id: file.id || file.file,
        name: file.file.split("/").pop() || "file",
        mimeType: FileUtils.getMimeTypeFromUrl(file.file),
        originalObject: file,
      };
    }

    return null;
  },

  /**
   * Get MIME type from URL extension
   */
  getMimeTypeFromUrl: (url) => {
    const ext = url.split(".").pop()?.toLowerCase();
    const mimeTypes = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
      mp4: "video/mp4",
      mov: "video/quicktime",
      webm: "video/webm",
      avi: "video/x-msvideo",
      ogg: "video/ogg",
    };
    return mimeTypes[ext] || "application/octet-stream";
  },

  /**
   * Generate preview URL
   */
  generatePreview: (normalizedFile) => {
    if (!normalizedFile) return null;

    if (normalizedFile.type === "file") {
      return URL.createObjectURL(normalizedFile.data);
    }

    return normalizedFile.data;
  },

  /**
   * Check if file is an image
   */
  isImage: (normalizedFile) => {
    if (!normalizedFile) return false;
    return normalizedFile.mimeType?.startsWith("image/");
  },

  /**
   * Check if file is a video
   */
  isVideo: (normalizedFile) => {
    if (!normalizedFile) return false;
    return normalizedFile.mimeType?.startsWith("video/");
  },

  /**
   * Shorten filename for display
   */
  shortName: (name, maxLength = 26) => {
    if (!name || name.length <= maxLength) return name;
    const start = Math.floor((maxLength - 1) / 2);
    const end = Math.ceil((maxLength - 1) / 2);
    return `${name.slice(0, start)}…${name.slice(-end)}`;
  },

  /**
   * Check if two file arrays are equal
   */
  areFilesEqual: (files1, files2) => {
    if (files1.length !== files2.length) return false;
    return files1.every((f1, i) => {
      const f2 = files2[i];
      return f1.id === f2.id;
    });
  },
};

/**
 * Main FileUploader Component
 */
export default function FileUploader({
  hint,
  label,
  files: initialFiles = [],
  onDelete,
  onFilesChange,
  multiple = true,
  aspectRatio,
  style,
  maxFiles,
  accept,
  maxSize,
  onError,
}) {
  const { t } = useTranslation();

  // Normalize files state
  const [normalizedFiles, setNormalizedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [errors, setErrors] = useState([]);

  /**
   * Initialize files from props (edit mode)
   */
  useEffect(() => {
    const incoming = FileUtils.toArray(initialFiles);
    const normalized = incoming.map(FileUtils.normalizeFile).filter(Boolean);

    // Only update if files actually changed
    if (!FileUtils.areFilesEqual(normalizedFiles, normalized)) {
      setNormalizedFiles(normalized);
      setErrors([]);
    }
  }, [initialFiles]); // Removed normalizedFiles from deps to prevent loops

  /**
   * Generate previews whenever files change
   */
  useEffect(() => {
    const newPreviews = normalizedFiles.map(FileUtils.generatePreview);
    setPreviews(newPreviews);

    // Cleanup blob URLs on unmount
    return () => {
      newPreviews.forEach((url, i) => {
        if (
          normalizedFiles[i]?.type === "file" &&
          typeof url === "string" &&
          url.startsWith("blob:")
        ) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [normalizedFiles]);

  /**
   * Convert normalized files back to original format for parent
   */
  const getOriginalFiles = useCallback((normalized) => {
    return normalized.map((nf) => {
      if (nf.type === "file") return nf.data;
      if (nf.type === "url") return nf.data;
      if (nf.type === "object") return nf.originalObject;
      return null;
    });
  }, []);

  /**
   * Handle file drop
   */
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.map((reject) => ({
          file: reject.file.name,
          errors: reject.errors.map((e) => e.message),
        }));
        setErrors(errorMessages);
        onError?.(errorMessages);
      }

      if (acceptedFiles.length === 0) return;

      let updated;
      const newNormalized = acceptedFiles
        .map(FileUtils.normalizeFile)
        .filter(Boolean);

      if (multiple) {
        // Check maxFiles limit
        if (
          maxFiles &&
          normalizedFiles.length + newNormalized.length > maxFiles
        ) {
          const error = {
            file: "multiple",
            errors: [`Maximum ${maxFiles} files allowed`],
          };
          setErrors([error]);
          onError?.([error]);
          return;
        }
        updated = [...normalizedFiles, ...newNormalized];
      } else {
        updated = newNormalized.slice(0, 1);
      }

      setNormalizedFiles(updated);
      setErrors([]);
      onFilesChange?.(getOriginalFiles(updated));
    },
    [
      normalizedFiles,
      multiple,
      maxFiles,
      onFilesChange,
      getOriginalFiles,
      onError,
    ]
  );

  /**
   * Dropzone configuration
   */
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple,
    accept,
    maxSize,
  });

  /**
   * Remove file by index
   */
  const removeFile = useCallback(
    (index) => {
      const fileToRemove = normalizedFiles[index];
      const updated = normalizedFiles.filter((_, i) => i !== index);

      setNormalizedFiles(updated);
      setErrors([]);
      onFilesChange?.(getOriginalFiles(updated));

      // Call onDelete with the ID if it exists
      if (fileToRemove?.type === "object" && fileToRemove.originalObject?.id) {
        onDelete?.(fileToRemove.originalObject.id);
      }
    },
    [normalizedFiles, onFilesChange, onDelete, getOriginalFiles]
  );

  /**
   * Render preview based on file type
   */
  const renderPreview = useCallback(
    (preview, normalizedFile, index) => {
      if (!preview || !normalizedFile) {
        return (
          <img
            src="/images/docs.svg"
            alt="file"
            data-testid={`file-fallback-${index}`}
          />
        );
      }

      if (FileUtils.isVideo(normalizedFile)) {
        return (
          <video
            src={preview}
            controls
            className="uploaded_video"
            data-testid={`file-video-${index}`}
            style={{
              maxHeight: "170px",
              borderRadius: "8px",
              aspectRatio: aspectRatio || "auto",
            }}
          />
        );
      }

      if (FileUtils.isImage(normalizedFile)) {
        return (
          <img
            src={preview}
            alt={normalizedFile.name}
            className="uploaded_image"
            data-testid={`file-image-${index}`}
            style={{
              objectFit: "contain",
              aspectRatio: aspectRatio || "auto",
            }}
          />
        );
      }

      return (
        <img
          src="/images/docs.svg"
          alt="file"
          data-testid={`file-fallback-${index}`}
        />
      );
    },
    [aspectRatio]
  );

  return (
    <section className="file_upload_grid" data-testid="file-uploader">
      {label && (
        <label className="fu-label" data-testid="file-uploader-label">
          <span className="label-text">{label}</span>
          {hint && <small className="label-hint">({hint})</small>}
        </label>
      )}

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="file-upload-errors" data-testid="file-upload-errors">
          {errors.map((error, i) => (
            <div key={i} className="error-message">
              {error.file}: {error.errors.join(", ")}
            </div>
          ))}
        </div>
      )}

      <input {...getInputProps()} style={{ display: "none" }} />

      <div className="images_grid_upload">
        {/* ---------------- SINGLE MODE ---------------- */}
        {!multiple && (
          <>
            {normalizedFiles.length === 0 ? (
              <div
                {...getRootProps()}
                className={`file_upload dropzone single ${style || ""} ${
                  isDragActive ? "active" : ""
                }`}
                data-testid="dropzone-single"
              >
                <section className="icon">
                  <img src="images/imageUpload.svg" alt="Upload Icon" />
                  <p>{t("dashboard.fileUploader.dragDrop")}</p>
                </section>
              </div>
            ) : (
              <div
                className="uploaded_file single"
                style={style}
                data-testid="uploaded-file-single"
              >
                {renderPreview(previews[0], normalizedFiles[0], 0)}

                <div className="actions">
                  <button
                    type="button"
                    className="change"
                    onClick={open}
                    data-testid="change-button"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => removeFile(0)}
                    data-testid="delete-button-0"
                  >
                    Delete
                  </button>
                </div>
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
              data-testid="dropzone-multiple"
            >
              <section className="icon">
                <img src="images/imageUpload.svg" alt="Upload Icon" />
                <p>{t("dashboard.fileUploader.dragDrop")}</p>
              </section>
            </div>

            <div className="uploads_wrapper multiple">
              {normalizedFiles.map((file, i) => (
                <div
                  className="uploaded_file"
                  key={file.id}
                  data-testid={`uploaded-file-${i}`}
                >
                  {renderPreview(previews[i], file, i)}

                  <button
                    type="button"
                    className="delete multiple"
                    onClick={() => removeFile(i)}
                    data-testid={`delete-button-${i}`}
                  >
                    ✕
                  </button>

                  <div className="meta">
                    <small>{FileUtils.shortName(file.name)}</small>
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

/**
 * PropTypes for validation
 */
FileUploader.propTypes = {
  hint: PropTypes.string,
  label: PropTypes.string,
  files: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.instanceOf(File),
  ]),
  onDelete: PropTypes.func,
  onFilesChange: PropTypes.func,
  multiple: PropTypes.bool,
  aspectRatio: PropTypes.string,
  style: PropTypes.object,
  maxFiles: PropTypes.number,
  accept: PropTypes.object,
  maxSize: PropTypes.number,
  onError: PropTypes.func,
};

/**
 * Export utilities for testing
 */
export { FileUtils };
