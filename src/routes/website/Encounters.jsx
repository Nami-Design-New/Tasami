import React from "react";
import EncounterCard from "../../ui/cards/EncounterCard";

export default function Encounters() {
  const encounters = [
    {
      id: 1,
      title: "لقاء تطوير المهارات",
      desc: "مناقشة مهارات القيادة ورفع كفاءة الفريق لتحقيق أهداف العمل.",
      date: "25 يونيو 2025",
      time: "4:00 مساءً",
      duration: "25 دقيقة",
      url:"https://zoom.us/1225dfe852ffa/php",
      field:"الفنون",
      specialty:"الرسم"
    },
    {
      id: 2,
      title: "ورشة إدارة المشاريع",
      desc: "أفضل الممارسات لتخطيط ومتابعة المشاريع بكفاءة.",
      date: "27 يونيو 2025",
      time: "6:00 مساءً",
      duration: "40 دقيقة",
     url:"https://zoom.us/1225dfe852ffa/php",
       field:"الفنون",
      specialty:"الرسم"
    },
    {
      id: 3,
      title: "ندوة الابتكار",
      desc: "كيف تحفز الابتكار داخل فريق العمل لتحقيق التميز.",
      date: "1 يوليو 2025",
      time: "8:00 مساءً",
      duration: "30 دقيقة",
     url:"https://zoom.us/1225dfe852ffa/php",
       field:"الفنون",
      specialty:"الرسم"
    },
      {
      id: 4,
      title: "اللقاء الخامس",
      desc: "كيف تحفز الابتكار داخل فريق العمل لتحقيق التميز.",
      date: "1 يوليو 2025",
      time: "8:00 مساءً",
      duration: "30 دقيقة",
     url:"https://zoom.us/1225dfe852ffa/php",
       field:"الفنون",
      specialty:"الرسم"
    }
  ];

  return (
    <div className="row g-3 encounters-cards">
      {encounters.map((item) => (
        <EncounterCard key={item.id} item={item} />
      ))}
    </div>
  );
}
