import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import CheckField from "../../../ui/forms/CheckField";
import GroupCard from "../../../ui/cards/GroupCard";
import ViewMemberModal from "../../../ui/modals/ViewMemberModal";
import CustomButton from "../../../ui/CustomButton";
const members = [
  {
    id: 1,
    name: "انس تركي",
    country: "السعودية",
    rating: 6,
    image: "/images/p2.png",
    status: true,
    type: "ريادي ",
    section: " تجارة إلكترونية",
    description:
      " تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي.ة. ",
  },
  {
    id: 2,
    name: "مها صالح",
    country: "الإمارات",
    rating: 10,
    image: "/images/p1.png",
    status: true,
    type: "تقنية",
    section: " تعليم",
    type: "ريادي",
    section: " تجارة إلكترونية",
    description:
      " تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي.ة. ",
  },
  {
    id: 3,
    name: "انس تركي",
    country: "السعودية",
    rating: 8,
    image: "/images/p2.png",
    status: true,
    type: "ريادي",
    section: " تجارة إلكترونية",
    description:
      " تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي.ة. ",
  },
  {
    id: 4,
    name: "مها صالح",
    country: "الإمارات",
    rating: 11,
    image: "/images/p1.png",
    status: true,
    type: "ريادي",
    section: " تجارة إلكترونية",
    description:
      " تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي.ة. ",
  },
  {
    id: 5,
    name: "مني صالح",
    country: "الإمارات",
    rating: 11,
    image: "/images/p1.png",
    status: true,
    type: "ريادي",
    section: " تجارة إلكترونية",
    description:
      " تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي.ة. ",
  },
  {
    id: 6,
    name: "انس تركي",
    country: "السعودية",
    rating: 6,
    image: "/images/p2.png",
    status: true,
    type: "ريادي",
    section: " تجارة إلكترونية",
    description:
      " تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي.ة. ",
  },
  {
    id: 7,
    name: "مها صالح",
    country: "الإمارات",
    rating: 10,
    image: "/images/p1.png",
    status: true,
    type: "ريادي",
    section: " تجارة إلكترونية",
    description:
      " تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي.ة. ",
  },
  {
    id: 8,
    name: "انس تركي",
    country: "السعودية",
    rating: 8,
    image: "/images/p2.png",
    status: true,
    type: "ريادي",
    section: " تجارة إلكترونية",
    description:
      " تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي.ة. ",
  },
];
export default function Groups() {
  const [shareGoal, setShareGoal] = useState("unselected");
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  const handleCheckChange = (e) => {
    const newValue = e.target.value;
    setShareGoal(newValue);

    if (newValue === "selected") {
      navigate("/new-goal");
    }
  };

  return (
    <div className="Groups-page">
      <div className="col-12">
        <div className="hed">
          مجموعة <span>رواد التقنيه</span>
          <p>
            أهلاً بك في مجموعة رواد التقنية، المجموعة التي ستقدم لك الكثير من
            فرص التعاون والتعلم لتحقق أهدافك بطريقة عملية وممتعة
          </p>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <div className="label">المجال والتخصص</div>
            <div className="value">ريادة الاعمال</div>
          </div>
          <div className="info-box">
            <div className="label">مؤشر قوي المجموعة</div>
            <div className="value">91%</div>
          </div>
        </div>

        <div className="mt-4 form_ui">
          <div className="col-12 col-lg-4">
            <CheckField
              label="مشاركة هدفك مع المجموعة"
              activeValue="selected"
              inactiveValue="unselected"
              activeLabel="نعم"
              inactiveLabel="لا"
              value={shareGoal}
              onChange={handleCheckChange}
            />
          </div>
        </div>

        <div className="row">
          <h5 className="hed my-3">أعضاء المجموعة</h5>
          {members.map((member) => (
            <div className="col-md-3 col-sm-6 mb-4" key={member.id}>
              <GroupCard
                member={member}
                onClick={() => setSelectedMember(member)}
              />
            </div>
          ))}
        </div>
        <div className="btn-groups">
          <Link to={"/group-chat"}>
            <CustomButton>محادثات المجموعة</CustomButton>
          </Link>

          <Link to={`/personal-community/1/consultations`}>
            <CustomButton>مجتمع انس التركي</CustomButton>
          </Link>
        </div>
      </div>
      {selectedMember && (
        <ViewMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
