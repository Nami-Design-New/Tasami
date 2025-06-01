const UserProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <img
          className="profile-card__avatar"
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Sarah Johnson"
        />
        <span className="profile-card__status"></span>
      </div>

      <div className="profile-card__body">
        <h2 className="profile-card__name"> محمد رضوان </h2>
        <p className="profile-card__role"> تنفيذي </p>
        <p className="profile-card__department"> 01-014-005 </p>

        <div className="profile-card__info">
          <div className="profile-card__info-item">
            <i className="fa-solid fa-envelope"></i>
            <span>sarah.johnson@company.com</span>
          </div>
          <div className="profile-card__info-item">
            <i className="fa-solid fa-phone"></i>
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="profile-card__info-item">
            <i className="fa-solid fa-location-dot"></i>
            <span> السعوديه , الرياض </span>
          </div>
        </div>
      </div>

      <div className="profile-card__footer">
        <button className="profile-card__button">
          <i className="fa-solid fa-pen-to-square"></i>
          <span> تحديث البيانات </span>
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
