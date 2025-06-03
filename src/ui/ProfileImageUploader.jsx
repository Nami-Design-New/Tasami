const ProfileImageUploader = ({
  imageUrl,
  onChange,
  inputId = "imageUpload",
  editable = true,
  className = "",
}) => {
  return (
    <div className={`profile-image ${className}`}>
      <div className="profile-image__wrapper">
        <img src={imageUrl} alt="Profile" className="profile-image__img" />
        {editable && (
          <>
            <label htmlFor={inputId} className="profile-image__upload-btn">
              <i className="fa-solid fa-edit"></i>
            </label>
            <input
              type="file"
              id={inputId}
              accept="image/*"
              className="profile-image__input"
              onChange={onChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
