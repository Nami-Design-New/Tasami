import React from "react";

export default function GoalInfoGrid({ goal }) {
  return (
   <div className="info-grid ">
              <div className="info-box">
                <div className="label">المجال والتخصص</div>
                <div className="value">{goal.type}</div>
              </div>
              <div className="info-box">
                <div className="label"> التخصص</div>
                <div className="value">{goal.section}</div>
              </div>
              <div className="info-box">
                <div className="label">المدة المتوقعة لتحقيق الهدف</div>
                <div className="value">{goal.duration}</div>
              </div>
              <div className="info-box">
                <div className="label">تاريخ البدء</div>
                <div className="value">{goal.date}</div>
              </div>
              <div className="info-box w-100">
                <div className="label">آليات المساعدة المعتمدة</div>
                {goal.assistMethods.map((method, index) => (
                  <div className="value" key={index}>
                    <img src="/icons/check.svg" /> {method}
                  </div>
                ))}{" "}
              </div>
            </div>
  );
}
