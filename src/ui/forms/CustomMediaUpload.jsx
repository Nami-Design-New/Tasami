import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function CustomMediaUpload({
  label,
  hint,
  accept = "image/*,video/*",
  allowMultiple = false,
  files = [],
  handleFileUpload,
  handleRemoveMedia,
  itemId,
  itemType,
  mediaId,
  className = ""
}) {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [preview, setPreview] = useState(files[0] || null);

  const queryMap = {
    ACTIVITY: ["activity", itemId],
    TRIP: ["trip-package", itemId],
    ADDON: ["addon", itemId],
    FLEET: ["yacht", itemId],
    LOGO: ["organization-info"],
  };

  const invalidateCache = () => {
    const queryKey = queryMap[itemType];
    if (queryKey) {
      queryClient.invalidateQueries(queryKey);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || isUploading || isRemoving) return;

    setIsUploading(true);
    try {
      const s3url = await handleFileUpload(file);
      if (s3url) {
        setPreview(s3url);
        invalidateCache();
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!mediaId || isUploading || isRemoving) return;
    setIsRemoving(true);
    try {
      await handleRemoveMedia(mediaId, itemId, itemType);
      setPreview(null);
      invalidateCache();
    } catch (error) {
      console.error("Error removing media:", error.message);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file || isUploading || isRemoving) return;

    setIsUploading(true);
    try {
      const s3url = await handleFileUpload(file);
      if (s3url) {
        setPreview(s3url);
        invalidateCache();
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`input-field ${className}`}>
      <label>
        {label} <span>{hint}</span>
      </label>
      
      <div 
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="upload-loading">
            <span className="spinner-border spinner-border-sm" role="status" />
            <span>Uploading...</span>
          </div>
        ) : preview ? (
          <div className="preview-container">
            {accept.includes('image') ? (
              <img src={preview} alt="Preview" className="preview-media" />
            ) : (
              <video src={preview} className="preview-media" controls />
            )}
            <button 
              type="button" 
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              disabled={isRemoving}
            >
              {isRemoving ? (
                <span className="spinner-border spinner-border-sm" role="status" />
              ) : (
                '×'
              )}
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <img src="/images/fav.png" alt="upload" />
            <p>Drag & Drop your files or Browse</p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={allowMultiple}
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
} 