import { useState } from "react";
import { Accordion, AccordionBody } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import TagItem from "../../ui/auth/TagItem";
import CustomButton from "../../ui/CustomButton";
import useGetcategories from "../../hooks/area-of-interests/useGetcategories";
import Skeleton from "react-loading-skeleton";

export default function AreasOfInterest() {
  const navigate = useNavigate();
  const { categories, isLoading } = useGetcategories();
  const { t } = useTranslation();

  const [selected, setSelected] = useState([]);

  const toggle = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <section className="personal-info-form">
      <p className="form-head">{t("auth.areasOfInterestPrompt")}</p>
      <div className="area-of-interest">
        <Accordion defaultActiveKey="0">
          {isLoading ? (
            <Accordion.Item eventKey="skeleton" key="skeleton">
              <Accordion.Header>
                <span>
                  <Skeleton width={120} height={18} />
                </span>
                <span className="arrow-icon">
                  <i className="fa-solid fa-angle-left"></i>
                </span>
              </Accordion.Header>
              <AccordionBody>
                <div className="tag-list">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} style={{ margin: "5px 0" }}>
                      <Skeleton width={80} height={25} borderRadius={12} />
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion.Item>
          ) : (
            // Real Accordion Content
            categories.map((category, index) => (
              <Accordion.Item eventKey={index} key={category.id}>
                <Accordion.Header>
                  <span>{category.title}</span>
                  <span className="arrow-icon">
                    <i className="fa-solid fa-angle-left"></i>
                  </span>
                </Accordion.Header>
                <AccordionBody>
                  <div className="tag-list">
                    {category.sub_categories.map((subCategory) => (
                      <TagItem
                        key={subCategory.id}
                        label={subCategory.title}
                        name="interests"
                        checked={selected.includes(subCategory.title)}
                        onChange={() => toggle(subCategory.title)}
                      />
                    ))}
                  </div>
                </AccordionBody>
              </Accordion.Item>
            ))
          )}
        </Accordion>

        <div className="buttons mt-3">
          <CustomButton
            type="button"
            size="large"
            onClick={() => navigate("/")}
            style={{ background: "#0248960A", color: "#0D0D0D" }}
          >
            {t("auth.skip")}
          </CustomButton>
          <CustomButton
            type="button"
            fullWidth
            size="large"
            onClick={() => navigate("/")}
          >
            {t("auth.continue")}
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
