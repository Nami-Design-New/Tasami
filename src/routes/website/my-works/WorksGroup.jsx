import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import useGetWorkGroup from "../../../hooks/website/MyWorks/groups/useGetWorkGroup";
import NoGroup from "../../../ui/website/my-works/noGroup";
import Loading from "../../../ui/loading/Loading";
import CustomLink from "../../../ui/CustomLink";
import GroupMembersList from "../../../ui/website/platform/groups/GroupMembersList";
import useShowMyGoal from "../../../hooks/website/MyWorks/groups/useShowMyGoal";

export default function WorksGroup() {
  const { t } = useTranslation();
  const { workDetails, isLoading } = useGetWorkDetails();
  const { workGroup, isLoading: groupLoading } = useGetWorkGroup(
    workDetails?.id ?? null,
    workDetails?.goal?.group_id ?? null
  );
  const { showMyGoal, isPending } = useShowMyGoal();

  const [shareGoal, setShareGoal] = useState(
    workDetails?.i_show_goal === true ? "yes" : "no"
  );

  if (isLoading || groupLoading) return <Loading />;

  const withHelper = workDetails?.rectangle === "personal_goal";

  // 🧠 Handle toggling "share goal"
  const handleShareGoalChange = (option) => {
    setShareGoal(option);

    // call API to update state
    showMyGoal({
      group_id: workGroup?.group?.id,
      work_id: workDetails?.id,
      show_goal: option === "yes" ? 1 : 0,
    });
  };

  return (
    <section>
      {workGroup ? (
        <section className="work-group-section">
          <div className="row">
            <div className="col-12 p-2">
              <header>
                <h1>
                  <span>مجموعة</span>
                  <span>{workGroup.group.title}</span>
                </h1>
              </header>
            </div>

            <div className="col-12 p-2">
              <p className="group-desc">{workGroup.group.desc}</p>
            </div>

            <div className="col-12 p-2">
              <div className="info-grid">
                <div className="info-box">
                  <div className="label">{t("website.offerDetails.field")}</div>
                  <div className="value">
                    {workGroup?.group?.category_title}
                  </div>
                </div>
                <div className="info-box">
                  <div className="label">مؤشر قوة المجموعة</div>
                  <div className="value">
                    {workGroup?.group?.strength_indicator} %
                  </div>
                </div>
              </div>
            </div>

            {/* 🔘 Share Goal */}
            <div className="col-12 p-2">
              <div className="share-goal">
                <p>مشاركة هدفك مع المجموعة؟</p>
                <div className="identity-selector">
                  <div className="identity-container gap-2">
                    {["yes", "no"].map((option) => (
                      <label
                        key={option}
                        className={`identity-option ${
                          shareGoal === option ? "active" : ""
                        } ${isPending ? "disabled" : ""}`}
                        onClick={() =>
                          !isPending && handleShareGoalChange(option)
                        }
                      >
                        <span>{t(`auth.${option}`)}</span>
                        <input
                          type="radio"
                          value={option}
                          checked={shareGoal === option}
                          onChange={() =>
                            !isPending && handleShareGoalChange(option)
                          }
                          disabled={isPending}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 p-2">
              <CustomLink fullWidth color="main" size="large" type="outlined">
                محادثات المجموعة
              </CustomLink>
            </div>

            <div className="col-12 p-2">
              <h2 className="group-label">
                {t("website.platform.groups.groupMembers")}
              </h2>
              <GroupMembersList members={workGroup.group.members} />
            </div>
          </div>
        </section>
      ) : (
        <NoGroup withHelper={withHelper} />
      )}
    </section>
  );
}
