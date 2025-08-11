import CustomButton from "../../../ui/CustomButton";
import DescriptionSection from "./DescriptionSection";
import DocumentList from "./DocumentList";
import ExperienceList from "./ExperienceList";
import UserDataCard from "./UserDataCard";

export default function ResuemeDetails() {
  const descriptionText =
    "السيرة الذاتية هي عبارة عن ملخص منظم للخبرات المهنية، والخلفية التعليمية، والمهارات، والمعلومات الشخصية ذات الصلة بمقدم طلب العمل. تُستخدم السيرة الذاتية لعرض مؤهلات الشخص، والتعريف بالمهن التي عمل بها سابقًا، وما يمتلكه من قدرات وخبرات، وذلك بهدف تقديمها لأصحاب العمل عند التقدم لوظيفة معينة.";

  const experiences = [
    "التجارة الإلكترونية",
    "التجارة الإلكترونية",
    "التجارة الإلكترونية",
    "التجارة الإلكترونية",
  ];

  const documents = [
    "التجارة الإلكترونية",
    "التجارة الإلكترونية",
    "التجارة الإلكترونية",
    "التجارة الإلكترونية",
  ];
  return (
    <section className="resumes-details">
      <div className="row">
        <div className="resume-header">
          <h1>السيرة الذاتية</h1>
          <CustomButton>تصدير</CustomButton>
        </div>
        <div className="col-12 col-lg-3 p-2">
          <UserDataCard
            name="محمود"
            country="السعودية"
            image="/images/profile2.png"
            flag="/icons/flag.svg"
          />
        </div>
        <div className="col-12 col-lg-9 p-2">
          <DescriptionSection title="عرف عن نفسك" text={descriptionText} />
          <ExperienceList experiences={experiences} />
          <DocumentList documents={documents} />
        </div>
      </div>
    </section>
  );
}
