import { Link } from "react-router";
import CustomButton from "../../ui/CustomButton";

export default function CommunityHeader() {
  return (
    <div className="community-header">
    <img src="/images/p1.png" alt="cover" className="cover-image" />
      <div className="community-details">
        <h5>مجتمع رحاب السعيد</h5>
        <div className="info">
          <div className="stats"> 
            <span>
              <i className="fa-solid fa-users"></i>144 عضو
            </span>
            <span>
              <i className="fa-solid fa-heart"></i> 3032 إعجاب
            </span>
          </div>
          <div>
            <Link to="#">
              <CustomButton color="primary">
                انضمام <i className="fa-light fa-user-plus"></i>
              </CustomButton>
            </Link>
          </div>
        </div>
        <p>
          أنا رحاب السعيد، متخصص في ريادة الأعمال مع أكثر من 10 سنوات من الخبرة في تنمية وتطوير المنشآت الصغيرة والمتوسطة.  عملت خلال مسيرتي على تمكين رواد الأعمال من تحويل أفكارهم إلى مشاريع ناجحة ومستدامة، من خلال تقديم الاستشارات، وبناء نماذج الأعمال، وتصميم خطط النمو والتوسع. أؤمن بأهمية الابتكار والتخطيط الاستراتيجي في تحقيق الأثر، وأسعى دائمًا إلى دعم البيئة الريادية في المملكة وتمكين الكفاءات المحلية        </p>
      </div>
    </div>
  );
}
