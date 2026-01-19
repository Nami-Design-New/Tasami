// // import { useParams } from "react-router";
// // import CustomButton from "../../../ui/CustomButton";
// // import DescriptionSection from "./DescriptionSection";
// // import UserDataCard from "./UserDataCard";
// // import useGetResume from "../../../hooks/dashboard/subscription/useGetResume";
// // import PersonalHelperExperiences from "../../../ui/website/helpers/PersonalHelperExperiences";
// // import PersonalHelperDoc from "../../../ui/website/helpers/PersonalHelperDoc";
// // import Loading from "../../../ui/loading/Loading";
// // import { useTranslation } from "react-i18next";
// // import flagIcon from "../../../assets/icons/flag.svg";

// // export default function ResuemeDetails() {
// //   const { t } = useTranslation();
// //   const { id } = useParams();
// //   const { userResume, isLoading } = useGetResume(id);

// //   return (
// //     <>
// //       {isLoading ? (
// //         <Loading />
// //       ) : (
// //         <section className="resumes-details">
// //           <div className="row">
// //             <div className="resume-header">
// //               <h1>{t("dashboard.resume.title")}</h1>
// //               <CustomButton>{t("dashboard.resume.export")}</CustomButton>
// //             </div>
// //             <div className="col-12 col-lg-3 p-2">
// //               <UserDataCard
// //                 name={userResume?.first_name + " " + userResume?.last_name}
// //                 country={userResume?.country?.title}
// //                 image={userResume?.image}
// //                 flag={flagIcon}
// //               />
// //             </div>
// //             <div className="col-12 col-lg-9 p-2">
// //               <DescriptionSection
// //                 title={t("dashboard.resume.aboutYou")}
// //                 text={userResume?.about}
// //               />

// //               <div className="exp-info my-4">
// //                 <h6 className="my-2">{t("dashboard.resume.experiences")}</h6>
// //                 <PersonalHelperExperiences tabs={userResume.user_experiences} />
// //               </div>
// //               <div className="exp-info my-4">
// //                 <h6 className="my-2">{t("dashboard.resume.documents")}</h6>
// //                 <PersonalHelperDoc tabs={userResume.user_documents} />
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       )}
// //     </>
// //   );
// // }
import { useParams } from "react-router";
import CustomButton from "../../../ui/CustomButton";
import DescriptionSection from "./DescriptionSection";
import UserDataCard from "./UserDataCard";
import useGetResume from "../../../hooks/dashboard/subscription/useGetResume";
import PersonalHelperExperiences from "../../../ui/website/helpers/PersonalHelperExperiences";
import PersonalHelperDoc from "../../../ui/website/helpers/PersonalHelperDoc";
import Loading from "../../../ui/loading/Loading";
import { useTranslation } from "react-i18next";
import flagIcon from "../../../assets/icons/flag.svg";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDFDocument from "./ResumePDFDocument";

export default function ResumeDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { userResume, isLoading } = useGetResume(id);

  // Generate PDF filename
  const getPDFFileName = () => {
    if (!userResume) return "resume.pdf";
    return `Resume_${userResume.first_name}_${userResume.last_name}_${new Date().getTime()}.pdf`;
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="resumes-details">
          <div className="row">
            <div className="resume-header">
              <h1>{t("dashboard.resume.title")}</h1>

              {/* PDF Export Button */}
              {userResume && (
                <PDFDownloadLink
                  document={<ResumePDFDocument userResume={userResume} />}
                  fileName={getPDFFileName()}
                >
                  {({ loading }) => (
                    <CustomButton disabled={loading}>
                      {loading
                        ? t("dashboard.resume.generating")
                        : t("dashboard.resume.export")}
                    </CustomButton>
                  )}
                </PDFDownloadLink>
              )}
            </div>

            <div className="col-12 col-lg-3 p-2">
              <UserDataCard
                name={userResume?.first_name + " " + userResume?.last_name}
                country={userResume?.country?.title}
                image={userResume?.image}
                flag={flagIcon}
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
// import { useParams } from "react-router";
// import CustomButton from "../../../ui/CustomButton";
// import DescriptionSection from "./DescriptionSection";
// import UserDataCard from "./UserDataCard";
// import useGetResume from "../../../hooks/dashboard/subscription/useGetResume";
// import PersonalHelperExperiences from "../../../ui/website/helpers/PersonalHelperExperiences";
// import PersonalHelperDoc from "../../../ui/website/helpers/PersonalHelperDoc";
// import Loading from "../../../ui/loading/Loading";
// import { useTranslation } from "react-i18next";
// import flagIcon from "../../../assets/icons/flag.svg";
// import { useState, useRef } from "react";
// import html2pdf from "html2pdf.js";

// export default function ResumeDetails() {
//   const { t } = useTranslation();
//   const { id } = useParams();
//   const { userResume, isLoading } = useGetResume(id);
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
//   const pdfContentRef = useRef(null);

//   const generatePDF = async () => {
//     if (!userResume || !pdfContentRef.current) return;

//     setIsGeneratingPDF(true);

//     // Make sure the element is visible
//     pdfContentRef.current.style.display = "block";

//     try {
//       const element = pdfContentRef.current;
//       const options = {
//         margin: 10,
//         filename: `Resume_${userResume.first_name}_${userResume.last_name}_${new Date().getTime()}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2, useCORS: true, letterRendering: true },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };
//       await html2pdf().set(options).from(element).save();
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Error generating PDF. Please try again.");
//     } finally {
//       // Hide the element again
//       pdfContentRef.current.style.display = "none";
//       setIsGeneratingPDF(false);
//     }
//   };

//   // Detect if text is Arabic
//   const isArabic = (text) => {
//     if (!text) return false;
//     const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
//     return arabicPattern.test(text);
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <>
//           <section className="resumes-details">
//             <div className="row">
//               <div className="resume-header">
//                 <h1>{t("dashboard.resume.title")}</h1>
//                 <CustomButton
//                   onClick={generatePDF}
//                   disabled={isGeneratingPDF || !userResume}
//                 >
//                   {isGeneratingPDF
//                     ? t("dashboard.resume.generating") || "Generating PDF..."
//                     : t("dashboard.resume.export")}
//                 </CustomButton>
//               </div>
//               <div className="col-12 col-lg-3 p-2">
//                 <UserDataCard
//                   name={userResume?.first_name + " " + userResume?.last_name}
//                   country={userResume?.country?.title}
//                   image={userResume?.image}
//                   flag={flagIcon}
//                 />
//               </div>
//               <div className="col-12 col-lg-9 p-2">
//                 <DescriptionSection
//                   title={t("dashboard.resume.aboutYou")}
//                   text={userResume?.about}
//                 />

//                 <div className="exp-info my-4">
//                   <h6 className="my-2">{t("dashboard.resume.experiences")}</h6>
//                   <PersonalHelperExperiences
//                     tabs={userResume.user_experiences}
//                   />
//                 </div>
//                 <div className="exp-info my-4">
//                   <h6 className="my-2">{t("dashboard.resume.documents")}</h6>
//                   <PersonalHelperDoc tabs={userResume.user_documents} />
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Hidden PDF Template - Custom Design */}
//           <div
//             ref={pdfContentRef}
//             style={{
//               position: "fixed", // stays in viewport
//               top: 0,
//               left: 0,
//               width: "1px",
//               backgroundColor: "white",
//               fontFamily: "Arial, sans-serif",
//               zIndex: 9999,
//               pointerEvents: "none",
//             }}
//           >
//             <div style={{ padding: "20mm" }}>
//               {/* Header */}
//               <div
//                 style={{
//                   backgroundColor: "#2c3e50",
//                   color: "white",
//                   padding: "20px",
//                   marginBottom: "20px",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <h1
//                   style={{
//                     margin: "0 0 10px 0",
//                     fontSize: "28px",
//                     direction: isArabic(userResume?.first_name) ? "rtl" : "ltr",
//                     textAlign: isArabic(userResume?.first_name)
//                       ? "right"
//                       : "left",
//                   }}
//                 >
//                   {userResume?.first_name} {userResume?.last_name}
//                 </h1>
//                 {userResume?.country?.title && (
//                   <p
//                     style={{
//                       margin: "5px 0",
//                       fontSize: "14px",
//                       direction: isArabic(userResume.country.title)
//                         ? "rtl"
//                         : "ltr",
//                       textAlign: isArabic(userResume.country.title)
//                         ? "right"
//                         : "left",
//                     }}
//                   >
//                     📍 {userResume.country.title}
//                   </p>
//                 )}
//               </div>

//               {/* About Section */}
//               {userResume?.about && (
//                 <div style={{ marginBottom: "25px" }}>
//                   <h2
//                     style={{
//                       color: "#2c3e50",
//                       borderBottom: "3px solid #3498db",
//                       paddingBottom: "8px",
//                       fontSize: "20px",
//                       marginBottom: "15px",
//                       direction: isArabic(t("dashboard.resume.aboutYou"))
//                         ? "rtl"
//                         : "ltr",
//                       textAlign: isArabic(t("dashboard.resume.aboutYou"))
//                         ? "right"
//                         : "left",
//                     }}
//                   >
//                     {t("dashboard.resume.aboutYou")}
//                   </h2>
//                   <p
//                     style={{
//                       fontSize: "13px",
//                       lineHeight: "1.8",
//                       color: "#34495e",
//                       textAlign: "justify",
//                       direction: isArabic(userResume.about) ? "rtl" : "ltr",
//                     }}
//                   >
//                     {userResume.about}
//                   </p>
//                 </div>
//               )}

//               {/* Experience Section */}
//               {userResume?.user_experiences &&
//                 userResume.user_experiences.length > 0 && (
//                   <div style={{ marginBottom: "25px" }}>
//                     <h2
//                       style={{
//                         color: "#2c3e50",
//                         borderBottom: "3px solid #3498db",
//                         paddingBottom: "8px",
//                         fontSize: "20px",
//                         marginBottom: "15px",
//                         direction: isArabic(t("dashboard.resume.experiences"))
//                           ? "rtl"
//                           : "ltr",
//                         textAlign: isArabic(t("dashboard.resume.experiences"))
//                           ? "right"
//                           : "left",
//                       }}
//                     >
//                       {t("dashboard.resume.experiences")}
//                     </h2>
//                     {userResume.user_experiences.map((exp, index) => (
//                       <div
//                         key={index}
//                         style={{
//                           marginBottom: "20px",
//                           paddingLeft: isArabic(exp.title || exp.position)
//                             ? "0"
//                             : "15px",
//                           paddingRight: isArabic(exp.title || exp.position)
//                             ? "15px"
//                             : "0",
//                           borderLeft: isArabic(exp.title || exp.position)
//                             ? "none"
//                             : "4px solid #3498db",
//                           borderRight: isArabic(exp.title || exp.position)
//                             ? "4px solid #3498db"
//                             : "none",
//                           direction: isArabic(exp.title || exp.position)
//                             ? "rtl"
//                             : "ltr",
//                         }}
//                       >
//                         <h3
//                           style={{
//                             color: "#2c3e50",
//                             fontSize: "16px",
//                             margin: "0 0 5px 0",
//                           }}
//                         >
//                           {exp.title || exp.position || "Position"}
//                         </h3>
//                         {exp.company && (
//                           <p
//                             style={{
//                               color: "#3498db",
//                               fontSize: "14px",
//                               margin: "0 0 5px 0",
//                             }}
//                           >
//                             {exp.company}
//                           </p>
//                         )}
//                         {(exp.start_date || exp.duration) && (
//                           <p
//                             style={{
//                               color: "#7f8c8d",
//                               fontSize: "12px",
//                               margin: "0 0 10px 0",
//                             }}
//                           >
//                             {exp.start_date && exp.end_date
//                               ? `${exp.start_date} - ${exp.end_date}`
//                               : exp.duration || ""}
//                           </p>
//                         )}
//                         {exp.description && (
//                           <p
//                             style={{
//                               fontSize: "13px",
//                               color: "#34495e",
//                               lineHeight: "1.6",
//                               margin: "0",
//                               direction: isArabic(exp.description)
//                                 ? "rtl"
//                                 : "ltr",
//                             }}
//                           >
//                             {exp.description}
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//               {/* Documents Section */}
//               {userResume?.user_documents &&
//                 userResume.user_documents.length > 0 && (
//                   <div style={{ marginBottom: "25px" }}>
//                     <h2
//                       style={{
//                         color: "#2c3e50",
//                         borderBottom: "3px solid #3498db",
//                         paddingBottom: "8px",
//                         fontSize: "20px",
//                         marginBottom: "15px",
//                         direction: isArabic(t("dashboard.resume.documents"))
//                           ? "rtl"
//                           : "ltr",
//                         textAlign: isArabic(t("dashboard.resume.documents"))
//                           ? "right"
//                           : "left",
//                       }}
//                     >
//                       {t("dashboard.resume.documents")}
//                     </h2>
//                     <ul
//                       style={{
//                         paddingLeft: "20px",
//                         paddingRight: "20px",
//                         listStyleType: "none",
//                       }}
//                     >
//                       {userResume.user_documents.map((doc, index) => (
//                         <li
//                           key={index}
//                           style={{
//                             fontSize: "13px",
//                             color: "#34495e",
//                             marginBottom: "8px",
//                             direction: isArabic(doc.title || doc.name)
//                               ? "rtl"
//                               : "ltr",
//                             textAlign: isArabic(doc.title || doc.name)
//                               ? "right"
//                               : "left",
//                           }}
//                         >
//                           <span
//                             style={{
//                               color: "#3498db",
//                               marginRight: "8px",
//                               marginLeft: "8px",
//                             }}
//                           >
//                             •
//                           </span>
//                           {doc.title || doc.name || `Document ${index + 1}`}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//               {/* Footer */}
//               <div
//                 style={{
//                   borderTop: "1px solid #ecf0f1",
//                   paddingTop: "15px",
//                   marginTop: "30px",
//                   textAlign: "center",
//                 }}
//               >
//                 <p
//                   style={{
//                     fontSize: "11px",
//                     color: "#95a5a6",
//                     margin: "0",
//                   }}
//                 >
//                   Generated on{" "}
//                   {new Date().toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }
