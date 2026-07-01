import { useSelector } from "react-redux";
import HelperCard from "../../cards/HelperCard";
import CustomButton from "../../CustomButton";
import { useState } from "react";
import AnswerModal from "./AnswerModal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useDeleteInquriy from "../../../hooks/website/inquiries/useDeleteInquriy";

import triangleWithHelper from "../../../assets/icons/triangle-with-helper.svg";

export default function InQuriyCard({ item }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { deleteInquriy, isPending: isDeleting } = useDeleteInquriy();

  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.authRole);
  const isMyInquriy = item?.from_user_id === user?.id;
  const workCode = item.work?.goal?.code || item.work?.help_service?.code;
  const workLink =
    item.work?.type === "goal"
      ? `/goal/${item.work.id}`
      : `/my-assistances/${item.work.id}`;

  const handleDeleteInquriy = () => {
    deleteInquriy(item.id, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["inquries"] });
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="inquriy-card">
      <HelperCard helper={item?.fromUser} />
      <div className="inquriy-data">
        <div className="inquriy-header">
          <img src={triangleWithHelper} />
          {workLink ? (
            <Link to={workLink}>{workCode}</Link>
          ) : (
            <h2>{workCode}</h2>
          )}
        </div>
        <p>{item.message} </p>
        <div className="inquriy-card__footer">
          {item.answer && (
            <button
              type="button"
              className="inquriy-card__delete"
              onClick={handleDeleteInquriy}
              disabled={isDeleting}
              aria-label={t("delete")}
              title={t("delete")}
            >
              {isDeleting ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-regular fa-trash-can"></i>
              )}
            </button>
          )}
          <small>{item.created_at}</small>
        </div>
      </div>
      {!item.answer && !isMyInquriy && (
        <div className="buttons my-3 justify-content-end">
          <CustomButton
            size="large"
            type="button"
            onClick={() => setShowModal(true)}
            fullWidth
            style={{ backgroundColor: "#4ECDC4" }}
          >
            {t("addAnswer")}
          </CustomButton>
        </div>
      )}
      {item.answer && (
        <div className="inquriy-data">
          <div className="inquriy-header">
            <h2>{t("answer")}</h2>
          </div>
          <p>{item.answer} </p>
          <small>{item.updated_at}</small>
        </div>
      )}
      <AnswerModal
        shwModal={showModal}
        setShowModal={setShowModal}
        item={item}
      />
    </div>
  );
}
