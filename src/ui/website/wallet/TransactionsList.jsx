export default function TransactionsList() {
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
  );
}
