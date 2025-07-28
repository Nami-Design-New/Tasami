export default function MyNotifications() {
  const notifications = [
    {
      id: 1,
      title: "النظام",
      message: "هناك تحديث جديد للتطبيق، يمكنك تثبيته الآن",
      date: "منذ ٣ أيام",
      icon: "https://placehold.co/50x50/003366/fff?text=A",
    },
    {
      id: 2,
      title: "النظام",
      message: "تم تفعيل حسابك بنجاح",
      date: "منذ يوم",
      icon: "https://placehold.co/50x50/003366/fff?text=A",
    },
  ];

  return (
    <div className=" notifications-page mt-30">
      <div className="container">
        <div className="notifications-list">
          {notifications.map((item) => (
            <div className="notification-card" key={item.id}>
              <div className="notification-icon">
                <img src={item.icon} alt="icon" />
              </div>
              <div className="notification-content">
                <h6>{item.title}</h6>
                <p>{item.message}</p>
              </div>
              <div className="notification-date">{item.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
