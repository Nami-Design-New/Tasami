import { useState } from "react";
import ProfileImageUploader from "../../ProfileImageUploader";

const UserProfileCard = () => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/men/12.jpg"
  );

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <ProfileImageUploader imageUrl={image} onChange={handleUpload} />
        {/* <img
          className="profile-card__avatar"
          src="https://randomuser.me/api/portraits/men/12.jpg"
          alt="Mohamed Radwan"
        /> */}
        {/* <span className="profile-card__status"></span> */}
      </div>

      <div className="profile-card__body">
        <h2 className="profile-card__name"> محمد رضوان </h2>
        <p className="profile-card__role"> تنفيذي </p>
        <p className="profile-card__department"> 01-000-000 </p>

        <div className="profile-card__info">
          <div className="profile-card__info-item">
            <i className="fa-solid fa-envelope"></i>
            <span>Mohamed.Radwan@tasami.com</span>
          </div>
          {/* <div className="profile-card__info-item">
            <i className="fa-solid fa-phone"></i>
            <span>+966 551234567</span>
          </div> */}
          <div className="profile-card__info-item">
            <i className="fa-solid fa-location-dot"></i>
            <span> السعوديه , الرياض </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
