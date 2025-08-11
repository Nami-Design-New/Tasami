import React, { useState } from "react";
import CheckField from "../../../ui/forms/CheckField";
import CurrentPlanCard from "../../../ui/cards/CurrentPlanCard";
import PlanCard from "../../../ui/cards/PlanCard";

export default function SubscriptionManagement() {
  const [planType, setPlanType] = useState("monthly");

  const currentPlan = {
    name: "الحساب الأساسي",
    badge: "fa-solid fa-shield-halved",
    features: [
      {
        text: "عدد طلبات الأسعار التي يمكن تقديمها للمستفيدين في نفس الوقت",
        value: "10",
      },
      { text: "عدد المجموعات التي يمكنك إضافتها", value: "10" },
      { text: "عدد العملاء المحتمل إضافتهم في المجموعة الواحدة", value: "10" },
      { text: "عمولة المنصة من العقود وعوائد الاشتراكات", value: "20%" },
    ],
  };

  const plans = [
    {
      name: "الحساب المميز",
      icon: "Silverpackage.svg",
      desc: "عمولة المنصة من العقود وعضويات المجتمعات",
      commission: "10%",
      price: "300",
      duration: "25 يوم",
    },
    {
      name: "الحساب الذهبي",
      icon: "Platinumpackage.svg",
      desc: "عمولة المنصة من العقود وعضويات المجتمعات",
      commission: "5%",
      price: "600",
      duration: "3 أشهر",
    },
  ];

  return (
    <div className="subscription-management">
      <div className="container">
        <CurrentPlanCard plan={currentPlan} />
        
        <p className="upgrade-title">قم بترقية الخطة لتناسب أعمالك</p>
        
        <div className="upgrade-section form_ui">
          <CheckField
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            activeValue="yearly"
            inactiveValue="monthly"
            activeLabel="سنوية"
            inactiveLabel="نصف سنوية"
          />
        </div>

        <div className="plans-grid">
          {plans.map((plan, idx) => (
            <div className="plan-column" key={idx}>
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}