import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Accordion, AccordionBody } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import useGetMyInterests from "../../hooks/area-of-interests/useGetMyInterests";
import useUpdateUserCategories from "../../hooks/area-of-interests/useUpdateUserCategories";
import CustomButton from "../../ui/CustomButton";
import InterestsLoading from "../../ui/loading/InterestsLoading";
import TagItem from "../../ui/website-auth/TagItem";

export default function Interests() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]); // selected IDs
  const [initialSelected, setInitialSelected] = useState([]); // initial IDs from API
  const { interests, isLoading: isInterestsLoading } = useGetMyInterests();

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
          queryClient.invalidateQueries({ queryKey: ["interests"] });
          navigate("/my-profile");
        },
      }
    );
  };

  return (
    <section className="auth_section h-auto">
      <div className="form_container p-0 justify-content-start align-items-stretch ">
        <section
          className="personal-info-form w-100  m-0"
          style={{ maxWidth: "100%" }}
        >
          <div className="area-of-interest w-100 ">
            <Accordion defaultActiveKey="0">
              {isInterestsLoading ? (
                <div>
                  {Array.from({ length: 3 }, (_, i) => (
                    <InterestsLoading key={i} />
                  ))}
                </div>
              ) : (
                interests.map((category, index) => (
                  <Accordion.Item eventKey={index.toString()} key={category.id}>
                    <Accordion.Header
                      className={
                        category.sub_categories.some((sub) =>
                          selected.includes(sub.id)
                        )
                          ? "has-selected"
                          : ""
                      }
                    >
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
