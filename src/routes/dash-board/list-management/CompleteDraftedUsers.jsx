import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useGetCities from "../../../hooks/countries/useGetCities";
import useGetCountries from "../../../hooks/countries/useGetCountries";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import useDeleteDraftedUserFiles from "../../../hooks/dashboard/employee/useDeleteDraftedUserFiles";
import useGetDraftedUser from "../../../hooks/dashboard/employee/useGetDraftedUser";
import useUpdateDraftedUser from "../../../hooks/dashboard/employee/useUpdateDraftedUser";
import useGetRoles from "../../../hooks/dashboard/shared/useGetRoles";
import useInfiniteWorkingGroups from "../../../hooks/dashboard/workingGroups/useInfiniteWorkingGroups";
import CustomButton from "../../../ui/CustomButton";
import FileUploader from "../../../ui/forms/FileUPloader";
import FormWrapper from "../../../ui/forms/FormWrapper";
import InputField from "../../../ui/forms/InputField";
import SelectField from "../../../ui/forms/SelectField";
import SelectFieldReactSelect from "../../../ui/forms/SelectFieldReactSelect";
import Loading from "../../../ui/loading/Loading";
import ProfileImageUploader from "../../../ui/ProfileImageUploader";
import { flattenPages, formatYMD } from "../../../utils/helper";
import avatarPlaceholder from "../../../assets//images/dashboard/avatar-placeholder.jpg";

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

export default function CompleteDraftedUsers() {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [image, setImage] = useState(avatarPlaceholder);
  const { t } = useTranslation();

  const { updateDraftedUser, isPending } = useUpdateDraftedUser();
  const { roles, rolesLoading } = useGetRoles();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteWorkingGroups();
  const { deleteDraftedUserFiles, isPending: isDeleting } =
    useDeleteDraftedUserFiles();

  const { draftedUser, isLoading: employeeLoading } = useGetDraftedUser();
  console.log(draftedUser);

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
    "birthdate",
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
    if (draftedUser) {
      reset({
        jobLevel: draftedUser?.data?.role?.id,
        jobTitle: draftedUser?.data?.job_title,
        accountNumber: draftedUser?.data?.code,
        group: draftedUser?.data?.group?.id,
        firstName: draftedUser?.data?.first_name,
        fatherName: draftedUser?.data?.last_name,
        familyName: draftedUser?.data?.family_name,
        birthdate: draftedUser?.data?.birthdate,
        email: draftedUser?.data?.email,
        gender: draftedUser?.data?.gender,
        region: draftedUser?.data?.group?.region?.id,
        city: draftedUser?.data?.group.city?.id,
        sector: draftedUser.data?.group.sector?.id,
        residentCountry: draftedUser?.data?.country_id?.id,
        residentCity: draftedUser?.data?.city_id?.id,
        nationality: draftedUser?.data?.nationality?.id,
        profileImage: draftedUser?.data?.image,
        attachments: draftedUser?.data?.files,
      });

      // Load image
      setImage(draftedUser.data.image || avatarPlaceholder);

      // Load attachments into state
      setFiles(draftedUser.data.files || []);
    }
  }, [draftedUser, reset]);

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
    deleteDraftedUserFiles(fileId, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const onSubmit = (formData) => {
    const payload = new FormData();

    // Call mutation

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
    const originalFiles = draftedUser?.data?.files || [];
    const newFiles = files.filter((f) => !originalFiles.includes(f));
    newFiles.forEach((file, index) => {
      payload.append(`files[${index}]`, file);
    });

    // Call update mutation
    updateDraftedUser(
      { id, payload },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.refetchQueries({
            queryKey: ["dashboard-drafted-users"],
          });
          queryClient.refetchQueries({
            queryKey: ["dashboard-team"],
          });

          if (!allFieldsFilled) {
            queryClient.invalidateQueries({
              queryKey: ["drafted-user-details"],
            });
          } else {
            navigate("/dashboard/teams");
          }
        },
        onError: (err) => {
          toast.error(err.message);
          console.error("Error updating employee:", err);
        },
      }
    );
  };
  console.log(allFields);
  console.log(allFieldsFilled);

  if (employeeLoading) return <Loading />;

  return (
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
              <ProfileImageUploader imageUrl={image} onChange={handleUpload} />
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
              placeholder={t("dashboard.createEmployee.form.email_placeholder")}
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
              <CustomButton
                loading={isPending}
                color={allFieldsFilled ? "success" : "primary"}
                type="submit"
                size="large"
              >
                {allFieldsFilled
                  ? t("dashboard.createEmployee.form.complete")
                  : t("dashboard.createEmployee.form.edit")}
              </CustomButton>
            </div>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
}
