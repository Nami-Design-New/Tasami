import { Modal } from "react-bootstrap";
import Currency from "../../Currency";

export default function DetailsSubscriptionsModal({ showModal, setShowModal }) {
  return (
    <Modal
      centered
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton> تفاصيل الخطة </Modal.Header>
      <Modal.Body>
        <div className="subscriptions-details">
          <div className="row">
            <div className="col-12 p-2">
              <div className="subscriptions-header">
                <img
                  src="/images/dashboard/silver-package.svg"
                  alt="Preview"
                  className="image-preview-circle"
                />
                <h3>الحساب الأساسي</h3>
                <p>مجاناً مدى الحياة</p>
              </div>
            </div>
            <div className="col-12 p-2">
              <ul>
                <li>
                  <span>
                    عدد عروض الأسعار التي يمكن تقديمها للمستفيدين في نفس الوقت
                  </span>
                  <span>10</span>
                </li>
                <li>
                  <span>عدد المجموعات التي يمكن إنشاؤها</span>
                  <span>10</span>
                </li>
                <li>
                  <span>
                    عدد المقاعد المتاحة للمستفيدين في المجموعة الواحدة
                  </span>
                  <span>10</span>
                </li>
                <li>
                  <span>عمولة المنصة من العقود وعضويات المجتمعات</span>
                  <span>20%</span>
                </li>
              </ul>
            </div>
            <div className="col-6 p-2">
              <div className="subscription-price">
                <span> السعر السنوي :</span>
                <span>
                  300 <Currency />
                </span>
              </div>
            </div>
            <div className="col-6 p-2">
              <div className="subscription-price">
                <span> السعر النصف السنوي :</span>
                <span>
                  600 <Currency />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
