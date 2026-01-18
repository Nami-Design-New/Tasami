import helpTriangleWithHelper from "../../../assets/icons/triangle-with-helper.svg";
import helpTriangle from "../../../assets/icons/help-triangle.svg";

import check from "../../../assets/icons/check.svg";
import { useTranslation } from "react-i18next";

export default function ContractDescription({ work }) {
  const { t } = useTranslation();
  return (
    <div className="contract-description">
      <h3 className="title">
        <img
          src={work.type === "goal" ? helpTriangleWithHelper : helpTriangle}
        />
        <span>المساعدة</span>
      </h3>
      <p className="description">{work?.title}</p>
      <div className="row">
        <div className="col-sm-6 p-2">
          <div className="dec-item">
            <h5>المجال</h5>
            <p>{work?.category_title}</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          <div className="dec-item">
            <h5>التخصص</h5>
            <p>{work?.sub_category_title}</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          {" "}
          <div className="dec-item">
            <h5>المدة المتوقعة لتحقيق الهدف</h5>
            <p>{work?.goal?.expected_duration_new_human}</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          {" "}
          <div className="dec-item">
            <h5>تفضيل هوية المستفيد</h5>
            <p>{t(`${work?.preferred_gender}`)}</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          <div className="dec-item">
            <h5>الفئة العمرية للمستفيد</h5>
            <p>15 - 24</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 p-2">
          <h5 className=" mechanisms-title ">آليات المساعدة المناسبة</h5>
          <ul className="mechanisms">
            <li>
              <img src={check} />
              <span>الالتقاء الشخصي</span>
            </li>
            <li>
              <img src={check} />
              <span>الاتصال المرئي والمسموع</span>
            </li>
            <li>
              <img src={check} />
              <span>التراسل النصي والصوتي</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
