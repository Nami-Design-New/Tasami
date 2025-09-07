import { useState } from "react";
import PlanDurationSelector from "../../../ui/website/platform/PlanDurationSelector";
import FollowersList from "../../../ui/website/platform/audience/FollowersList";
import MembersList from "../../../ui/website/platform/audience/MembersList";

export default function MyAudience() {
  const [selectedDuration, setSelectedDuration] = useState("followers");
  return (
    <section className="my-audience">
      <PlanDurationSelector
        options={[
          { label: "المتابعون", value: "followers" },
          { label: "الاعضاء", value: "members" },
        ]}
        value={selectedDuration}
        onChange={setSelectedDuration}
      />

      {selectedDuration === "followers" && <FollowersList />}
      {selectedDuration === "members" && <MembersList />}
    </section>
  );
}
