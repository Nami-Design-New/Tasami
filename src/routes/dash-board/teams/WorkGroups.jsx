// import { ProgressBar } from "react-bootstrap";

import SubmitButton from "../../../ui/forms/SubmitButton";
import TeamCard from "./TeamCard";
const gradientClasses = ["blue", "indigo", "green"];
const TeamsSection = () => {
  const teams = [
    {
      id: "GIN-0000002",
      region: "01 - الشرق الاوسط",
      location: "الرياض 001 - 014 المملكه العربيه السعوديه",
      employees: [
        { title: "عدد الموظفين", data: 50 },
        { title: "عدد المشرفين", data: 12 },
        { title: "عدد التنفيذين", data: 4 },
        { title: " تاريخ الانشاء ", data: "12/7/2024" },
      ],
      progress: {
        completed: 15,
        pending: 5,
        percent: 75,
      },
    },
    {
      id: "GIN-0000001",
      region: "01 - الشرق الاوسط",
      location: "الرياض 001 - 014 المملكه العربيه السعوديه",
      employees: [
        { title: "عدد الموظفين", data: 50 },
        { title: "عدد المشرفين", data: 12 },
        { title: "عدد التنفيذين", data: 4 },
        { title: " تاريخ الانشاء ", data: "12/7/2024" },
      ],
      progress: {
        completed: 15,
        pending: 5,
        percent: 75,
      },
    },
    {
      id: "GIN-0000003",
      region: "01 - الشرق الاوسط",
      location: "الرياض 001 - 014 المملكه العربيه السعوديه",
      employees: [
        { title: "عدد الموظفين", data: 50 },
        { title: "عدد المشرفين", data: 12 },
        { title: "عدد التنفيذين", data: 4 },
        { title: " تاريخ الانشاء ", data: "12/7/2024" },
      ],
      progress: {
        completed: 15,
        pending: 5,
        percent: 75,
      },
    },
  ];

  return (
    <section className="teams">
      <div className="teams__header">
        <h3>الفرق المتاحة للاضافه</h3>
        <input type="text" placeholder="البحث عن مجموعه  ..." />
      </div>
      <div className="teams__list">
        {teams.map((team, index) => (
          <TeamCard
            key={index}
            team={team}
            gradientClass={gradientClasses[index % gradientClasses.length]}
          />
        ))}
      </div>
      <div className="form__action--buttons d-flex gap-3">
        <button type="button" className=" log  button--add save-button">
          حفظ و اغلاق
        </button>
        <SubmitButton className={"submit-button"} text={"حفظ"} />
      </div>
    </section>
  );
};

export default TeamsSection;
