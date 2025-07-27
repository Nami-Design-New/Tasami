import SubmitButton from "../../ui/forms/SubmitButton";
import { useState } from "react";
import ChargeBalanceModal from "../../ui/modals/ChargeBalanceModal"; 
import CustomButton from "../../ui/CustomButton";


export default function MyWallet() {
  const balance = 2500;
  const [showChargeModal, setShowChargeModal] = useState(false);
  const transactions = [
    {
      id: "5467",
      amount: "400",
      date: "30 يونيو 2025 - 5:45 مساءً",
      type: "خصم",
      status: "withdraw",
    },
    {
      id: "5467",
      amount: "3,500",
      date: "30 يونيو 2025 - 6:05 مساءً",
      type: "استرداد",
      status: "refund",
    },
    {
      id: "5467",
      amount: "8,000",
      date: "30 يونيو 2025 - 6:45 مساءً",
      type: "شحن رصيد",
      status: "charge",
    },
  ];

  return (
    <div className="wallet-page mt-30">
      <div className="container">
        <div className="wallet-balance">
          <div className="wallet-header">
            <img src="/icons/money.svg" alt="wallet icon" />
            <h5>رصيدك الحالي</h5>
          </div>

          <h2 className="balance-amount">
            {balance} <img src="/icons/ryal.svg" alt="" />
          </h2>

          <div className="wallet-actions">
            <CustomButton className="btn-charge" onClick={() => setShowChargeModal(true)} >شحن</CustomButton>

            <CustomButton  className="btn-refund" onClick={() => setShowChargeModal(true)}  >طلب استيراد</CustomButton>
          </div>
        </div>

        <div className="balance-box ">
          <h5 className="text">عمليات الرصيد</h5>
          {transactions.map((item, index) => (
            <div key={index} className="transaction-item">
              <div className="top-row">
                <span className="type">{item.type}</span>
                <span className="amount">
                  {item.amount}
                  <img src="/icons/ryal.svg" alt="ريال" />
                </span>
              </div>
              <div className="bottom-row">
                <span className="contract-id"> عقد رقم {item.id}</span>
                <span className="date">{item.date}</span>
              </div>
              {index !== transactions.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
  <ChargeBalanceModal showModal={showChargeModal} setShowModal={setShowChargeModal} />

    </div>
    
  );
}
