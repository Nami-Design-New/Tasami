import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useGetMainCategories from "../../hooks/dashboard/FiledsAndSpecialations/useGetMainCategories";
import SelectField from "../forms/SelectField";

export default function CategorySelect({ error, register, selectedCategory }) {
  const { t } = useTranslation();
  const { categories, isLoading } = useGetMainCategories("", 1, 10, "off");

  const options = useMemo(() => {
    const categoryOptions =
      categories?.map((category) => ({
        value: category.id,
        name: category.title ?? "No Title",
      })) || [];

    if (
      selectedCategory?.id &&
      !categoryOptions.some(
        (option) => String(option.value) === String(selectedCategory.id),
      )
    ) {
      return [
        {
          value: selectedCategory.id,
          name: selectedCategory.title ?? "No Title",
        },
        ...categoryOptions,
      ];
    }

    return categoryOptions;
  }, [categories, selectedCategory]);

  return (
    <SelectField
      label={t("dashboard.fieldsAndSpecialization.existingFieldLabel")}
      options={options}
      loading={isLoading}
      {...register("existingField")}
      error={error}
    />
  );
}
