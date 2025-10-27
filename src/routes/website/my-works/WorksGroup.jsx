// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import useWorkWithoutAssistant from "../../../hooks/website/MyWorks/assistants/useWorkWithoutAssistant";
// import useGetWorkGroup from "../../../hooks/website/MyWorks/groups/useGetWorkGroup";
// import useShowMyGoal from "../../../hooks/website/MyWorks/groups/useShowMyGoal";
// import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
// import CustomButton from "../../../ui/CustomButton";
// import CustomLink from "../../../ui/CustomLink";
// import Loading from "../../../ui/loading/Loading";
// import AssignAssistantModal from "../../../ui/website/my-works/assistants/AssignAssistantModal";
// import NoGroup from "../../../ui/website/my-works/noGroup";
// import NoOffers from "../../../ui/website/my-works/NoOffers";
// import GroupMembersList from "../../../ui/website/platform/groups/GroupMembersList";
// import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

// export default function WorksGroup() {
//   const { t } = useTranslation();
//   const [showModal, setShowModal] = useState();
//   const [showAlertModal, setShowAlertModal] = useState();
//   const { workDetails, isLoading } = useGetWorkDetails();

//   const { removeAssistant, isPending: isRemovingHelperPending } =
//     useWorkWithoutAssistant();

//   const { workGroup, isLoading: groupLoading } = useGetWorkGroup(
//     workDetails?.id ?? null,
//     workDetails?.goal?.group_id ?? null
//   );

//   const { showMyGoal, isPending } = useShowMyGoal();
//   const [shareGoal, setShareGoal] = useState(
//     workDetails?.i_show_goal === true ? "yes" : "no"
//   );

//   if (isLoading || groupLoading) return <Loading height={"500px"} />;

//   const withHelper = workDetails?.rectangle === "personal_goal_with_helper";
//   const isHelperAssigned = workDetails?.helper !== null;
//   console.log(withHelper, isHelperAssigned);

//   // Handle toggling "share goal"
//   const handleShareGoalChange = (option) => {
//     setShareGoal(option);

//     // call API to update state
//     showMyGoal({
//       group_id: workGroup?.group?.id,
//       work_id: workDetails?.id,
//       show_goal: option === "yes" ? 1 : 0,
//     });
//   };
//   const handleRemoveAssistants = (id) => {
//     removeAssistant(id, {
//       onSuccess: (res) => {},
//     });
//   };
//   return (
//     <section className="position-relative">
//       {workGroup ? (
//         <section className="work-group-section">
//           <div className="row">
//             <div className="col-12 p-2">
//               <header>
//                 <h1>
//                   <span>مجموعة</span>
//                   <span>{workGroup.group.title}</span>
//                 </h1>
//               </header>
//             </div>

//             <div className="col-12 p-2">
//               <p className="group-desc">{workGroup.group.desc}</p>
//             </div>

//             <div className="col-12 p-2">
//               <div className="info-grid">
//                 <div className="info-box">
//                   <div className="label">{t("website.offerDetails.field")}</div>
//                   <div className="value">
//                     {workGroup?.group?.category_title}
//                   </div>
//                 </div>
//                 <div className="info-box">
//                   <div className="label">مؤشر قوة المجموعة</div>
//                   <div className="value">
//                     {workGroup?.group?.strength_indicator} %
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/*Share Goal */}
//             <div className="col-12 p-2">
//               <div className="share-goal">
//                 <p>مشاركة هدفك مع المجموعة؟</p>
//                 <div className="identity-selector">
//                   <div className="identity-container gap-2">
//                     {["yes", "no"].map((option) => (
//                       <label
//                         key={option}
//                         className={`identity-option ${
//                           shareGoal === option ? "active" : ""
//                         } ${isPending ? "disabled" : ""}`}
//                         onClick={() =>
//                           !isPending && handleShareGoalChange(option)
//                         }
//                       >
//                         <span>{t(`auth.${option}`)}</span>
//                         <input
//                           type="radio"
//                           value={option}
//                           checked={shareGoal === option}
//                           onChange={() =>
//                             !isPending && handleShareGoalChange(option)
//                           }
//                           disabled={isPending}
//                         />
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-12 p-2">
//               <CustomLink fullWidth color="main" size="large" type="outlined">
//                 محادثات المجموعة
//               </CustomLink>
//             </div>

//             <div className="col-12 p-2">
//               <h2 className="group-label">
//                 {t("website.platform.groups.groupMembers")}
//               </h2>
//               <GroupMembersList members={workGroup.group.members} />
//             </div>
//           </div>
//         </section>
//       ) : (
//         <>
//           {withHelper ? (
//             !isHelperAssigned && <NoOffers withHelper={withHelper} />
//           ) : (
//             <NoGroup />
//           )}

//           <div className="button-wrapper">
//             {!withHelper && (
//               <CustomButton
//                 fullWidth
//                 size="large"
//                 style={{ backgroundColor: "#4ECDC4" }}
//                 onClick={() => setShowModal(true)}
//               >
//                 تعين مساعد شخصي
//               </CustomButton>
//             )}
//           </div>

//           <AssignAssistantModal
//             showModal={showModal}
//             setShowModal={setShowModal}
//           />
//           <AlertModal
//             confirmButtonText={t("confirm")}
//             showModal={showAlertModal}
//             setShowModal={setShowAlertModal}
//             onConfirm={() => handleRemoveAssistants(workDetails?.id)}
//             loading={isRemovingHelperPending}
//           >
//             سيتم استبعاد جميع العروض وإلغاء تعيين المساعدة لهذا الهدف!
//           </AlertModal>
//         </>
//       )}
//     </section>
//   );
// }
import { useState } from "react";
import { useTranslation } from "react-i18next";

import useWorkWithoutAssistant from "../../../hooks/website/MyWorks/assistants/useWorkWithoutAssistant";
import useGetWorkGroup from "../../../hooks/website/MyWorks/groups/useGetWorkGroup";
import useShowMyGoal from "../../../hooks/website/MyWorks/groups/useShowMyGoal";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";

import CustomButton from "../../../ui/CustomButton";
import CustomLink from "../../../ui/CustomLink";
import Loading from "../../../ui/loading/Loading";
import AssignAssistantModal from "../../../ui/website/my-works/assistants/AssignAssistantModal";
import NoGroup from "../../../ui/website/my-works/noGroup";
import NoOffers from "../../../ui/website/my-works/NoOffers";
import GroupMembersList from "../../../ui/website/platform/groups/GroupMembersList";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

export default function WorksGroup() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { workDetails, isLoading } = useGetWorkDetails();
  const { removeAssistant, isPending: isRemovingHelperPending } =
    useWorkWithoutAssistant();

  const { workGroup, isLoading: groupLoading } = useGetWorkGroup(
    workDetails?.id ?? null,
    workDetails?.goal?.group_id ?? null
  );

  const { showMyGoal, isPending } = useShowMyGoal();
  const [shareGoal, setShareGoal] = useState(
    workDetails?.i_show_goal === true ? "yes" : "no"
  );

  if (isLoading || groupLoading) return <Loading height="500px" />;

  const withHelper = workDetails?.rectangle === "personal_goal_with_helper";
  const isHelperAssigned = workDetails?.helper !== null;

  // Handle toggling "share goal"
  const handleShareGoalChange = (option) => {
    setShareGoal(option);
    showMyGoal({
      group_id: workGroup?.group?.id,
      work_id: workDetails?.id,
      show_goal: option === "yes" ? 1 : 0,
    });
  };

  const handleRemoveAssistants = (id) => {
    removeAssistant(id, {
      onSuccess: () => {},
    });
  };

  return (
    <section className="position-relative">
      {workGroup ? (
        <section className="work-group-section">
          <div className="row">
            <div className="col-12 p-2">
              <header>
                <h1>
                  <span>{t("works.group.groupTitle")}</span>
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
                  <div className="label">{t("works.group.field")}</div>
                  <div className="value">
                    {workGroup?.group?.category_title}
                  </div>
                </div>
                <div className="info-box">
                  <div className="label">{t("works.group.strengthIndex")}</div>
                  <div className="value">
                    {workGroup?.group?.strength_indicator} %
                  </div>
                </div>
              </div>
            </div>

            {/* Share Goal */}
            <div className="col-12 p-2">
              <div className="share-goal">
                <p>{t("works.group.shareGoalQuestion")}</p>
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
                {t("works.group.groupChats")}
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
        <>
          {withHelper ? (
            !isHelperAssigned && <NoOffers withHelper={withHelper} />
          ) : (
            <NoGroup />
          )}

          <div className="button-wrapper">
            {!withHelper && (
              <CustomButton
                fullWidth
                size="large"
                style={{ backgroundColor: "#4ECDC4" }}
                onClick={() => setShowModal(true)}
              >
                {t("works.group.assignAssistant")}
              </CustomButton>
            )}
          </div>

          <AssignAssistantModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <AlertModal
            confirmButtonText={t("confirm")}
            showModal={showAlertModal}
            setShowModal={setShowAlertModal}
            onConfirm={() => handleRemoveAssistants(workDetails?.id)}
            loading={isRemovingHelperPending}
          >
            {t("works.group.removeHelperAlert")}
          </AlertModal>
        </>
      )}
    </section>
  );
}
