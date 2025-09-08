import { useState } from "react";
import PlanDurationSelector from "../../../ui/website/platform/PlanDurationSelector";
import FollowersList from "../../../ui/website/platform/audience/FollowersList";
import MembersList from "../../../ui/website/platform/audience/MembersList";
import { useTranslation } from "react-i18next";

export default function MyAudience() {
  const [selectedtab, setSelectedtab] = useState("followers");
  const { t } = useTranslation();
  return (
    <section className="my-audience">
      <PlanDurationSelector
        options={[
          {
            label: t("website.platform.audience.followers"),
            value: "followers",
          },
          { label: t("website.platform.audience.members"), value: "members" },
        ]}
        value={selectedtab}
        onChange={setSelectedtab}
      />

      {selectedtab === "followers" && <FollowersList />}
      {selectedtab === "members" && <MembersList />}
    </section>
  );
}
