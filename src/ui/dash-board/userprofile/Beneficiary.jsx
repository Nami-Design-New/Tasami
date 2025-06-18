import React from "react";
import InfoCard from "../cards/InfoCard";

const Beneficiary = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-6 p-1">
        <InfoCard title=" حساب المستفيد">
          <p>
            <span>رقم الحساب:</span>
            <span>U-022225-0000012</span>
          </p>
          <p>
            <span>رقم التعريف:</span>
            <span>01-14-002</span>
          </p>
          <p>
            <span>تاريخ التسجيل:</span>
            <span>2025-06-11</span>
          </p>
          <p>
            <span>حالة الحساب:</span>
            <span>نشط</span>
          </p>
          <p>
            <span>تاريخ حالة الحساب:</span>
            <span>2025-06-11</span>
          </p>
          <p>
            <span>تاريخ آخر دخول:</span>
            <span>2025-06-11</span>
          </p>
        </InfoCard>
      </div>
      <div className="col-12 col-md-6 p-1">
        <InfoCard title="نشاط المستفيد" link=" سجل عقود الموظفين ">
          <p>
            <span>الأهداف المكتملة:</span>
            <span>12</span>
          </p>
          <p>
            <span>الأهداف قيد التنفيذ:</span>
            <span>2</span>
          </p>
          <p>
            <span>الطلبات المكتملة:</span>
            <span>5</span>
          </p>
          <p>
            <span>الطلبات قيد التنفيذ:</span>
            <span>1</span>
          </p>
          <p>
            <span>العروض المكتملة:</span>
            <span>5</span>
          </p>
          <p>
            <span>العروض قيد التنفيذ:</span>
            <span>0</span>
          </p>
          <p>
            <span>مشتريات العقود:</span>
            <span>2,450 ريال</span>
          </p>
          <p>
            <span>نقاط الخبرة:</span>
            <span>45</span>
          </p>
          <p>
            <span>عضوية المجتمعات:</span>
            <span>2</span>
          </p>
          <p>
            <span>المتابعون:</span>
            <span>242</span>
          </p>
          <p>
            <span>مشتركات المجتمعات:</span>
            <span>158</span>
          </p>
          <p>
            <span>الاقتراحات:</span>
            <span>18</span>
          </p>
          <p>
            <span>التصنيفات الجديدة:</span>
            <span>2</span>
          </p>
          <p>
            <span>بلاغات المخالفات:</span>
            <span>4</span>
          </p>
        </InfoCard>
      </div>
    </div>
  );
};

export default Beneficiary;
