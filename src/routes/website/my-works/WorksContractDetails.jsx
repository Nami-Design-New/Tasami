import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import useGetContractDetails from "../../../hooks/website/MyWorks/assistants/useGetContractDetails";
import Currency from "../../../ui/Currency";
import CustomLink from "../../../ui/CustomLink";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import CancelContractModal from "../../../ui/website/my-works/CancelContractModal";
import ContractRateModal from "../../../ui/website/my-works/ContractRateModal";
import AssistantWorkCard from "../../../ui/website/my-works/work-offers/AssistantWorkCard";

export default function WorksContractDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRateMdoal, setShowRateModal] = useState();
  const { lang } = useSelector((state) => state.language);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const options = [
    {
      id: 1,
      label: t("works.contractDetails.endContract"),
      className: "text-fire",
      onClick: () => setShowCancelModal(true),
    },
  ];

  const { contractDetails, isLoading } = useGetContractDetails(id);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <section className="work-contract-details page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <header>
              <RoundedBackButton onClick={() => navigate(-1)} />
              <div className="work-actions">
                <button
                  className={`action-buttons ${
                    contractDetails.status === "working" ? "" : "yellow"
                  }`}
                  onClick={() => {
                    if (contractDetails.status === "working") {
                      setShowRateModal(true);
                    } else {
                      return;
                    }
                  }}
                >
                  {contractDetails.status === "working" ? (
                    <img src="/icons/work-star.svg" alt="working" />
                  ) : (
                    <img src="/icons/work-star-yellow.svg" alt="not working" />
                  )}
                </button>

                <Link
                  className={`action-buttons ${
                    contractDetails.status === "working" ? "" : "yellow"
                  }`}
                >
                  {contractDetails.status === "working" ? (
                    <img src="/icons/work-chat.svg" alt="chat" />
                  ) : (
                    <img src="/icons/work-chat-yellow.svg" alt="chat" />
                  )}
                </Link>

                {contractDetails.status === "working" && (
                  <div className="options-menu" ref={menuRef}>
                    <button className="action-buttons" onClick={toggleMenu}>
                      <img src="/icons/contract-flag.svg" alt="options" />
                    </button>
                    {menuOpen && (
                      <div
                        className={`options-list ${lang === "en" ? "en" : ""}`}
                      >
                        {options.map((option, index) => (
                          <button
                            key={index}
                            className={`options-item ${option.className || ""}`}
                            onClick={() => {
                              option.onClick?.();
                              setMenuOpen(false);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </header>
          </div>

          {/* Assistant Details */}
          <div className="col-4 p-2">
            <div className="d-flex flex-column gap-3">
              <AssistantWorkCard
                helper={contractDetails?.helper}
                chat={false}
                prevAssistant={contractDetails?.status !== "working"}
              />
              <CustomLink
                type="outlined"
                fullWidth
                size="large"
                to={`/helper/${contractDetails.helper.id}`}
              >
                {t("works.contractDetails.cv")}
              </CustomLink>
            </div>
          </div>

          {/* Contract Info */}
          <div className="col-8 p-2">
            <div className="contract-data">
              <h2>{t("works.contractDetails.payments")}</h2>
              <div className="goal-info">
                <div className="info-grid">
                  <div className="info-box flex-grow-1">
                    <div className="label">
                      {t("works.contractDetails.contractValue")}
                    </div>
                    <div className="value">
                      {contractDetails?.total_price}
                      <Currency />
                    </div>
                  </div>

                  <div className="info-box flex-grow-1">
                    <div className="label">
                      {t("works.contractDetails.contractDuration")}
                    </div>
                    <div className="value">{contractDetails?.total_days}</div>
                  </div>

                  <div className="info-box flex-grow-1">
                    <div className="label">
                      {t("works.contractDetails.dailyPayment")}
                    </div>
                    <div className="value">
                      {contractDetails?.day_price}
                      <Currency />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="goal-info mt-2">
              <div className="info-grid">
                <div className="info-box flex-grow-1">
                  <div className="label">
                    {t("works.contractDetails.progress")}
                  </div>
                  <div className="progress-bar-label">
                    <span>
                      {contractDetails?.progress_days}{" "}
                      {t("works.contractDetails.days")}
                    </span>
                    <span>
                      {contractDetails?.total_days}{" "}
                      {t("works.contractDetails.day")}
                    </span>
                  </div>
                  <ProgressBar label="" now={60} />
                </div>
              </div>
            </div>

            {/* Money Info */}
            <div className="goal-info mt-2">
              <div className="info-grid">
                <div className="info-box flex-grow-1">
                  <div className="label">
                    {t("works.contractDetails.receivedAmount")}
                  </div>
                  <div className="value">
                    {contractDetails?.received_money}
                    <Currency />
                  </div>
                </div>
                <div className="info-box flex-grow-1">
                  <div className="label">
                    {t("works.contractDetails.remainingBalance")}
                  </div>
                  <div className="value">
                    {contractDetails?.reminder_money} <Currency />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <CancelContractModal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
        workId={contractDetails?.work_id}
        contractId={contractDetails?.id}
      />

      <ContractRateModal
        showModal={showRateMdoal}
        setShowModal={setShowRateModal}
      />
    </section>
  );
}
