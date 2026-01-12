import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import imagePlaceholder from "../assets/images/dashboard/avatar-placeholder.jpg";

const ProfileImageUploader = ({
  imageUrl,
  onChange,
  editable = true,
  className = "",
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onChange && onChange({ target: { files: [file] } });
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className={`profile-image ${className}`}>
      <div className="profile-image__wrapper" {...getRootProps()}>
        <img
          src={imageUrl || imagePlaceholder}
          alt="Profile"
          className="profile-image__img"
        />
        {editable && (
          <>
            <button
              type="button"
              className="profile-image__upload-btn"
              onClick={open}
              aria-label="Upload Profile Image"
            >
              <i className="fa-solid fa-edit"></i>
            </button>
            <input {...getInputProps()} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
