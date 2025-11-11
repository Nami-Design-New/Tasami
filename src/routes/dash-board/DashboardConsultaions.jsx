import ConsultationCard from "../../ui/website/communities/consultations/ConsultationCard";

export default function DashboardConsultaions() {
  const consultations = [
    {
      id: 1,
      title: "Understanding React Hooks",
      desc: "A deep dive into React Hooks and how to use them effectively in modern web apps.",
      is_private: false,
      views_count: 120,
      likes_count: 45,
      comments_count: 10,
      shares_count: 5,
    },
    {
      id: 2,
      title: "Advanced CSS Grid Techniques",
      desc: "Learn advanced layouts using CSS Grid with real-world examples and best practices.",
      is_private: false,
      views_count: 98,
      likes_count: 30,
      comments_count: 7,
      shares_count: 3,
    },
    {
      id: 3,
      title: "Private Consultation Example",
      desc: "This is a private consultation and icons will be hidden.",
      is_private: true,
      views_count: 50,
      likes_count: 12,
      comments_count: 2,
      shares_count: 0,
    },
    {
      id: 4,
      title: "Introduction to TypeScript",
      desc: "TypeScript basics for beginners and how it improves JavaScript code quality.",
      is_private: false,
      views_count: 200,
      likes_count: 80,
      comments_count: 25,
      shares_count: 12,
    },
  ];
  return (
    <div className="consultations-section">
      <div className="row">
        {consultations.map((item, idx) => (
          <div className="col-12 p-2" key={idx}>
            <ConsultationCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
