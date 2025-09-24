import EncounterCard from "../../ui/website/communities/meetings/MeetingCard";

export default function Meetings() {
  const encounters = [
    {
      id: 1,
      title: "لقاء تطوير المهارات",
      desc: "مناقشة مهارات القيادة ورفع كفاءة الفريق لتحقيق أهداف العمل.",
      date: "25 يونيو 2025",
      time: "4:00 مساءً",
      duration: "25 دقيقة",
      url: "https://zoom.us/1225dfe852ffa/php",
      field: "الفنون",
      specialty: "الرسم",
    },
    {
      id: 2,
      title: "ورشة إدارة المشاريع",
      desc: "أفضل الممارسات لتخطيط ومتابعة المشاريع بكفاءة.",
      date: "27 يونيو 2025",
      time: "6:00 مساءً",
      duration: "40 دقيقة",
      url: "https://zoom.us/1225dfe852ffa/php",
      field: "الفنون",
      specialty: "الرسم",
    },
    {
      id: 3,
      title: "ندوة الابتكار",
      desc: "كيف تحفز الابتكار داخل فريق العمل لتحقيق التميز.",
      date: "1 يوليو 2025",
      time: "8:00 مساءً",
      duration: "30 دقيقة",
      url: "https://zoom.us/1225dfe852ffa/php",
      field: "الفنون",
      specialty: "الرسم",
    },
    {
      id: 4,
      title: "اللقاء الخامس",
      desc: "كيف تحفز الابتكار داخل فريق العمل لتحقيق التميز.",
      date: "1 يوليو 2025",
      time: "8:00 مساءً",
      duration: "30 دقيقة",
      url: "https://zoom.us/1225dfe852ffa/php",
      field: "الفنون",
      specialty: "الرسم",
    },
  ];

  return (
    <section className="meeting-section">
      <div className="row">
        <div className="col-12 p-2">
          <div className="consultations-header justify-content-end">
            {/* {communityDetails.is_subscribed && (
              <CustomButton className="" onClick={() => setShowModal(true)}>
                {t("community.addConsultation")}
              </CustomButton>
            )} */}
          </div>
        </div>
      </div>
      <div className=" mettings-list">
        {encounters.map((item) => (
          <div className="col-lg-4 col-md-6 col-12" key={item.id}>
            <EncounterCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
