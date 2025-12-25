import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/CustomButton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ReportIndicator = ({ pdfRef }) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    const input = pdfRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="d-md-flex justify-content-between align-items-center d-grid col-12 p-2 p-md-5">
      <div className="d-flex justify-content-between align-items-center  gap-4">
        <div className="d-flex align-items-center gap-2">
          <div className="overall_index"></div>
          <span> {t("dashboard.reports.total")}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="detailed_index"></div>
          <span> {t("dashboard.reports.detailed")}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="general_index"></div>
          <span> {t("dashboard.reports.general")}</span>
        </div>
      </div>
      <div className="d-grid p-2 justify-content-md-end justify-content-start align-items-end mt-3 ">
        <CustomButton onClick={handleDownload} size="large">
          {" "}
          {t("dashboard.reports.export")}
        </CustomButton>
      </div>
    </div>
  );
};

export default ReportIndicator;
