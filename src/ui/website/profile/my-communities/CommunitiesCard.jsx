import { Link } from "react-router";

export default function CommunitiesCard({ community }) {
  return (
    <Link className="communities-card" to={`/community/${community.id}`}>
      <img src={community.image} className="" />
      <h2>{community.desc}</h2>
      <span className="arrow-icon">
        <i className="fa-solid fa-angle-left"></i>
      </span>
    </Link>
  );
}
