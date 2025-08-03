import { useNavigate } from "react-router";
import { useState } from "react";
import RateModal from "../../../ui/modals/RateModal";
import ExtendContractModal from "../../../ui/modals/ExtendContractModal";
import CancelContractModal from "../../../ui/modals/CancelContractModal";

export default function HelperOptionsMenu() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="options-menu d-flex align-items-center gap-2">
        <div className="icon-button" onClick={() => setShowRatingModal(true)}>
          <img src="/icons/bluestar.svg" alt="تقييم" />
        </div>

        <div
          className="icon-button"
          onClick={() => navigate("/chat/123", { state: { name: "أنس تركي" } })}
        >
          <img src="/icons/bluechat.svg" alt="chat" />
        </div>

        <div className="icon-button" onClick={toggleMenu}>
          <img src="/icons/blueflag.svg" alt="options" />
        </div>

        {menuOpen && (
          <div className="options-list">
            <button
              onClick={() => {
                setShowExtendModal(true);
                setMenuOpen(false);
              }}
            >
              تمديد التعاقد
            </button>

            <button
              onClick={() => {
                setShowCancelModal(true);
                setMenuOpen(false);
              }}
            >
              الغاء التعاقد
            </button>
          </div>
        )}
      </div>

      <RateModal
        showModal={showRatingModal}
        setShowModal={setShowRatingModal}
      />
      <ExtendContractModal
        showModal={showExtendModal}
        setShowModal={setShowExtendModal}
        onSubmit={(data) => console.log("بيانات التمديد:", data)}
      />
      <CancelContractModal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
        onSubmit={(data) => console.log("بيانات التمديد:", data)}
      />
    </>
  );
}
