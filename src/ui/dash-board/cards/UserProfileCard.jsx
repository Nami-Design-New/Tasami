const UserProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <img
          className="profile-card__avatar"
          src="https://randomuser.me/api/portraits/men/12.jpg"
          alt="Mohamed Radwan"
        />
        <span className="profile-card__status"></span>
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
          <div className="profile-card__info-item">
            <i className="fa-solid fa-phone"></i>
            <span>+966 551234567</span>
          </div>
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
