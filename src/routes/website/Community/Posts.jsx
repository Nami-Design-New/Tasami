
import PostCard from "../../../ui/cards/PostCard";

export default function Posts() {
 
  const posts = [
    {
      id:1,
      desc: "كيف يمكنني تحسين مهاراتي في إدارة الوقت لتجنب التأخير في مواعيد التسليم؟",
      type: "qes",
      date: "1 يوليو 2025",
      stats: [
        { icon: "fa-regular fa-share", value: 12 },
        { icon: "fa-regular fa-heart", value: 45 },
        { icon: "fa-regular fa-comment", value: 8 },
        { icon: "fa-regular fa-eye", value: 60 },
      ],
    },
    {
      id:2,
      desc: "ما هي الاستراتيجيات للتعامل مع المخاطر الناتجة عن التغييرات المفاجئة؟",
      type: "qes",
       date: "1 يوليو 2025",
      stats: [
        { icon: "fa-regular fa-share", value: 12 },
        { icon: "fa-regular fa-heart", value: 45 },
        { icon: "fa-regular fa-comment", value: 8 },
        { icon: "fa-regular fa-eye", value: 60 },
      ],
    },
    {
  id:3,
  desc: "تجربة جديدة في تنظيم الوقت...",
  type: "qes",
  date: "2 أغسطس 2025",
  stats: [
    { icon: "fa-regular fa-share", value: 5 },
    { icon: "fa-regular fa-heart", value: 20 },
    { icon: "fa-regular fa-comment", value: 3 },
    { icon: "fa-regular fa-eye", value: 50 },
  ],
},
     {
      id:4,
      desc: "نماذج جاهزة تساعدك على إعداد خطة فعّالة لإدارة التغيير",
      type: "qes",
       date: "1 يوليو 2025",
       image: "/images/p1.png", 
      stats: [
        { icon: "fa-regular fa-share", value: 12 },
        { icon: "fa-regular fa-heart", value: 45 },
        { icon: "fa-regular fa-comment", value: 8 },
        { icon: "fa-regular fa-eye", value: 60 },
      ],
    },
  ];

  return (
    <div className="consultations-section">
     

      <div className="row">
        {posts.map((item, idx) => (
          <div className="col-lg-4 mt-3" key={idx}>
            <PostCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
