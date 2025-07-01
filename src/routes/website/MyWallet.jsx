import SectionHeader from "../../ui/website/home/SectionHeader";
import SubmitButton from "../../ui/forms/SubmitButton";

export default function MyWallet() {
  const balance = 2500;
  const transactions = [
    {
      id: "#5467",
      amount: "400",
      date: "30 يونيو 2025 - 5:45 مساءً",
      type: "خصم",
      status: "withdraw",
    },
    {
      id: "#5467",
      amount: "3,500",
      date: "30 يونيو 2025 - 6:05 مساءً",
      type: "استرداد",
      status: "refund",
    },
    {
      id: "#5467",
      amount: "8,000",
      date: "30 يونيو 2025 - 6:45 مساءً",
      type: "شحن رصيد",
      status: "charge",
    },
  ];

  return (
    <div className="page wallet-page">
      <div className="container">
        <SectionHeader title="محفظتي" />

        <div className="wallet-balance text-center p-4 rounded shadow-sm mb-4">
          <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
            <img src="/icons/money.svg" alt="wallet icon" width="24" />
            <h5 className="mb-0">رصيدك الحالي</h5>
          </div>

          <h2 className="balance-amount mb-3">{balance} <img src="/icons/ryal.svg" alt="" /></h2>

          <div className="d-flex justify-content-center gap-3 ">
            <SubmitButton text="إعادة شحن" className="btn-primary" />
            <SubmitButton text="طلب سحب رصيد" className="btn-secondary" />
          </div>
        </div>

        <h5 className="mb-3">سجل الرصيد</h5>
        <div className="transaction-list">
          {transactions.map((item, index) => (
            <div
              key={index}
              className={`transaction-card p-3 mb-3 rounded ${
                item.status === "withdraw"
                  ? "bg-danger-subtle"
                  : item.status === "refund"
                  ? "bg-info-subtle"
                  : "bg-success-subtle"
              }`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <strong>{item.amount} <img src="/icons/ryal.svg" alt="" /></strong>
                <small>{item.id}</small>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <small>{item.date}</small>
                <small>{item.type}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
