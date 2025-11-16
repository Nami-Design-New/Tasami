import { useState } from "react";
import ProfileImageUploader from "../../ProfileImageUploader";
import { useSelector } from "react-redux";

const UserProfileCard = () => {
  const [showMapModal, setShowMapModal] = useState(false);
  const { user } = useSelector((state) => state.adminAuth);
  const [image, setImage] = useState(
    user?.image || "https://randomuser.me/api/portraits/men/12.jpg"
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
      </div>

      <div className="profile-card__body">
        <h2 className="profile-card__name">
          {" "}
          {user?.first_name} {user?.family_name}{" "}
        </h2>
        <p className="profile-card__role"> {user?.role?.title} </p>
        <p className="profile-card__department"> {user?.code} </p>

        <div className="profile-card__info">
          <div className="profile-card__info-item">
            <i className="fa-solid fa-envelope"></i>
            <span>{user?.email}</span>
          </div>
          <div className="profile-card__info-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>
              {" "}
              {user?.country_id?.title} , {user?.city_id?.title}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
