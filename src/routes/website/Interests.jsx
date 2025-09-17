import { useEffect, useState } from "react";
import CustomButton from "../../ui/CustomButton";
import { Accordion, AccordionBody, Placeholder } from "react-bootstrap";
import useUpdateUserCategories from "../../hooks/area-of-interests/useUpdateUserCategories";
import { useTranslation } from "react-i18next";
import useGetMyInterests from "../../hooks/area-of-interests/useGetMyInterests";
import TagItem from "../../ui/website-auth/TagItem";

export default function Interests() {
  const { interests, isLoading: isInterestsLoading } = useGetMyInterests();
  const { t } = useTranslation();

  const [selected, setSelected] = useState([]); // selected IDs
  const [initialSelected, setInitialSelected] = useState([]); // initial IDs from API
  const { updateUserCategories, isPending } = useUpdateUserCategories();

  // Initialize selection once data is loaded
  useEffect(() => {
    if (interests?.length) {
      const selectedIds = interests
        .flatMap((cat) => cat.sub_categories)
        .filter((sub) => sub.is_selected)
        .map((sub) => sub.id);

      setSelected(selectedIds);
      setInitialSelected(selectedIds);
    }
  }, [interests]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    const added = selected.filter((id) => !initialSelected.includes(id));
    const removed = initialSelected.filter((id) => !selected.includes(id));

    updateUserCategories(
      {
        sub_category_ids: added,
        deleted_sub_category_ids: removed,
      },
      {
        onSuccess: () => {
          setInitialSelected(selected);
        },
      }
    );
  };

  return (
    <section className="auth_section">
      <div className="form_container p-0 justify-content-start align-items-stretch h-auto">
        <section className="personal-info-form">
          <div className="area-of-interest w-100 ">
            <Accordion defaultActiveKey="0">
              {isInterestsLoading ? (
                <div>
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className="d-flex align-items-center justify-content-between"
                      style={{
                        backgroundColor: "rgba(13, 13, 13, 0.0196078431)",
                        color: "#0d0d0d",
                        borderRadius: "12px",
                        padding: "0.75rem 1rem",
                        marginBottom: "12px",
                      }}
                    >
                      <Placeholder xs={10} animation="glow">
                        <Placeholder xs={3} />
                      </Placeholder>
                      <Placeholder
                        xs={12}
                        animation="glow"
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          display: "block",
                        }}
                      >
                        <Placeholder xs={12} />
                      </Placeholder>
                    </div>
                  ))}
                </div>
              ) : (
                interests.map((category, index) => (
                  <Accordion.Item eventKey={index.toString()} key={category.id}>
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
                            checked={selected.includes(subCategory.id)}
                            onChange={() => toggle(subCategory.id)}
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
                fullWidth
                size="large"
                onClick={handleContinue}
                loading={isPending}
                disabled={isPending || selected.length === 0}
              >
                {t("auth.continue")}
              </CustomButton>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
