import { Link } from "react-router";
import CustomButton from "../../ui/CustomButton";
import { useParams } from "react-router";

export default function CommunityHeader() {
  const { id } = useParams();

  const helpers = [
    {
      id: 1,
      name: "انس تركي",
      country: "السعودية",
      rating: 4.4,
      type: "ريادي",
      members: 40,
      price: 248,
      image: "./images/p2.png",
      status: true,
      likes: 122,
      activity: "متوسط",
      desc: "  السيرة الذاتية هي عبارة عن ملخص منظم للخبرات المهنية، والخلفية التعليمية، والمهارات، والمعلومات الشخصية ذات الصلة بمقدم طلب العمل. تُستخدم السيرة الذاتية لعرض مؤهلات الشخص، والتعريف بالمهن التي عمل بها سابقًا، وما يمتلكه من قدرات وخبرات، وذلك بهدف تقديمها لأصحاب العمل عند التقدم لوظيفة معينة.",
    },
    {
      id: 2,
      name: "مها صالح",
      country: "الإمارات",
      rating: 4.7,
      type: "تقنية",
      members: 35,
      price: 212,
      image: "./images/p1.png",
      status: true,
      likes: 475,
      activity: "متوسط",
      desc: "  السيرة الذاتية هي عبارة عن ملخص منظم للخبرات المهنية، والخلفية التعليمية، والمهارات، والمعلومات الشخصية ذات الصلة بمقدم طلب العمل. تُستخدم السيرة الذاتية لعرض مؤهلات الشخص، والتعريف بالمهن التي عمل بها سابقًا، وما يمتلكه من قدرات وخبرات، وذلك بهدف تقديمها لأصحاب العمل عند التقدم لوظيفة معينة.",
    },
    {
      id: 3,
      name: "انس تركي",
      country: "السعودية",
      rating: 4.4,
      type: "ريادي",
      members: 40,
      price: 228,
      likes: 231,
      image: "./images/p2.png",
      status: true,
      activity: "متوسط",
      desc: "  السيرة الذاتية هي عبارة عن ملخص منظم للخبرات المهنية، والخلفية التعليمية، والمهارات، والمعلومات الشخصية ذات الصلة بمقدم طلب العمل. تُستخدم السيرة الذاتية لعرض مؤهلات الشخص، والتعريف بالمهن التي عمل بها سابقًا، وما يمتلكه من قدرات وخبرات، وذلك بهدف تقديمها لأصحاب العمل عند التقدم لوظيفة معينة.",
    },
    {
      id: 4,
      name: "مها صالح",
      country: "الإمارات",
      rating: 4.7,
      type: "تقنية",
      members: 35,
      price: 292,
      likes: 24,
      image: "./images/p1.png",
      status: true,
      activity: "متوسط",
      desc: "  السيرة الذاتية هي عبارة عن ملخص منظم للخبرات المهنية، والخلفية التعليمية، والمهارات، والمعلومات الشخصية ذات الصلة بمقدم طلب العمل. تُستخدم السيرة الذاتية لعرض مؤهلات الشخص، والتعريف بالمهن التي عمل بها سابقًا، وما يمتلكه من قدرات وخبرات، وذلك بهدف تقديمها لأصحاب العمل عند التقدم لوظيفة معينة.",
    },
  ];

  const helper = helpers.find((h) => h.id === parseInt(id));

  if (!helper) return <div>المساعد غير موجود</div>;

  return (
    <div className="community-header">
      <img src={helper.image} alt="cover" className="cover-image" />
      <div className="community-details">
        <div className="hed">
          <h5>مجتمع {helper.name}</h5>
          <div className="options-menu">
            <button className="follow-btn">
              <i className="fa-solid fa-user-plus me-2"></i> انضمام
            </button>
            <button className="cancel-btn">
              <i className="fa-solid fa-user-xmark me-2"></i>
              الغاء العضوية
            </button>
          </div>
        </div>

        <div className="info">
          <div className="info-grid">
            <div className="info-box">
              <div className="label">الأعضاء</div>
              <div className="value">
                <i className="fa-solid fa-users me-1"></i> {helper.members} عضو
              </div>
            </div>
            <div className="info-box">
              <div className="label">الإعجابات</div>
              <div className="value">
                <i className="fa-solid fa-heart me-1"></i> {helper.likes}
              </div>
            </div>
            <div className="info-box">
              <div className="label">قيمة العضوية</div>
              <div className="value">
                <i className="fa-solid fa-coins me-1"></i> {helper.price}
                <img src="/icons/ryal.svg" alt="" />
              </div>
            </div>
            <div className="info-box">
              <div className="label">مؤشر النشاط</div>
              <div className="value">
                <i className="fa-solid fa-chart-line me-1"></i>{" "}
                {helper.activity}
              </div>
            </div>
          </div>
        </div>
        <p>{helper.desc}</p>
      </div>
    </div>
  );
}
