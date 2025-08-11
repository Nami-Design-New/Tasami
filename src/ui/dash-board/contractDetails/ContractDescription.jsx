export default function ContractDescription() {
  return (
    <div className="contract-description">
      <h3 className="title">
        <img src="/icons/help-triangle.svg" />
        <span>المساعدة</span>
      </h3>
      <p className="description">
        تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين
        من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط
        البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح
        مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول
        إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن
        صحتهم.
      </p>
      <div className="row">
        <div className="col-6 p-2">
          <div className="dec-item">
            <h5>المجال</h5>
            <p>ريادة الأعمال</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          <div className="dec-item">
            <h5>التخصص</h5>
            <p>إدارة المشاريع الصغيرة</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          {" "}
          <div className="dec-item">
            <h5>المدة المتوقعة لتحقيق الهدف</h5>
            <p>3 أشهر</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          {" "}
          <div className="dec-item">
            <h5>تفضيل هوية المستفيد</h5>
            <p>الكل</p>
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
          <h5 className="mb-2">آليات المساعدة المناسبة</h5>
          <ul className="mechanisms">
            <li>
              <img src="/icons/check.svg" />
              <span>الالتقاء الشخصي</span>
            </li>
            <li>
              <img src="/icons/check.svg" />
              <span>الاتصال المرئي والمسموع</span>
            </li>
            <li>
              <img src="/icons/check.svg" />
              <span>التراسل النصي والصوتي</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
