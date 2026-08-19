import HelperCard from "../../../cards/HelperCard";

export default function AudienceCard({ data }) {
  return (
    <HelperCard
      helper={{
        ...data.user,
        image: data.user.image || "/images/profile image.svg",
      }}
    />
  );
}
