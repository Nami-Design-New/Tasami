import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import useGetContractDetails from "../../../hooks/website/MyWorks/assistants/useGetContractDetails";
import HelperCard from "../../../ui/cards/HelperCard";
import Currency from "../../../ui/Currency";
import CustomLink from "../../../ui/CustomLink";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CancelContractModal from "../../../ui/website/my-works/CancelContractModal";

export default function WorksContractDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { lang } = useSelector((state) => state.language);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const menuRef = useRef(null);
  const options = [
    {
      id: 1,
      label: "تمديد العقد",
      className: "text-green",
    },
    {
      id: 1,
      label: "أنهاء العقد",
      className: "text-fire",
      onClick: () => setShowCancelModal(true),
    },
  ];
  const { contractDetails, isLoading } = useGetContractDetails();
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
  console.log(contractDetails);
  return (
    <section className="work-contract-details page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <header>
              <RoundedBackButton
                onClick={() => navigate(-1)}
              ></RoundedBackButton>
              <div className="work-actions">
                <button className="action-buttons">
                  <img src="/icons/work-star.svg" />
                </button>
                <Link className="action-buttons">
                  <img src="/icons/work-chat.svg" />
                </Link>{" "}
                <div className="options-menu" ref={menuRef}>
                  <button className="action-buttons" onClick={toggleMenu}>
                    <img src="/icons/contract-flag.svg" />
                  </button>
                  {menuOpen && (
                    <div
                      className={`options-list  ${lang === "en" ? "en" : ""} `}
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
              </div>
            </header>
          </div>
          <div className="col-4 p-2">
            <d-flex className="d-flex flex-column gap-3">
              <HelperCard helper={contractDetails?.helper} />
              <CustomLink
                type="outlined"
                fullWidth
                size="large"
                to={`/helper/${contractDetails.helper.id}`}
              >
                السيرة الذاتية
              </CustomLink>
            </d-flex>
          </div>
          <div className="col-8 p-2">
            <div className="contract-data">
              <h2>المدفوعات</h2>
              <div className="goal-info">
                <div className="info-grid">
                  <div className="info-box flex-grow-1">
                    <div className="label">قيمة العقد</div>
                    <div className="value">
                      {contractDetails?.total_price}
                      <Currency />
                    </div>
                  </div>
                  <div className="info-box flex-grow-1">
                    <div className="label">مدة العقد</div>
                    <div className="value">{contractDetails?.total_days}</div>
                  </div>
                  <div className="info-box flex-grow-1">
                    <div className="label">
                      قيمة الاستحقاق اليومي للمساعد الشخصي
                    </div>
                    <div className="value">
                      {contractDetails?.day_price}
                      <Currency />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="goal-info mt-2">
              <div className="info-grid">
                <div className="info-box flex-grow-1">
                  <div className="label">التقدم </div>
                  <div className="progress-bar-label">
                    <span>{contractDetails?.progress_days} ايام</span>
                    <span>{contractDetails?.total_days} يوم</span>
                  </div>
                  <ProgressBar label="" now={60} />
                </div>
              </div>
            </div>
            <div className="goal-info mt-2">
              <div className="info-grid">
                <div className="info-box flex-grow-1">
                  <div className="label">القيمة المستحقة للمساعد</div>
                  <div className="value">
                    {contractDetails?.received_money}
                    <Currency />
                  </div>
                </div>
                <div className="info-box flex-grow-1">
                  <div className="label">رصيد الضمان المتبقي</div>{" "}
                  <div className="value">
                    {contractDetails?.reminder_money} <Currency />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CancelContractModal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
      />
    </section>
  );
}
