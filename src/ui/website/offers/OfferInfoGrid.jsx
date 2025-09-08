export default function OfferInfoGrid({ offer }) {
  return (
    <div className="info-grid">
      <div className="info-box">
        <div className="label">المجال </div>
        <div className="value">{offer.category_title}</div>
      </div>
      <div className="info-box">
        <div className="label"> التخصص</div>
        <div className="value">{offer.sub_category_title}</div>
      </div>
      <div className="info-box">
        <div className="label"> قيمة المساعدة</div>
        <div className="value">
          {offer.help_service.price} <img src="/icons/ryal.svg" alt="ريال" />
        </div>
      </div>
      <div className="info-box">
        <div className="label">تفضيل هوية المستفيد</div>
        <div className="value">{offer.preferred_gender}</div>
      </div>
      <div className="info-box">
        <div className="label">الفئة العمرية للمستفيد</div>
        <div className="value">
          {offer.help_service.from_age} - {offer.help_service.to_age}
        </div>
      </div>
      <div className="info-box">
        <div className="label">المدة المتوقعة لتقديم المساعدة</div>
        <div className="value">{offer.help_service.duration} يوم </div>
      </div>
      {/* <div className="info-box w-50">
        <div className="label">بنود إضافية للمجموعة</div>
        <div className="value">{offer.help_service.duration}</div>
      </div> */}
      {/* <div className="info-box w-50">
        <div className="label">آليات المساعدة المعتمدة</div>
        {offer.assistMethods.map((method, index) => (
          <div className="value" key={index}>
            <img src="/icons/check.svg" /> {method}
          </div>
        ))}
      </div> */}
    </div>
  );
}
