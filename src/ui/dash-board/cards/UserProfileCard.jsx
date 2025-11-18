import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileImageUploader from "../../ProfileImageUploader";
import useChangeProfileImage from "../../../hooks/auth/dashboard/profile/useChangeProfileImage";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.adminAuth);

  const [image, setImage] = useState(
    user?.image || "https://randomuser.me/api/portraits/men/12.jpg"
  );

  const { changeProfileImage, isPending } = useChangeProfileImage();

  const handleUpload = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview instantly
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);

    // Send to backend
    const formData = new FormData();
    formData.append("image", file);
    formData.append("employee_id", id);

    changeProfileImage(formData, {
      onSuccess: (res) => {
        // Backend should return the final image path
        if (res?.data?.image) {
          setImage(res.data.image);
        }
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  useEffect(() => {
    setImage(user?.image);
  }, [user]);

  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <ProfileImageUploader
          imageUrl={image}
          onChange={(e) => handleUpload(e, user?.id)}
          loading={isPending}
        />
      </div>

      <div className="profile-card__body">
        <h2 className="profile-card__name">
          {user?.first_name} {user?.family_name}
        </h2>

        <p className="profile-card__role">{user?.role?.title}</p>
        <p className="profile-card__department">{user?.code}</p>

        <div className="profile-card__info">
          <div className="profile-card__info-item">
            <i className="fa-solid fa-envelope"></i>
            <span>{user?.email}</span>
          </div>

          <div className="profile-card__info-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>
              {user?.country_id?.title}, {user?.city_id?.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
