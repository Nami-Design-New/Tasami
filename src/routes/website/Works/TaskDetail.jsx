import { useParams } from "react-router";
import SectionHeader from "../../../ui/website/SectionHeader";
import { useState } from "react";
import CancelConfirmationModal from "../../../ui/modals/CancelConfirmationModal";

export default function TaskDetailPage() {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="tasks-details page">
      <div className="container">
        <div className="row">
          <div className="header">
            <SectionHeader title="تفاصيل المهمة" />
            <div className="options-menu">
              <i className="fas fa-ellipsis-v" onClick={toggleMenu}></i>
              {menuOpen && (
                <div className="options-list">
                  <button>تعديل</button>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="text-danger"
                  >
                    حذف
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="info-grid">
            <div className="info-box">
              <div className="label">المجال والتخصص</div>
              <div className="value">ريادة الاعمال</div>
            </div>
            <div className="info-box">
              <div className="label">مؤشر قوي المجموعة</div>
              <div className="value">91%</div>
            </div>
            <div className="info-box">
              <div className="label">تفاصيل المهمة</div>
              <div className="value">
                السيرة الذاتية هي عبارة عن ملخص منظم للخبرات المهنية، والخلفية
                التعليمية، والمهارات، والمعلومات الشخصية ذات الصلة بمقدم طلب
                العمل. تُستخدم السيرة الذاتية لعرض مؤهلات الشخص، والتعريف بالمهن
                التي عمل بها سابقًا، وما يمتلكه من قدرات وخبرات، وذلك بهدف
                تقديمها لأصحاب العمل عند التقدم لوظيفة معينة.
              </div>
            </div>
            <div className="info-box">
              <div className="label">تصنيف المهمة</div>
              <div className="value">
                <img src="/icons/aim.svg" alt="" />
                تنمية معرفية
              </div>
            </div>
            <div className="info-box">
              <div className="label"> اشعارات التركيز</div>
              <div className="value">
                <img src="/icons/bell.svg" alt="" />
                يومي{" "}
              </div>
            </div>
            <div className="info-box">
              <div className="label"> تاريخ الانجاز</div>
              <div className="value">
                <img src="/icons/date.svg" alt="" />
                16 فبراير 2025{" "}
              </div>
            </div>
          </div>
          <div className="type">
            <h3 className="hed">حالة المهمة</h3>
            <div className="type-tabs">
              <span className="type-tab active">انتظار التنفيذ</span>
              <span className="type-tab">قيد التنفيذ</span>
              <span className="type-tab">مكتمل</span>
            </div>
          </div>
        </div>
      </div>
      <CancelConfirmationModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
      />
    </div>
  );
}
