import React, { useState } from "react";
import CustomButton from "../../ui/CustomButton";

const data = {
  "ريادة الأعمال": [
    "التدريب والتطوير",
     "البحوث السوقية",
    "التسويق الرقمي",
    "تحليل البيانات",
    "إدارة المشاريع",
    "تصميم تجربة المستخدم",
    "المبيعات والتوزيع",
    "استراتيجيات الأعمال",
    "التقنية والابتكار",
    "خدمة العملاء والدعم",
   
  ],
};

export default function Interests() {
  const [selected, setSelected] = useState(["إدارة المشاريع"]);

  const toggleTag = (tag) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="interests-page mt-30">
      <div className="container">
        <div className="categories-section">
          {Object.entries(data).map(([category, tags]) => (
            <div className="category" key={category}>
              <div className="category-header">
                <span>{category}</span>
              </div>
              <div className="tags">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`tag ${selected.includes(tag) ? "selected" : ""}`}
                    onClick={() => toggleTag(tag)}
                  >
                    <i
                      className={`fa-solid ${
                        selected.includes(tag) ? "fa-xmark" : "fa-plus"
                      }`}
                    ></i>
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="subcategories-section">
          <div className="subcategories">
            {selected.map((item) => (
              <div key={item} className="sub-item">
                <span>{item}</span>
                <i className="fa-solid fa-chevron-left"></i>
              </div>
            ))}
          </div>
        </div>
<CustomButton>حفظ</CustomButton>


      </div>
    </div>
  );
}
