import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ReplyPreview = ({ replyTo, onClose }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const isReplyingToMyself = Number(replyTo?.senderId) === Number(user?.id);

  if (!replyTo) return null;

  const renderContent = () => {
    switch (replyTo.type) {
      case "text":
        return replyTo.text;

      case "image":
        return t("reply.image");

      case "video":
        return t("reply.video");

      case "audio":
      case "file":
        return t("reply.attachment");

      default:
        return "";
    }
  };

  return (
    <div className="reply-preview">
      <div className="reply-header">
        <span>
          {t("reply.replying_to")}{" "}
          <strong>
            {isReplyingToMyself ? t("reply.yourself") : replyTo.senderName}
          </strong>
        </span>
        <button type="button" className="close-reply" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="reply-content">{renderContent()}</div>
    </div>
  );
};

export default ReplyPreview;
