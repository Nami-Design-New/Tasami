import { useParams } from "react-router";
import CustomButton from "../../../ui/CustomButton";
import DescriptionSection from "./DescriptionSection";
import DocumentList from "./DocumentList";
import ExperienceList from "./ExperienceList";
import UserDataCard from "./UserDataCard";
import useGetResume from "../../../hooks/dashboard/subscription/useGetResume";

export default function ResuemeDetails() {
  const { id } = useParams();
  const { userResume, isLoading } = useGetResume(id);
  console.log("userResume", id, userResume);

  return (
    <section className="resumes-details">
      <div className="row">
        <div className="resume-header">
          <h1>السيرة الذاتية</h1>
          <CustomButton>تصدير</CustomButton>
        </div>
        <div className="col-12 col-lg-3 p-2">
          <UserDataCard
            name={userResume?.first_name + " " + userResume?.last_name}
            country={"!السعودية"}
            image={userResume?.image}
            flag="/icons/flag.svg"
          />
        </div>
        <div className="col-12 col-lg-9 p-2">
          <DescriptionSection title="عرف عن نفسك" text={userResume?.about} />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {userResume?.user_experiences.length > 0 && (
                <ExperienceList
                  experiences={userResume?.user_experiences.map(
                    (exp) => exp.category_title
                  )}
                />
              )}

              {userResume?.user_documents.length > 0 && (
                <DocumentList
                  documents={userResume?.user_documents?.map(
                    (doc) => doc.category_title
                  )}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
