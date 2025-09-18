export default function MemberCard({ member }) {
  return (
    <div className="member-card">
      <img className="member-card__avatar" src="/images/p1.png" />
      <div className="info">
        <p className="member-name">نورة الكعبي</p>
        <div className="d-flex gap-1 align-content-center">
          <img src="/icons/medal.svg" />
          <span>11</span>
        </div>
      </div>
    </div>
  );
}
