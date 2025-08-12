import { useState } from "react";
import { Accordion, AccordionBody } from "react-bootstrap";
import TagItem from "../../ui/auth/TagItem";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function AreasOfInterest() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const options = [
    "التسويق الرقمي",
    "التدريب والتطوير",
    "إدارة المشاريع",
    "تحليل البيانات",
  ];

  const [selected, setSelected] = useState([]);

  const toggle = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="personal-info-form">
      <p className="form-head">
        {t("auth.areasOfInterestPrompt")}
      </p>
      <div className="area-of-interest">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <span>ريادة الأعمال</span>
              <span className="arrow-icon">
                <i className="fa-solid fa-angle-left"></i>
              </span>
            </Accordion.Header>
            <AccordionBody>
              <div className="tag-list">
                {options.map((opt) => (
                  <TagItem
                    key={opt}
                    label={opt}
                    name="interests"
                    checked={selected.includes(opt)}
                    onChange={() => toggle(opt)}
                  />
                ))}
              </div>
            </AccordionBody>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <span>الابتكار التكنولوجي</span>
              <span className="arrow-icon">
                <i className="fa-solid fa-angle-left"></i>
              </span>
            </Accordion.Header>
            <AccordionBody>
              <div className="tag-list">
                {options.map((opt) => (
                  <TagItem
                    key={opt}
                    label={opt}
                    name="interests"
                    checked={selected.includes(opt)}
                    onChange={() => toggle(opt)}
                  />
                ))}
              </div>
            </AccordionBody>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <span>التسويق الرقمي </span>
              <span className="arrow-icon">
                <i className="fa-solid fa-angle-left"></i>
              </span>
            </Accordion.Header>
            <AccordionBody>
              <div className="tag-list">
                {options.map((opt) => (
                  <TagItem
                    key={opt}
                    label={opt}
                    name="interests"
                    checked={selected.includes(opt)}
                    onChange={() => toggle(opt)}
                  />
                ))}
              </div>
            </AccordionBody>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <span>تحليل البيانات </span>
              <span className="arrow-icon">
                <i className="fa-solid fa-angle-left"></i>
              </span>
            </Accordion.Header>
            <AccordionBody>
              <div className="tag-list">
                {options.map((opt) => (
                  <TagItem
                    key={opt}
                    label={opt}
                    name="interests"
                    checked={selected.includes(opt)}
                    onChange={() => toggle(opt)}
                  />
                ))}
              </div>
            </AccordionBody>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <span>إدارة المشاريع </span>
              <span className="arrow-icon">
                <i className="fa-solid fa-angle-left"></i>
              </span>
            </Accordion.Header>
            <AccordionBody>
              <div className="tag-list">
                {options.map((opt) => (
                  <TagItem
                    key={opt}
                    label={opt}
                    name="interests"
                    checked={selected.includes(opt)}
                    onChange={() => toggle(opt)}
                  />
                ))}
              </div>
            </AccordionBody>
          </Accordion.Item>
        </Accordion>
        <div className="buttons mt-3">
          <BackButton onClick={handleBack} />
          <CustomButton
            type="button"
            fullWidth
            size="large"
            onClick={() => navigate("/customize-platform-services")}
          >
            {t("auth.continue")}
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
