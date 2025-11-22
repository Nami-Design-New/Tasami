import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useArchiveAssistance from "../../hooks/website/my-assistances/useArchiveAssistance";
import useDeleteAssistance from "../../hooks/website/my-assistances/useDeleteAssistance";
import useGetOfferDetials from "../../hooks/website/my-assistances/useGetOfferDetials";
import CustomLink from "../../ui/CustomLink";
import Loading from "../../ui/loading/Loading";
import OptionsMenu from "../../ui/website/OptionsMenu";
import SectionHeader from "../../ui/website/SectionHeader";
import AddAssistanceModal from "../../ui/website/offers/AddAssistanceModal";
import OfferInfoGrid from "../../ui/website/offers/OfferInfoGrid";
import TopInfo from "../../ui/website/offers/TopInfo";
import AlertModal from "../../ui/website/platform/my-community/AlertModal";
export default function OfferDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { lang } = useSelector((state) => state.language);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { offerDetails, isLoading } = useGetOfferDetials();
  const { deleteAssistance, isPending: isDeleting } = useDeleteAssistance();
  const { archiveYourAssistance, isPending: isArchiving } =
    useArchiveAssistance();

  const handleDeleteAssistance = (id) => {
    deleteAssistance(id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        navigate("/my-platform/my-assistances?tab=active");
        queryClient.refetchQueries({ queryKey: ["my-assistances"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const handleArchive = (id, isCurrentlyArchived) => {
    const payload = {
      id,
      body: {
        is_archived: isCurrentlyArchived ? 0 : 1,
        _method: "PUT",
      },
    };

    archiveYourAssistance(payload, {
      onSuccess: () => {
        toast.success(
          isCurrentlyArchived
            ? t("unarchivedSuccessfully")
            : t("archivedSuccessfully")
        );
        isCurrentlyArchived
          ? navigate("/my-platform/my-assistances?tab=active")
          : navigate("/my-platform/my-assistances?tab=archived");

        queryClient.refetchQueries({ queryKey: ["my-assistances"] });
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong");
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section className="page offer-details-section ">
      <div className="container">
        <div className="col-12 p-2">
          <div className="header">
            <SectionHeader title={t("website.offerDetails.title")} />
            <OptionsMenu
              options={[
                {
                  label: t("website.offerDetails.edit"),
                  onClick: () => setShowEditModal(true),
                },
                {
                  label: offerDetails?.help_service?.is_archived
                    ? t("unarchive")
                    : t("website.offerDetails.archive"),
                  onClick: () =>
                    handleArchive(
                      offerDetails?.id,
                      offerDetails?.help_service?.is_archived
                    ),
                  props: {
                    disabled: isArchiving,
                  },
                },
                {
                  label: t("website.offerDetails.delete"),
                  onClick: () => setShowAlertModal(true),
                  className: "text-danger",
                },
              ]}
            />
          </div>
        </div>

        <div className="goal-details-card mt-3 row">
          <div className="col-12 col-lg-4 p-2">
            <TopInfo offer={offerDetails} />
          </div>
          <div className="col-lg-8 col-12 p-2 ">
            <div className="hed">
              <img src="/icons/help-triangle.svg" />
              <h6>{t("website.offerDetails.assistance")}</h6>{" "}
            </div>
            <p className="desc">{offerDetails?.title}</p>
            <OfferInfoGrid offer={offerDetails} />{" "}
            <div className="extra-terms">
              <h2>{t("website.offerDetails.extraTerms")}</h2>{" "}
              <p>{offerDetails?.help_service?.notes}</p>
            </div>{" "}
            <div className="extra-terms">
              <h2>{t("website.offerDetails.mechanisms")}</h2>
              <ul className="mechanisms-list  ">
                {offerDetails.mechanisms.map((item) => (
                  <li
                    key={item.id}
                    className={`mech-item  ${lang === "en" ? "en" : ""} `}
                  >
                    {item.title}{" "}
                  </li>
                ))}
              </ul>
            </div>{" "}
            <div className="rates">
              <h2>{t("website.offerDetails.previousRatings")}</h2>
              <div className="extra-terms">
                <div className="content">
                  <h3>{t("website.offerDetails.previousUsers")}</h3>
                  <div className="user-count">
                    <i className="fa-regular fa-users"></i>
                    <span>{offerDetails.previous_users}</span>
                  </div>
                </div>
              </div>
              <div className="extra-terms">
                <div className="content">
                  <h3>{t("website.offerDetails.overallRating")}</h3>
                  <div className="user-count gap-1">
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#FFBE4C", fontSize: "14px" }}
                    ></i>
                    <span>{offerDetails.rate}</span>
                    <span style={{ color: "#0D0D0D8F" }}>
                      ({offerDetails.number_of_raters})
                    </span>
                  </div>
                </div>
                <ul className="rate-list">
                  <li>
                    <span>{t("website.offerDetails.experience")}</span>
                    <span>{offerDetails.experience_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.time")}</span>
                    <span>{offerDetails.time_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.quality")}</span>
                    <span>{offerDetails.quality_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.treatment")}</span>
                    <span>{offerDetails.good_treatment}</span>
                  </li>
                </ul>
              </div>
            </div>
            {offerDetails.rate ? (
              <div className="buttons justify-content-end mt-2">
                <CustomLink
                  type="outlined"
                  color="primary"
                  to={`/offers/${offerDetails?.id}/rates`}
                >
                  {t("website.offerDetails.showReviews")}
                </CustomLink>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <AddAssistanceModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        offer={offerDetails}
        isEdit={true}
      />

      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={() => handleDeleteAssistance(offerDetails?.id)}
        loading={isDeleting}
      >
        سيتم حذف هذة المساعدة
      </AlertModal>
    </section>
  );
}
