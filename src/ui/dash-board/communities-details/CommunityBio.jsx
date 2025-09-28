export default function CommunityBio({ userData }) {
  return (
    <div className="community-data">
      <h1 className="community-title">مجتمع {userData?.name}</h1>
    </div>
  );
}
