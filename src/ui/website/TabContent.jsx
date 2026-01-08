import WorkCard from "../../ui/cards/WorkCrad";

export default function TabContent({ activeTab }) {
  const sampleWorks = [
    {
      id: 1,
      title: "انشاء متجر الكتروني لبيع مستلزمات الطباعة ثلاثية الأبعاد",
      country: "السعودية",
      date: "16 فبراير 2025",
      time: "02:30 م",
      category: "مؤسسة - تعليم",
      status: "pending",
    },
    {
      id: 2,
      title: "إطلاق منصة تعليمية إلكترونية للطلاب في المرحلة الثانوية",
      country: "مصر",
      date: "10 إبريل 2025",
      time: "09:00 ص",
      category: "مؤسسة - تعليم",
      status: "inprogress",
      user: {
        name: "انس تركي",
        rate: 4.4,
        image: "/images/user.png",
      },
    },
  ];

  const filteredWorks = sampleWorks.filter((work) => work.status === activeTab);

  return (
    <div className="tab-content">
      {filteredWorks.length > 0 ? (
        filteredWorks.map((work) => <WorkCard key={work.id} work={work} />)
      ) : (
        <p>لا توجد أعمال</p>
      )}
    </div>
  );
}
