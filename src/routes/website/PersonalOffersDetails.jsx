import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetPersonalOfferDetails from "../../hooks/website/personal-assistances/useGetPersonalOfferDetails";
import CustomButton from "../../ui/CustomButton";
import Loading from "../../ui/loading/Loading";
import ContractReq from "../../ui/modals/ContractReqModal";
import ReportModal from "../../ui/modals/ReportModal";
import ReviewsModal from "../../ui/modals/ReviewsModal";
import InquiryModal from "../../ui/modals/inquiryModal";
import OptionsMenu from "../../ui/website/OptionsMenu";
import SectionHeader from "../../ui/website/SectionHeader";
import OfferInfoGrid from "../../ui/website/offers/OfferInfoGrid";
import TopInfo from "../../ui/website/offers/TopInfo";
import useAddOrRemoveBookmark from "../../hooks/website/personal-assistances/useAddOrRemoveBookmark";

export default function PersonalOffersDetails() {
  const { offerDetails, isLoading } = useGetPersonalOfferDetails();
  const { toggleBookmark, isPending } = useAddOrRemoveBookmark();
  const [bookmarked, setBookmarked] = useState(offerDetails?.is_saved || false);
  const { user } = useSelector((state) => state.authRole);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  useEffect(() => {
    setBookmarked(offerDetails?.is_saved || false);
  }, [offerDetails?.is_saved]);
  const handleToggleBookmark = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const prevState = bookmarked;
    setBookmarked(!prevState);

    toggleBookmark(id, {
      onError: () => {
        setBookmarked(prevState);
      },
    });
  };
  const closeModals = () => {
    setShowHelpModal(false);
    setShowReportModal(false);
    setShowInquiryModal(false);
    setShowReviewsModal(false);
  };
  if (isLoading) return <Loading />;

  return (
    <section className="page offer-details-section ">
      <div className="container">
        <div className="col-12 p-2">
          <div className="header">
            <SectionHeader title="تفاصيل العرض" />
            {user?.id === offerDetails.user.id && (
              <OptionsMenu
                options={[
                  { label: "تعديل", onClick: () => console.log("edit") },
                  {
                    label: "ارشفه",
                    onClick: () => console.log("Archive"),
                  },
                  {
                    label: "حذف",
                    onClick: () => console.log("Delete"),
                    className: "text-danger",
                  },
                ]}
              />
            )}
            <div className="d-flex align-items-center gap-2">
              <button
                onClick={(e) => handleToggleBookmark(e, offerDetails.id)}
                className="toggle-bookmark-button"
              >
                <i
                  className={`fa-solid fa-bookmark ${
                    bookmarked ? "active" : ""
                  } ${isPending ? "opacity-50" : ""}`}
                ></i>
              </button>
              <OptionsMenu
                options={[
                  { label: "استفسار", onClick: () => console.log("Inquiry") },
                  {
                    label: "إبلاغ عن مخالفة",
                    onClick: () => console.log("Report"),
                    className: "text-danger",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="goal-details-card mt-3 row">
          <div className="col-12 col-lg-4 p-2">
            <TopInfo offer={offerDetails} />{" "}
          </div>

          <div className="col-lg-8 col-12 p-2">
            <div className="hed">
              <img src="/icons/triangle.svg" />
              <h6>المساعدة</h6>
            </div>{" "}
            <p className="desc">{offerDetails?.title}</p>{" "}
            <OfferInfoGrid
              offer={offerDetails}
              onShowHelpModal={() => setShowHelpModal(true)}
              onShowReviewsModal={() => setShowReviewsModal(true)}
            />
            {offerDetails.help_service?.notes && (
              <div className="extra-terms">
                <h2>بنود إضافية</h2>
                <p>{offerDetails?.help_service?.notes}</p>
              </div>
            )}
            <div className="extra-terms">
              <h2>آليات المساعدة المناسبة</h2>
              <ul className="mechanisms-list  ">
                {offerDetails.mechanisms.map((item) => (
                  <li key={item.id} className="mech-item">
                    {" "}
                    {item.title}{" "}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rates">
              <h2>تقييمات سابقة</h2>
              <div className="extra-terms">
                <div className="content">
                  <h3>مستفيدون سابقون</h3>
                  <div className="user-count">
                    <i className="fa-regular fa-users"></i>
                    <span>{offerDetails.previous_users}</span>
                  </div>
                </div>
              </div>
              <div className="extra-terms">
                <div className="content">
                  <h3>التقييم الاجمالي</h3>
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
                    <span>الخبرة والمعرفة</span>
                    <span>{offerDetails.experience_rate}</span>
                  </li>
                  <li>
                    <span> الالتزام بالوقت</span>
                    <span>{offerDetails.time_rate}</span>
                  </li>
                  <li>
                    <span>جودة الأداء</span>
                    <span>{offerDetails.quality_rate}</span>
                  </li>
                  <li>
                    <span>حسن التعامل</span>
                    <span>{offerDetails.good_treatment}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="buttons justify-content-end mt-2">
              <CustomButton
                variant="outlined"
                color="primary"
                onClick={() => setShowReviewsModal(true)}
              >
                عرض التقييمات
              </CustomButton>{" "}
              <CustomButton onClick={() => setShowHelpModal(true)}>
                إرسال طلب تعاقد
              </CustomButton>
            </div>
          </div>
        </div>{" "}
        <ContractReq
          showModal={showHelpModal}
          setShowModal={setShowHelpModal}
        />
        <ReportModal
          showModal={showReportModal}
          setShowModal={setShowReportModal}
        />
        <InquiryModal
          showModal={showInquiryModal}
          setShowModal={setShowInquiryModal}
        />
        <ReviewsModal
          showModal={showReviewsModal}
          setShowModal={setShowReviewsModal}
          reviews={[
            {
              name: "عماد مجيدي",
              stars: 5,
              time: "منذ 16 يوم و9 ساعات",
              comment: "الخدمة مميزة جدا",
            },
            {
              name: "محمد خالد",
              stars: 4,
              time: "منذ 10 أيام و5 ساعات",
              comment: "سعيد بالتعامل مع الاستاذ يوسف العتيبي",
            },
            {
              name: "نورا مصطفى",
              stars: 2,
              time: "منذ يومين و6 ساعات",
              comment: "جودة واداء اكثر من رائع",
            },
            {
              name: "حسن صلاح",
              stars: 3,
              time: "منذ 3 أيام و7 ساعات",
              comment: "الخدمة مميزة جدا",
            },
            {
              name: "علي أحمد",
              stars: 5,
              time: "منذ 10 ساعات",
              comment: "سعيد بالتعامل مع الاستاذ يوسف العتيبي",
            },
          ]}
        />
      </div>
    </section>
  );
}
