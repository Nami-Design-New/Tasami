import { useState } from "react";
import { useParams } from "react-router";
import useGetOfferDetials from "../../hooks/my-assistances/useGetOfferDetials";
import CustomButton from "../../ui/CustomButton";
import ContractReq from "../../ui/modals/ContractReqModal";
import ReportModal from "../../ui/modals/ReportModal";
import ReviewsModal from "../../ui/modals/ReviewsModal";
import InquiryModal from "../../ui/modals/inquiryModal";
import OptionsMenu from "../../ui/website/OptionsMenu";
import SectionHeader from "../../ui/website/SectionHeader";
import OfferInfoGrid from "../../ui/website/offers/OfferInfoGrid";
import TopInfo from "../../ui/website/offers/TopInfo";
import Loading from "../../ui/loading/Loading";
import { useSelector } from "react-redux";
export default function OfferDetails() {
  const { offerDetails, isLoading } = useGetOfferDetials();
  const { user } = useSelector((state) => state.authRole);

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

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
        <div className="header">
          <SectionHeader title="تفاصيل العرض" />
          {user.id === offerDetails.user.id && (
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
          {user.id !== offerDetails.user.id && (
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
          )}
        </div>
        <div className="goal-details-card mt-3 row">
          <TopInfo offer={offerDetails} />
          <div className="col-lg-8 col-12 ">
            <div className="hed">
              <img src="/icons/triangle.svg" />
              <h6>المساعدة</h6>
            </div>
            <p className="desc">{offerDetails?.title}</p>
            <OfferInfoGrid
              offer={offerDetails}
              onShowHelpModal={() => setShowHelpModal(true)}
              onShowReviewsModal={() => setShowReviewsModal(true)}
            />
            {/* <div className="hed">
              <h6>تقييمات سابقة</h6>
            </div> */}
            <div className="info-grid">
              {/* <div className="info-box w-100">
                <div className="flex">
                  <div className="label">مستفيدون سابقون </div>
                  <div className="bold">
                    <img src="/icons/Groups.svg" alt="icon" />
                    <span>{offerDetails?.Previousbeneficiaries}</span>
                  </div>
                </div>
              </div> */}
              {/* <div className="info-box w-100">
                <div className="flex">
                  <div className="label">التقييم الاجمالي</div>
                  <div>
                    <i className="fa-solid fa-star text-warning"></i>{" "}
                    <span className="bold">{offerDetails.rating}</span>
                  </div>
                </div>

                <ul className="rates-list mt-2">
                  {offerDetails.rates.map((rate, index) => (
                    <li key={index}>
                      <div className="flex">
                        <span>{rate.label}</span>
                        <span> {rate.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
              <CustomButton onClick={() => setShowHelpModal(true)}>
                إرسال طلب تعاقد
              </CustomButton>
              <CustomButton onClick={() => setShowReviewsModal(true)}>
                عرض التقييمات
              </CustomButton>
            </div>
          </div>
        </div>

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
