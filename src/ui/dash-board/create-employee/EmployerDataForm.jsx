import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useGetCities from "../../../hooks/countries/useGetCities";
import useGetCountries from "../../../hooks/countries/useGetCountries";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import useCreateEmployee from "../../../hooks/dashboard/employee/useCreateEmployee";
import useDeleteEmployeeAttachment from "../../../hooks/dashboard/employee/useDeleteEmployeeAttachment";
import useGetEmployee from "../../../hooks/dashboard/employee/useGetEmployee";
import useUpdateEmployee from "../../../hooks/dashboard/employee/useUpdateEmployee";
import useGetRoles from "../../../hooks/dashboard/shared/useGetRoles";
import useInfiniteWorkingGroups from "../../../hooks/dashboard/workingGroups/useInfiniteWorkingGroups";
import { flattenPages, formatYMD } from "../../../utils/helper";
import CustomButton from "../../CustomButton";
import FileUploader from "../../forms/FileUPloader";
import FormWrapper from "../../forms/FormWrapper";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import SelectFieldReactSelect from "../../forms/SelectFieldReactSelect";
import ProfileImageUploader from "../../ProfileImageUploader";

const createEmployeeSchema = (t) =>
  yup.object().shape({
    jobLevel: yup
      .number()
      .typeError(t("errors.required"))
      .required(t("errors.required")),

    jobTitle: yup.string().required(t("errors.required")),

    group: yup
      .number()
      .typeError(t("errors.required"))
      .required(t("errors.required")),

    firstName: yup.string().required(t("errors.required")),

    birthdate: yup
      .date()
      .typeError(t("errors.invalidDate"))
      .required(t("errors.required")),

    email: yup
      .string()
      .email(t("errors.invalidEmail"))
      .required(t("errors.required")),

    // OPTIONAL FIELDS
    accountNumber: yup.string().nullable(),
    date: yup.string().nullable(),
    fatherName: yup.string().nullable(),
    familyName: yup.string().nullable(),
    gender: yup.string().nullable(),
    residentCountry: yup.number().nullable(),
    residentCity: yup.number().nullable(),

    nationality: yup.number().nullable(),

    // Files & image (optional)
    profileImage: yup.mixed().nullable(),
    attachments: yup.array().nullable(),
  });

const EmployerDataForm = ({ isEdit }) => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [image, setImage] = useState(
    "/images/dashboard/avatar-placeholder.jpg"
  );
  const { updateEmployee, isPending } = useUpdateEmployee();
  const { roles, rolesLoading } = useGetRoles();
  const { createEmployee, isCreatingEmployee } = useCreateEmployee();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteWorkingGroups();
  const { deleteEmployeeFiles, isPending: isDeleting } =
    useDeleteEmployeeAttachment();

  const { employee, isLoading: employeeLoading } = useGetEmployee();

  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEmployeeSchema(t)),
    defaultValues: {
      jobLevel: "",
      jobTitle: "",
      group: "",
      firstName: "",
      birthdate: "",
      email: "",
    },
  });

  const countryId = watch("residentCountry");
  const selectedGroupId = watch("group");
  const allFields = watch([
    "jobLevel",
    "jobTitle",
    "group",
    "firstName",
    "birthdate",
    "email",
    "fatherName",
    "familyName",
    "gender",
    "residentCountry",
    "residentCity",
    "nationality",
    "profileImage",
    "attachments",
  ]);
  // Flatten pages → items array

  const flattened = flattenPages(data);

  const groups = useMemo(() => {
    return flattened.map((g) => ({
      value: g.id,
      name: g?.name || "Unnamed",
    }));
  }, [flattened]);

  useEffect(() => {
    if (!selectedGroupId) return;

    const selected = flattened.find((g) => g.id === selectedGroupId);

    if (!selected) return;

    // Auto-fill region, country, and city from selected group
    setValue("region", selected.region?.id);
    setValue("sector", selected.country?.id);
    setValue("city", selected.city?.id);
  }, [selectedGroupId, flattened, setValue]);

  useEffect(() => {
    if (isEdit && employee) {
      reset({
        jobLevel: employee.data.role?.id,
        jobTitle: employee.data.job_title,
        accountNumber: employee.data.code,
        group: employee.data.group.id,
        firstName: employee.data.first_name,
        fatherName: employee.data.last_name,
        familyName: employee.data.family_name,
        birthdate: employee.data.birthdate,
        email: employee.data.email,
        gender: employee.data.gender,
        region: employee.data.group.region?.id,
        city: employee.data.group.city?.id,
        sector: employee.data.group.sector?.id,
        residentCountry: employee.data.country_id.id,
        residentCity: employee.data.city_id.id,
        nationality: employee.data.nationality.id,
      });

      // Load image
      setImage(employee.data.image);

      // Load attachments into state
      setFiles(employee.data.files || []);
    }
  }, [isEdit, employee, reset]);

  const allFieldsFilled = allFields.every(
    (val) =>
      val !== "" &&
      val !== null &&
      val !== undefined &&
      !(Array.isArray(val) && val.length === 0)
  );

  const { data: countires, isLoading: isCountriesLoading } = useGetCountries({
    search: "",
    pagination: "off",
  });

  const { nationalities, isLoading: isNationaliesLoading } =
    useGetNationalities("", "off");

  const { cities, isCitiesLoading } = useGetCities({
    search: "",
    pagination: "off",
    countryId,
  });

  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
    // Set value in the form
    setValue("attachments", updatedFiles, { shouldValidate: true });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      // Set value in the form
      setValue("profileImage", file, { shouldValidate: true });
    }
  };

  const handleDeletefile = (fileId) => {
    deleteEmployeeFiles(fileId, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ["dashboard-employee-details"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const onSubmit = (formData) => {
    const payload = new FormData();

    // Call mutation
    if (isEdit) {
      payload.append("_method", "put");

      // Compare each field with original employee data
      payload.append("role_id", formData.jobLevel);
      payload.append("job_title", formData.jobTitle);
      payload.append("group_id", formData.group);
      payload.append("first_name", formData.firstName);
      payload.append("last_name", formData.fatherName || "");
      payload.append("family_name", formData.familyName || "");
      payload.append("birthdate", formatYMD(formData.birthdate));
      payload.append("email", formData.email);
      payload.append("gender", formData.gender || "");
      payload.append("country_id", formData.residentCountry || "");
      payload.append("city_id", formData.residentCity || "");
      payload.append("nationality_id", formData.nationality || "");

      // Profile image
      if (formData.profileImage instanceof File) {
        payload.append("image", formData.profileImage);
      }

      // Only append attachments if changed
      const originalFiles = employee.data.attachments || [];
      const newFiles = files.filter((f) => !originalFiles.includes(f));
      newFiles.forEach((file, index) => {
        payload.append(`files[${index}]`, file);
      });

      // Call update mutation
      updateEmployee(
        { employeeId: employee.data.id, payload },
        {
          onSuccess: (res) => {
            console.log("Edit employee profile");

            toast.success(res?.message);
            queryClient.refetchQueries({ queryKey: ["dashboard-team"] });
            queryClient.invalidateQueries({
              queryKey: ["dashboard-employee-details"],
            });
          },
          onError: (err) => {
            toast.error(err.message);
            console.error("Error updating employee:", err);
          },
        }
      );
    } else {
      // Append text/number fields
      payload.append("role_id", formData.jobLevel); // or map from jobLevel
      payload.append("job_title", formData.jobTitle);
      payload.append("group_id", formData.group);
      payload.append("first_name", formData.firstName);
      payload.append("last_name", formData.fatherName || "");
      payload.append("family_name", formData.familyName || "");
      payload.append("birthdate", formatYMD(formData.birthdate));
      payload.append("email", formData.email);
      payload.append("gender", formData.gender || "");
      payload.append("country_id", formData.residentCountry || "");
      payload.append("city_id", formData.residentCity || "");
      payload.append("nationality_id", formData.nationality || "");
      // Append profile image if selected
      if (formData?.profileImage && formData?.profileImage instanceof File) {
        payload.append("image", formData?.profileImage);
      }
      // Append attachments if any
      files.forEach((file, index) => {
        payload.append(`files[${index}]`, file);
      });
      createEmployee(payload, {
        onSuccess: (res) => {
          toast.success(res?.message);
          navigate("/dashboard/teams");
          queryClient.refetchQueries({ queryKey: ["dashboard-team"] });
        },
        onError: (error) => {
          toast.error(error.message);
          console.error("Error creating employee:", error);
        },
      });
    }
  };

  return (
    <>
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        {/* Employment Data */}
        <FormWrapper title={t("dashboard.createEmployee.form.employmentData")}>
          <div className="row">
            {/* Job Level */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label={t("dashboard.createEmployee.form.jobLevel")}
                disableFiledValue={t(
                  "dashboard.createEmployee.form.selectJobLevel"
                )}
                loading={rolesLoading}
                error={errors.jobLevel?.message}
                {...register("jobLevel")}
                options={roles?.data.map((role) => ({
                  value: role?.id,
                  name: role?.title,
                }))}
              />
            </div>

            {/* Job Title */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.jobTitle")}
                placeholder={t(
                  "dashboard.createEmployee.form.jobTitle_placeholder"
                )}
                error={errors.jobTitle?.message}
                {...register("jobTitle")}
              />
            </div>

            {/* Account Number */}
            {isEdit && (
              <>
                <div className="col-12 col-md-6 col-xxl-4 p-2">
                  <InputField
                    label={t("dashboard.createEmployee.form.accountNumber")}
                    placeholder="EX: D-140123-00001"
                    disabled
                    {...register("accountNumber")}
                    error={errors.accountNumber?.message}
                  />
                </div>
                <div className="col-12 col-md-6 col-xxl-4 p-2">
                  <InputField
                    label={t("dashboard.createEmployee.form.date")}
                    type="date"
                    disabled
                    {...register("date")}
                    error={errors.date?.message}
                    value={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </>
            )}

            {/* Group */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <Controller
                name="group"
                control={control}
                render={({ field }) => (
                  <SelectFieldReactSelect
                    label={t("dashboard.createEmployee.form.group")}
                    options={groups}
                    loading={isLoading || isFetchingNextPage}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.group?.message}
                    onMenuScrollToBottom={() => {
                      if (hasNextPage) fetchNextPage();
                    }}
                  />
                )}
              />
            </div>

            {/* Region, Sector, City */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <SelectField
                    label={t("dashboard.createEmployee.form.region")}
                    options={flattened.map((g) => ({
                      value: g.region?.id,
                      name: g.region?.title,
                    }))}
                    disabled={true}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <Controller
                name="sector"
                control={control}
                render={({ field }) => (
                  <SelectField
                    label={t("dashboard.createEmployee.form.country")}
                    options={flattened.map((g) => ({
                      value: g.country?.id,
                      name: g.country?.title,
                    }))}
                    disabled={true}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <SelectField
                    label={t("dashboard.createEmployee.form.city")}
                    options={flattened.map((g) => ({
                      value: g.city?.id,
                      name: g.city?.title,
                    }))}
                    disabled={true}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
        </FormWrapper>

        {/* Personal Data */}
        <FormWrapper title={t("dashboard.createEmployee.form.personalData")}>
          <div className="row">
            {/* Profile Image */}
            <div className="col-12 p-2">
              <div className="d-flex align-items-center justify-content-center">
                <ProfileImageUploader
                  imageUrl={image}
                  onChange={handleUpload}
                />
              </div>
            </div>
            {/* First Name */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.firstName")}
                placeholder={t(
                  "dashboard.createEmployee.form.firstName_placeholder"
                )}
                {...register("firstName")}
                error={errors.firstName?.message}
              />
            </div>
            {/* Father Name */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.fatherName")}
                placeholder={t(
                  "dashboard.createEmployee.form.fatherName_placeholder"
                )}
                {...register("fatherName")}
                error={errors.fatherName?.message}
              />
            </div>
            {/* Family Name */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.familyName")}
                placeholder={t(
                  "dashboard.createEmployee.form.familyName_placeholder"
                )}
                {...register("familyName")}
                error={errors.familyName?.message}
              />
            </div>
            {/* Birthdate */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.birthDate")}
                type="date"
                {...register("birthdate")}
                error={errors.birthdate?.message}
              />
            </div>
            {/* Email */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <InputField
                label={t("dashboard.createEmployee.form.email")}
                type="email"
                placeholder={t(
                  "dashboard.createEmployee.form.email_placeholder"
                )}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            {/* Gender */}
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label={t("dashboard.createEmployee.form.gender")}
                options={[
                  {
                    value: "male",
                    name: t("dashboard.createEmployee.form.gender_male"),
                  },
                  {
                    value: "female",
                    name: t("dashboard.createEmployee.form.gender_female"),
                  },
                ]}
                {...register("gender")}
                error={errors.gender?.message}
              />
            </div>

            {/* Nationality */}

            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <SelectField
                    loading={isNationaliesLoading}
                    label={t("profile.nationality")}
                    id="nationality"
                    options={nationalities?.data?.map((nationality) => ({
                      value: nationality.id,
                      name: nationality.title,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.nationality?.message}
                  />
                )}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <Controller
                name="residentCountry"
                control={control}
                render={({ field }) => (
                  <SelectField
                    label={t("profile.country")}
                    loading={isCountriesLoading}
                    id="country"
                    options={countires?.map((country) => ({
                      value: country.id,
                      name: country.title,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.residentCountry?.message}
                  />
                )}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <Controller
                name="residentCity"
                control={control}
                render={({ field }) => (
                  <SelectField
                    loading={isCitiesLoading}
                    label={t("profile.city")}
                    id="city"
                    options={cities?.data?.map((city) => ({
                      value: city.id,
                      name: city.title,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.residentCity?.message}
                  />
                )}
              />
            </div>
            {/* Attachments */}
            <div className="col-12 p-2">
              <FileUploader
                files={files}
                onFilesChange={handleFilesChange}
                label={t("dashboard.createEmployee.form.attachFiles")}
                onDelete={handleDeletefile}
              />
            </div>
            {/* Buttons */}
            <div className="col-12 p-2">
              <div className="buttons w-full justify-content-end">
                {isEdit ? (
                  <CustomButton
                    loading={isPending}
                    type="submit"
                    color={allFieldsFilled ? "success" : "primary"}
                    size="large"
                  >
                    {t("dashboard.createEmployee.form.edit")}
                  </CustomButton>
                ) : (
                  <>
                    <CustomButton
                      type="button"
                      color="secondary"
                      size="large"
                      onClick={() => {
                        reset(); // reset form fields
                        setFiles([]); // reset attachments
                        setImage("/images/dashboard/avatar-placeholder.jpg"); // reset profile image
                      }}
                    >
                      {t("dashboard.createEmployee.form.cancel")}
                    </CustomButton>
                    <CustomButton
                      type="submit"
                      color={allFieldsFilled ? "success" : "primary"}
                      size="large"
                      loading={isCreatingEmployee}
                    >
                      {allFieldsFilled
                        ? t("dashboard.createEmployee.form.add")
                        : t("dashboard.createEmployee.form.saveDraft")}
                    </CustomButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </FormWrapper>
      </form>
    </>
  );
};

export default EmployerDataForm;
