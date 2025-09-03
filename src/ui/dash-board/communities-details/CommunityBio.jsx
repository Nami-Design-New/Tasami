export default function CommunityBio({ userData }) {
  return (
    <div className="community-data">
      <h1 className="community-title">مجتمع {userData?.name}</h1>
      <p className="community-desc">{userData?.about}</p>
    </div>
  );
}
