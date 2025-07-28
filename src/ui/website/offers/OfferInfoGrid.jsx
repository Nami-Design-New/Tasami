import React from "react";

export default function OfferInfoGrid({ offer }) {
  return (
    <div className="info-grid">
      <div className="info-box">
        <div className="label">المجال </div>
        <div className="value">{offer.type}</div>
      </div>
      <div className="info-box">
        <div className="label"> التخصص</div>
        <div className="value">{offer.section}</div>
      </div>
      <div className="info-box">
        <div className="label"> قيمة المساعدة</div>
        <div className="value">
          {offer.price} <img src="/icons/ryal.svg" alt="ريال" />
        </div>
      </div>
      <div className="info-box">
        <div className="label">تفضيل هوية المستفيد</div>
        <div className="value">{offer.identity}</div>
      </div>
      <div className="info-box">
        <div className="label">الفئة العمرية للمستفيد</div>
        <div className="value">{offer.ageCategory}</div>
      </div>
      <div className="info-box w-50">
        <div className="label">بنود إضافية للمجموعة</div>
        <div className="value">{offer.extraTerms}</div>
      </div>
      <div className="info-box w-50">
        <div className="label">آليات المساعدة المعتمدة</div>
        {offer.assistMethods.map((method, index) => (
          <div className="value" key={index}>
            <img src="/icons/check.svg" /> {method}
          </div>
        ))}
      </div>
    </div>
  );
}
