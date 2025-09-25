import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useGetcategories from "../../../../hooks/area-of-interests/useGetcategories";
import useAddPostForm from "../../../../validations/posts/add-post";
import CustomButton from "../../../CustomButton";
import FileUploader from "../../../forms/FileUPloader";
import InputField from "../../../forms/InputField";
import SelectField from "../../../forms/SelectField";
import TextField from "../../../forms/TextField";
import useAddPost from "../../../../hooks/website/communities/posts/useAddPost";
import { toast } from "sonner";

export default function AddPostModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { categories, isLoading } = useGetcategories();
  const { addPost, isPending } = useAddPost();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useAddPostForm();

  const selectedFieldId = watch("field");
  const selectedPostType = watch("postType");

  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  // useFieldArray for links
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("category_id", data.field);
    formData.append("sub_category_id", data.specialization);
    formData.append("title", data.title);
    formData.append("desc", data.description);
    formData.append("is_private", data.postType);

    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("file", file);
        formData.append("type", file.type.split("/")[0]);
      });

      formData.append("aspect_ratio", "1.5");
    }

    if (data.links && data.links.length > 0) {
      data.links.forEach((link, index) => {
        if (link && link.trim() !== "") {
          formData.append(`links[${index}]`, link);
        }
      });
    }
    addPost(formData, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["posts"]);
        reset();
        setShowModal(false);
        toast.success(res.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <h5>{t("community.addPost")}</h5>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Field */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("community.field")}
                {...register("field")}
                loading={isLoading}
                options={categories?.map((category) => ({
                  value: category?.id,
                  name: category?.title,
                }))}
                error={errors.field?.message}
              />
            </div>

            {/* Specialization */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("community.specialization")}
                {...register("specialization")}
                options={subCategories.map((sub) => ({
                  value: sub.id,
                  name: sub.title,
                }))}
                error={errors.specialization?.message}
              />
            </div>

            {/* Title */}
            <div className="col-12 p-2">
              <InputField
                label={t("community.meetingTitle")}
                placeholder={t("community.meetingTitlePlaceholder")}
                {...register("title")}
                error={errors.title?.message}
              />
            </div>

            {/* Description */}
            <div className="col-12 p-2">
              <TextField
                label={t("community.description")}
                placeholder={t("community.descriptionPlaceholder")}
                {...register("description")}
                error={errors.description?.message}
              />
            </div>

            {/* FileUploader */}
            <div className="col-12 p-2">
              <Controller
                control={control}
                name="files"
                defaultValue={[]}
                rules={{ required: "الصورة أو الفيديو مطلوب" }}
                render={({ field }) => (
                  <FileUploader
                    label="اضف صورة / فيديو"
                    hint="عنصر واحد فقط"
                    multiple={false}
                    files={field.value}
                    onFilesChange={field.onChange}
                  />
                )}
              />
              {errors.files && (
                <p className="error-text">
                  {errors?.files?.map((error) => error?.message)}
                </p>
              )}
            </div>

            <div className="col-12 p-2">
              <div className="d-flex align-items-center mb-2  gap-2">
                <label className="label m-0 flex-grow-1">
                  {t("community.linkLabel")}{" "}
                </label>{" "}
                <button
                  type="button"
                  className="bg-success text-white d-flex align-items-center justify-content-center"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    fontSize: "12px",
                  }}
                  onClick={() => append(" ")}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              {(fields.length === 0 ? [{}] : fields).map((field, index) => (
                <>
                  <div
                    key={field.id || index}
                    className="d-flex align-items-center gap-2 mb-2 b-0"
                  >
                    <InputField
                      type="text"
                      placeholder={t("community.linkPlaceholder")}
                      // label={t("community.linkLabel")}
                      {...register(`links.${index}`)}
                    />
                    {fields.length > 0 && (
                      <button
                        type="button "
                        onClick={() => remove(index)}
                        className="text-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}{" "}
                  </div>
                  <>
                    {errors.links?.[index] && (
                      <p className="error-text">
                        {errors.links[index].message}
                      </p>
                    )}
                  </>
                </>
              ))}
            </div>

            {/* Post Type */}
            <div className="col-12 col-md-6 p-2">
              <p className="label">{t("community.visibility")}</p>
              <div className="identity-container">
                <label
                  className={`identity-option ${
                    selectedPostType === "0" ? "active" : ""
                  }`}
                >
                  <input type="radio" value="0" {...register("postType")} />
                  <span>{t("membersOnly")}</span>
                </label>

                <label
                  className={`identity-option ${
                    selectedPostType === "1" ? "active" : ""
                  }`}
                >
                  <input type="radio" value="1" {...register("postType")} />
                  <span>{t("public")}</span>
                </label>
              </div>
              {errors.postType && (
                <p className="error-text">{errors.postType.message}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="col-12 mt-3">
            <div className="buttons justify-content-end">
              <CustomButton loading={isPending} type="submit" size="large">
                {t("add")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
