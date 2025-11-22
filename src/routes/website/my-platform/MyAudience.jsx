import { useEffect, useState } from "react";
import PlanDurationSelector from "../../../ui/website/platform/PlanDurationSelector";
import FollowersList from "../../../ui/website/platform/audience/FollowersList";
import MembersList from "../../../ui/website/platform/audience/MembersList";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

export default function MyAudience() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // get initial tab from URL or fallback to notifications
  const initialTab = searchParams.get("tab") || "followers";
  const [selectedTab, setSelectedTab] = useState(initialTab);

  // keep URL in sync when tab changes
  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (selectedTab) {
        params.set("tab", selectedTab);
      }
      return params;
    });
  }, [selectedTab, setSearchParams]);
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
        value={selectedTab}
        onChange={(tab) => {
          setSelectedTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {selectedTab === "followers" && <FollowersList />}
      {selectedTab === "members" && <MembersList />}
    </section>
  );
}
