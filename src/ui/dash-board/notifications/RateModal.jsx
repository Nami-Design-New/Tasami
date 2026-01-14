import GlobalModal from "../../GlobalModal";
import StarRate from "../../ModelComponent/common/StarRate";

export default function RateModal({ showModal, setShowModal }) {
  const rating = 4.2;

  return (
    <GlobalModal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
    >
      <GlobalModal.Header closeButton>تفاصيل التقييم</GlobalModal.Header>
      <GlobalModal.Body>
        <div className="rate">
          <div className="row">
            <div className="col-12 p-2">
              <p>
                {" "}
                تواصلت مع خدمة العملاء للاستفسار عن إحدى الخدمات، وتم الرد عليّ
                بسرعة واحترافية. أشكر الفريق على تعاونهم واهتمامهم، وأتطلع
                للتعامل معكم مجددًا.
              </p>
            </div>
            <div className="col-12 p-2">
              <StarRate rating={rating} />
            </div>
          </div>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
