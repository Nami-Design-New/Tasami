import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useDeleteDhConsultation from "../../../hooks/dashboard/subscription/community/useDeleteDhConsultation";
import useGetConsultaionDashDetails from "../../../hooks/dashboard/subscription/useGetConsultaionDashDetails";
import Loading from "../../../ui/loading/Loading";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import ConsultaionDashComments from "./ConsultaionDashComments";

export default function ConsultaionDashDetails() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t } = useTranslation();
  // const { user } = useSelector((state) => state.authRole);
  const { id } = useParams();
  const { consultaionDashDetails, isLoading } =
    useGetConsultaionDashDetails(id);
  const { deleteDhConsultation, isDeletingDhConsultation } =
    useDeleteDhConsultation();
  const handleDeleteDhConsultation = () => {
    deleteDhConsultation(id, {
      onSuccess: (res) => {
        navigate(-1);
        setShowDeleteModal(false);
        queryClient.invalidateQueries({ queryKey: ["consultaion-details"] });
        toast.success(res.message || "success delete Consultation ");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  if (isLoading) return <Loading />;

  return (
    <section className="consultaion-details page">
      <div className="container">
        {/* Header */}
        <div className="header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <RoundedBackButton onClick={() => navigate(-1)}></RoundedBackButton>
            <h1 className="title">{consultaionDashDetails?.title}</h1>
          </div>
          <OptionsMenu
            toggleButton={"fas fa-ellipsis-h"}
            options={[
              {
                label: t("delete"),
                onClick: () => setShowDeleteModal(true),
                className: "text-danger",
              },
            ]}
          />
        </div>

        <p className="decription">{consultaionDashDetails?.desc}</p>
        {consultaionDashDetails.answer && (
          <div className="answer-container">
            <h2>{t("community.yourAnswer")}</h2>
            <p>{consultaionDashDetails.answer}</p>
          </div>
        )}

        <ConsultaionDashComments />
      </div>

      {showDeleteModal && (
        <AlertModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onConfirm={handleDeleteDhConsultation}
          loading={isDeletingDhConsultation}
          confirmButtonText={t("confirm")}
        >
          {t("consultaionDeleteAlert")}
        </AlertModal>
      )}
    </section>
  );
}
