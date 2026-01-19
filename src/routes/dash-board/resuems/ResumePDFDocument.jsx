// import {
//   Document,
//   Image,
//   Page,
//   StyleSheet,
//   Text,
//   View,
// } from "@react-pdf/renderer";

// // Professional PDF Styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     backgroundColor: "#ffffff",
//     fontFamily: "Helvetica",
//   },
//   header: {
//     flexDirection: "row",
//     marginBottom: 25,
//     borderBottom: "3 solid #2c3e50",
//     paddingBottom: 20,
//     alignItems: "center",
//   },
//   profileSection: {
//     flex: 1,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     objectFit: "cover",
//   },
//   imageContainer: {
//     marginLeft: 20,
//   },
//   name: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#2c3e50",
//     marginBottom: 8,
//   },
//   contactInfo: {
//     fontSize: 11,
//     color: "#7f8c8d",
//     marginTop: 3,
//   },
//   section: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#2c3e50",
//     marginBottom: 12,
//     borderBottom: "2 solid #3498db",
//     paddingBottom: 6,
//   },
//   aboutText: {
//     fontSize: 11,
//     lineHeight: 1.7,
//     color: "#34495e",
//     textAlign: "justify",
//   },
//   experienceItem: {
//     marginBottom: 15,
//     paddingLeft: 12,
//     borderLeft: "3 solid #3498db",
//   },
//   experienceTitle: {
//     fontSize: 13,
//     fontWeight: "bold",
//     color: "#2c3e50",
//     marginBottom: 4,
//   },
//   experienceCompany: {
//     fontSize: 11,
//     color: "#3498db",
//     marginBottom: 3,
//   },
//   experienceDetails: {
//     fontSize: 10,
//     color: "#7f8c8d",
//     marginBottom: 6,
//   },
//   experienceDescription: {
//     fontSize: 10,
//     color: "#34495e",
//     lineHeight: 1.6,
//   },
//   documentsList: {
//     paddingLeft: 15,
//   },
//   documentItem: {
//     fontSize: 11,
//     color: "#34495e",
//     marginBottom: 6,
//     flexDirection: "row",
//   },
//   bullet: {
//     width: 15,
//     fontSize: 11,
//     color: "#3498db",
//   },
//   documentText: {
//     flex: 1,
//   },
//   footer: {
//     position: "absolute",
//     bottom: 30,
//     left: 40,
//     right: 40,
//     textAlign: "center",
//     fontSize: 9,
//     color: "#95a5a6",
//     borderTop: "1 solid #ecf0f1",
//     paddingTop: 10,
//   },
//   emptyState: {
//     fontSize: 10,
//     color: "#95a5a6",
//     fontStyle: "italic",
//   },
// });

// const ResumePDFDocument = ({ userResume }) => {
//   console.log(userResume);

//   if (!userResume) return null;

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header with Profile */}
//         <View style={styles.header}>
//           <View style={styles.profileSection}>
//             <Text style={styles.name}>
//               {userResume.first_name} {userResume.last_name}
//             </Text>
//             {userResume.country?.title && (
//               <Text style={styles.contactInfo}>{userResume.country.title}</Text>
//             )}
//             {userResume.email && (
//               <Text style={styles.contactInfo}>✉ {userResume.email}</Text>
//             )}
//             {userResume.phone && (
//               <Text style={styles.contactInfo}>📞 {userResume.phone}</Text>
//             )}
//           </View>

//           {userResume.image && (
//             <View style={styles.imageContainer}>
//               <Image style={styles.profileImage} src={userResume.image} />
//             </View>
//           )}
//         </View>

//         {/* About Section */}
//         {userResume.about && (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>About</Text>
//             <Text style={styles.aboutText}>{userResume.about}</Text>
//           </View>
//         )}

//         {/* Professional Experience */}
//         {userResume.user_experiences &&
//         userResume.user_experiences.length > 0 ? (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Professional Experience</Text>
//             {userResume.user_experiences.map((exp, index) => (
//               <View key={index} style={styles.experienceItem}>
//                 <Text style={styles.experienceTitle}>
//                   {exp.title || exp.position || "Position"}
//                 </Text>

//                 {exp.company && (
//                   <Text style={styles.experienceCompany}>{exp.company}</Text>
//                 )}

//                 <Text style={styles.experienceDetails}>
//                   {exp.start_date && exp.end_date
//                     ? `${exp.start_date} - ${exp.end_date}`
//                     : exp.duration || ""}
//                   {exp.location && ` | ${exp.location}`}
//                 </Text>

//                 {exp.description && (
//                   <Text style={styles.experienceDescription}>
//                     {exp.description}
//                   </Text>
//                 )}
//               </View>
//             ))}
//           </View>
//         ) : null}

//         {/* Documents & Certifications */}
//         {userResume.user_documents && userResume.user_documents.length > 0 ? (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Documents & Certifications</Text>
//             <View style={styles.documentsList}>
//               {userResume.user_documents.map((doc, index) => (
//                 <View key={index} style={styles.documentItem}>
//                   <Text style={styles.bullet}>•</Text>
//                   <Text style={styles.documentText}>
//                     {doc.title || doc.name || `Document ${index + 1}`}
//                     {doc.date && ` (${doc.date})`}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         ) : null}

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text>
//             Generated on
//             {new Date().toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default ResumePDFDocument;
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import NotoNaskhArabic from "../../../assets/webfonts/Dubai-Regular.ttf"
;

// Register Arabic-supporting font
Font.register({
  family: "NotoNaskhArabic",
  src: NotoNaskhArabic,
  fontWeight: "normal",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "NotoNaskhArabic", // Arabic-capable font
    direction: "ltr", // default page direction
  },
  header: {
    flexDirection: "row",
    marginBottom: 25,
    borderBottom: "3 solid #2c3e50",
    paddingBottom: 20,
    alignItems: "center",
  },
  profileSection: {
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: "cover",
  },
  imageContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 11,
    color: "#7f8c8d",
    marginTop: 3,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
    borderBottom: "2 solid #3498db",
    paddingBottom: 6,
  },
  aboutText: {
    fontSize: 11,
    lineHeight: 1.7,
    color: "#34495e",
    textAlign: "justify",
    direction: "rtl", // enable RTL for Arabic
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 12,
    borderLeft: "3 solid #3498db",
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 11,
    color: "#3498db",
    marginBottom: 3,
  },
  experienceDetails: {
    fontSize: 10,
    color: "#7f8c8d",
    marginBottom: 6,
  },
  experienceDescription: {
    fontSize: 10,
    color: "#34495e",
    lineHeight: 1.6,
    textAlign: "justify",
    direction: "rtl", // enable RTL for Arabic descriptions
  },
  documentsList: {
    paddingLeft: 15,
  },
  documentItem: {
    fontSize: 11,
    color: "#34495e",
    marginBottom: 6,
    flexDirection: "row",
  },
  bullet: {
    width: 15,
    fontSize: 11,
    color: "#3498db",
  },
  documentText: {
    flex: 1,
    textAlign: "right",
    direction: "rtl", // documents in Arabic
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#95a5a6",
    borderTop: "1 solid #ecf0f1",
    paddingTop: 10,
  },
});

const ResumePDFDocument = ({ userResume }) => {
  if (!userResume) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with profile */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Text style={styles.name}>
              {userResume.first_name} {userResume.last_name}
            </Text>
            {userResume.country?.title && (
              <Text style={styles.contactInfo}>{userResume.country.title}</Text>
            )}
            {userResume.email && (
              <Text style={styles.contactInfo}>✉ {userResume.email}</Text>
            )}
            {userResume.phone && (
              <Text style={styles.contactInfo}>📞 {userResume.phone}</Text>
            )}
          </View>
          {userResume.image && (
            <View style={styles.imageContainer}>
              <Image style={styles.profileImage} src={userResume.image} />
            </View>
          )}
        </View>

        {/* About Section */}
        {userResume.about && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About / حول</Text>
            <Text style={styles.aboutText}>{userResume.about}</Text>
          </View>
        )}

        {/* Professional Experience */}
        {userResume.user_experiences?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Professional Experience / الخبرات العملية
            </Text>
            {userResume.user_experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>
                  {exp.title || exp.position || "Position / المنصب"}
                </Text>
                {exp.company && (
                  <Text style={styles.experienceCompany}>{exp.company}</Text>
                )}
                <Text style={styles.experienceDetails}>
                  {exp.start_date && exp.end_date
                    ? `${exp.start_date} - ${exp.end_date}`
                    : exp.duration || ""}
                  {exp.location && ` | ${exp.location}`}
                </Text>
                {exp.description && (
                  <Text style={styles.experienceDescription}>
                    {exp.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Documents / Certifications */}
        {userResume.user_documents?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Documents & Certifications / المستندات والشهادات
            </Text>
            <View style={styles.documentsList}>
              {userResume.user_documents.map((doc, index) => (
                <View key={index} style={styles.documentItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.documentText}>
                    {doc.title || doc.name || `Document ${index + 1}`}
                    {doc.date && ` (${doc.date})`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Generated on{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFDocument;
