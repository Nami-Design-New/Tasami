import { useParams } from "react-router";
import SectionHeader from "../../../ui/website/SectionHeader";

export default function HelperDetailPage() {
  const { id } = useParams();
  
  
  return (
    <div className="tasks-details page">
      <div className="container">
        <div className="row">
          <div className="header">
            <SectionHeader  />
           
          </div>
          <h5 className="hed">المدفوعات</h5>
          <div className="info-grid">
            <div className="info-box">
              <div className="label">قيمه العقد </div>
              <div className="value"> 400</div>
            </div>
            <div className="info-box">
              <div className="label"> مدة العقد</div>
              <div className="value">30يوم</div>
            </div>
          <div className="info-box">
              <div className="label">قيمة الاستحفاق اليومي للمساعد الشخصي</div>
              <div className="value">13.3</div>
            </div>
         
        
          </div>
        
        </div>
      </div>
     
    </div>
  );
}
