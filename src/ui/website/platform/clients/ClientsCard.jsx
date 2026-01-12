import { Link } from "react-router";
import CustomButton from "../../../CustomButton";
import { useTranslation } from "react-i18next";
import useBlockAssistant from "../../../../hooks/website/my-clients/useBlockAssistant";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AlertModal from "../my-community/AlertModal";
import { useState } from "react";
import flagIcon from "../../../../assets/icons/flag.svg";

export default function ClientsCard({ helper }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [showConfirmBlockModal, setShowConfirmBlockModal] = useState(false);
  const [showConfirmUnblockModal, setShowConfirmUnblockModal] = useState(false);

  const { blockAssistant, isPending } = useBlockAssistant();

  const handleBlock = () => {
    blockAssistant(helper?.id, {
      onSuccess: (res) => {
        toast.success(res.message || t("user.block.blockSuccess"));
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        setShowConfirmBlockModal(false);
        setShowConfirmUnblockModal(false);
      },
      onError: (err) => {
        toast.error(err.message || t("error.general"));
      },
    });
  };

  return (
    <>
      <Link to={`/helper/${helper.id}`} className="helper-card">
        <figure className="image-wrapper">
          <img
            src={helper.image}
            alt={helper.name}
            className="avatar"
            loading="lazy"
          />
          <span className="status-dot" aria-hidden="true"></span>
        </figure>

        <section className="info">
          <header className="info-header">
            <h3>{helper.name}</h3>
            <div className="rating">
              <img
                src="/icons/medal.svg"
                alt="Medal icon"
                className="rating-icon"
                loading="lazy"
              />
              <span>{helper.experience_level}</span>
            </div>
          </header>

          <footer className="meta">
            {helper.country && (
              <span className="country">
                <img
                  src={flagIcon}
                  alt={`${helper.country.title} flag`}
                  className="flag-icon"
                  loading="lazy"
                />
                <span>{helper.country.title}</span>
              </span>
            )}

            <CustomButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (helper.blocked) {
                  setShowConfirmUnblockModal(true);
                } else {
                  setShowConfirmBlockModal(true);
                }
              }}
              variant={helper.blocked ? "outlined" : "default"}
              color="fire"
              loading={isPending}
            >
              {helper.blocked ? t("unblock") : t("block")}
            </CustomButton>
          </footer>
        </section>
      </Link>

      {/* Block confirmation modal */}
      <AlertModal
        showModal={showConfirmBlockModal}
        setShowModal={setShowConfirmBlockModal}
        confirmButtonText={t("block")}
        onConfirm={(e) => handleBlock(e)}
      >
        {t("confirmBlockMessage", {
          defaultValue: "Are you sure you want to block this user?",
        })}
      </AlertModal>

      {/* Unblock confirmation modal */}
      <AlertModal
        showModal={showConfirmUnblockModal}
        setShowModal={setShowConfirmUnblockModal}
        confirmButtonText={t("unblock")}
        onConfirm={(e) => handleBlock(e)}
      >
        {t("confirmUnblockMessage", {
          defaultValue: "Are you sure you want to unblock this user?",
        })}
      </AlertModal>
    </>
  );
}
