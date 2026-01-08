import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

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
        <img src={imageUrl} alt="Profile" className="profile-image__img" />
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

// import { useState, useCallback, useEffect } from "react";
// import { useDropzone } from "react-dropzone";

// const ProfileImageUploader = ({
//   imageUrl,
//   onChange,
//   editable = true,
//   className = "",
// }) => {
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       if (acceptedFiles && acceptedFiles.length > 0) {
//         const file = acceptedFiles[0];
//         setSelectedFile(file);
//         const preview = URL.createObjectURL(file);
//         setPreviewUrl(preview);

//         // Simulate traditional onChange for parent
//         onChange && onChange(file);
//       }
//     },
//     [onChange]
//   );

//   const { getRootProps, getInputProps, open } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [],
//     },
//     multiple: false,
//     noClick: true,
//     noKeyboard: true,
//   });

//   // Cleanup object URLs when component unmounts or file changes
//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   return (
//     <div className={`profile-image ${className}`}>
//       <div className="profile-image__wrapper" {...getRootProps()}>
//         <img
//           src={previewUrl || imageUrl || "/images/default-profile.png"}
//           alt="Profile"
//           className="profile-image__img"
//         />
//         {editable && (
//           <>
//             <button
//               type="button"
//               className="profile-image__upload-btn"
//               onClick={open}
//               aria-label="Upload Profile Image"
//             >
//               <i className="fa-solid fa-edit"></i>
//             </button>
//             <input {...getInputProps()} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileImageUploader;
