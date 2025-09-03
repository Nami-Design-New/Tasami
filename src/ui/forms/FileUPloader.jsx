import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({
  hint,
  label,
  files: initialFiles = [],
  onFilesChange,
}) => {
  const [files, setFiles] = useState(initialFiles);

  // Sync with external prop changes
  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  // Handle new files from drop or selection
  const onDrop = useCallback(
    (acceptedFiles) => {
      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);
      onFilesChange && onFilesChange(updatedFiles);
    },
    [files, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange && onFilesChange(updatedFiles);
  };

  return (
    <section className="file_upload_grid">
      <label htmlFor="info-htmlFor-customer">
        {label && (
          <section className="label">
            <span>{label}</span>
          </section>
        )}
        {hint && <small>({hint})</small>}
      </label>

      <div className="images_grid_upload">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`file_upload dropzone ${isDragActive ? "active" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <input {...getInputProps()} />
          <section className="icon">
            <img src="/images/imageUpload.svg" alt="Upload Icon" />
            <p>Drag & drop or click to upload</p>
          </section>
        </div>

        {/* File Preview */}
        {files.length > 0 &&
          files.map((file, index) => (
            <section className="uploaded_file" key={index}>
              <img
                src={
                  file?.type?.startsWith("image/")
                    ? URL.createObjectURL(file)
                    : "/images/docs.svg"
                }
                className={file?.type?.startsWith("image/") ? "" : "icon"}
                alt={file.name}
              />
              <button
                type="button"
                className="delete"
                onClick={() => removeFile(index)}
                aria-label={`Remove file ${file.name}`}
              >
                <i className="fa-solid fa-close"></i>
              </button>
            </section>
          ))}
      </div>
    </section>
  );
};

export default FileUploader;
