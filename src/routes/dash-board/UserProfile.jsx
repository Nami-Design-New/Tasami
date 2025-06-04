import { Link } from "react-router";
import "../../assets/styles/profile.css";
import InfoCard from "../../ui/dash-board/cards/InfoCard";
import PageHeader from "../../ui/PageHeader";
import Rating from "../../ui/dash-board/cards/Rating";

const UserProfile = () => {
  return (
    <div className="user-dashboard">
      <PageHeader removeLast={true} name={"بيانات المستخدم"} />
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3 p-1">
          <div className="user-dashboard__profile">
            <div className="user-dashboard__avatar">
              <img src="https://avatar.iran.liara.run/public/65" />
            </div>
            <Link className="user-dashboard__resume "> السيره الذاتية </Link>
            <Link
              to={`/dashboard/chats`}
              className="user-dashboard__button button"
            >
              تواصل مع المستخدم
            </Link>
            <button className="user-dashboard__button  button--add">
              طلب إيقاف الحساب
            </button>
            <button className="user-dashboard__button  user-dashboard__button--secondary">
              إيقاف الحساب
            </button>
          </div>

          <InfoCard title="بيانات المستخدم">
            <p>
              <span>الخدمات المطلوبه:</span> <span>45</span>
            </p>
            <p>
              <span>العقود المكتمله:</span> <span>68</span>
            </p>
            <p className="user-dashboard__text--danger">
              <span>العقود الملغيه: </span> <span>2</span>
            </p>
          </InfoCard>
        </div>
        <div className="col-12 col-md-6 col-lg p-1">
          {" "}
          <InfoCard title="البيانات الشخصية">
            <p>
              <span>الاسم:</span>
              <span> ملهمه </span>
            </p>
            <p>
              <span>تاريخ الميلاد :</span>
              <span> 05-Feb-1992 </span>
            </p>
            <p>
              <span>الجنس:</span>
              <span>أنثى </span>
            </p>
            <p>
              <span>الإقامة بلد:</span>
              <span>السعودية </span>
            </p>
            <p>
              <span>المدينة:</span>
              <span>الرياض</span>
            </p>
            <p>
              <span>الجنسية:</span>
              <span>السعودية</span>
            </p>
          </InfoCard>
          <InfoCard title="بيانات الاشتراك">
            <p>
              <span>نوع الحساب:</span>{" "}
              <span className="user-dashboard__card-type">جدير</span>
            </p>
            <p>
              <span>رقم الحساب:</span> <span>U-010222-000001</span>
            </p>
            <p>
              <span>تاريخ التسجيل:</span> <span>06-Apr-21</span>
            </p>
            <p>
              <span>رقم التعريف:</span> <span>01-014-004</span>
            </p>
            <p>
              <span>تاريخ الاشتراك:</span> <span>18-Jul-22</span>
            </p>
            <p>
              <span>مدة الاشتراك:</span> <span>6 أشهر</span>
            </p>
            <p>
              <span>حالة الحساب:</span>{" "}
              <span className="user-dashboard__card-status">نشط</span>
            </p>
            <p>
              <span>تاريخ حالة الحساب:</span> <span>22-Sep-22</span>
            </p>
          </InfoCard>
        </div>
        <div className="col-12 col-md-6 col-lg p-1">
          <InfoCard title="تقديم البرامج" withBorder={true}>
            <p>
              <span>البرامج المسموح باضافتها:</span> <span>5</span>
            </p>
            <p>
              <span>البرامج المضافه:</span> <span>2</span>
            </p>
            <p>
              <span>البرامج المسموح بنشرها:</span> <span>3</span>
            </p>
            <p>
              <span>البرامج المنشورة:</span> <span>1</span>
            </p>
            <p>
              <span>البرنامج الأساسي:</span> <span>PTN 051101</span>
            </p>
            <p>
              <span>عقود البرامج المسموح بها:</span> <span>4</span>
            </p>
            <p>
              <span>عقود البرامج النشطه :</span> <span>4</span>
            </p>
          </InfoCard>

          <InfoCard title="تقديم الخدمات" withBorder={true}>
            <p>
              <span>العروض المسموح بإرسالها:</span> <span>3</span>
            </p>
            <p>
              <span>العروض المرسلة:</span> <span>2</span>
            </p>
            <p>
              <span>عقود الخدمات النشطة:</span> <span>3</span>
            </p>
          </InfoCard>

          <InfoCard title="التقييم" withBorder={true}>
            <Rating label="التقييم الإجمالي" value="4.7" />
            <Rating label="الخبره المعرفه" value="3.2" />
            <Rating label="الالتزام بالمواعيد" value="3.8" />
            <Rating label="جودة الأداء" value="4.3" />
            <Rating label="الاحترام والتعامل" value="4.2" />
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
