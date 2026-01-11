import { useSelector } from "react-redux";
import HelperCard from "../../cards/HelperCard";
import CustomButton from "../../CustomButton";
import { useState } from "react";
import AnswerModal from "./AnswerModal";
import { useTranslation } from "react-i18next";

import triangleWithHelper from "../../../assets/icons/triangle-with-helper.svg";

export default function InQuriyCard({ item }) {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.authRole);
  const isMyInquriy = item?.from_user_id === user?.id;
  return (
    <div className="inquriy-card">
      <HelperCard helper={item?.fromUser} />
      <div className="inquriy-data">
        <div className="inquriy-header">
          <img src={triangleWithHelper} />
          <h2>{item.code}</h2>
        </div>
        <p>{item.message} </p>
        <small>{item.created_at}</small>
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
