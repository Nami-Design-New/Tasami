import { ProgressBar } from "react-bootstrap";
import Currency from "../../Currency";

export default function PaymentContractData() {
  return (
    <div className="payment-card">
      <h3 className="card-title">المدفوعات</h3>

      <div className="card-body">
        <ul className="payment-list">
          <li className="total-amount">
            <h6>قيمة العقد:</h6>
            <p>
              400 <Currency />
            </p>
          </li>
          <li>
            <h6>مدة العقد:</h6>
            <p>30 يوم</p>
          </li>
          <li>
            <h6>قيمة الاستحقاق اليومي للمساعد الشخصي:</h6>
            <p>
              13.3 <Currency />
            </p>
          </li>{" "}
          <li>
            <h6>القيمة المستحقة للمساعد:</h6>
            <p>
              66.5 <Currency />
            </p>
          </li>{" "}
          <li>
            <h6>رصيد الضمان المتبقي:</h6>
            <p>
              333.5 <Currency />
            </p>
          </li>
          <li className="progress-payment">
            <h6>التقدم</h6>
            <div className="progress-data">
              <span>30 يوم</span>
              <span>30 يوم</span>
            </div>
            <ProgressBar now={100} />
          </li>
        </ul>
      </div>
    </div>
  );
}
