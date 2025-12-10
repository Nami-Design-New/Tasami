import { useParams } from "react-router";
import CustomButton from "../../../ui/CustomButton";
import DescriptionSection from "./DescriptionSection";
import UserDataCard from "./UserDataCard";
import useGetResume from "../../../hooks/dashboard/subscription/useGetResume";
import PersonalHelperExperiences from "../../../ui/website/helpers/PersonalHelperExperiences";
import PersonalHelperDoc from "../../../ui/website/helpers/PersonalHelperDoc";
import Loading from "../../../ui/loading/Loading";
import { useTranslation } from "react-i18next";

export default function ResuemeDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { userResume, isLoading } = useGetResume(id);
  // console.log("userResume", id, userResume);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="resumes-details">
          <div className="row">
            <div className="resume-header">
              <h1>{t("dashboard.resume.title")}</h1>
              <CustomButton>{t("dashboard.resume.export")}</CustomButton>
            </div>
            <div className="col-12 col-lg-3 p-2">
              <UserDataCard
                name={userResume?.first_name + " " + userResume?.last_name}
                country={userResume?.country?.title}
                image={userResume?.image}
                flag="/icons/flag.svg"
              />
            </div>
            <div className="col-12 col-lg-9 p-2">
              <DescriptionSection
                title={t("dashboard.resume.aboutYou")}
                text={userResume?.about}
              />

              <div className="exp-info my-4">
                <h6 className="my-2">{t("dashboard.resume.experiences")}</h6>
                <PersonalHelperExperiences tabs={userResume.user_experiences} />
              </div>
              <div className="exp-info my-4">
                <h6 className="my-2">{t("dashboard.resume.documents")}</h6>
                <PersonalHelperDoc tabs={userResume.user_documents} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
