import { useTranslation } from "react-i18next";
import EmptySection from "../../../EmptySection";
import MemberCard from "./MemberCard ";

export default function GroupMembersList({ members }) {
  const { t } = useTranslation();
  return (
    <section className="group-members-list">
      {members?.length > 0 ? (
        members?.map((member) => (
          <MemberCard
            key={member?.id}
            member={member}
            exePercentage={member?.execution_percentage}
          />
        ))
      ) : (
        <EmptySection message={t("website.platform.groups.noGroupFound")} />
      )}
    </section>
  );
}
