import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useEditMyCommunityForm from "../../../../validations/communities/edit-my-communities";
import CustomButton from "../../../CustomButton";
import InputField from "../../../forms/InputField";
import TextField from "../../../forms/TextField";
import useEditMyCommunity from "../../../../hooks/website/communities/useEditMyCommunity";

export default function EditCommunityModal({
  showModal,
  setShowModal,
  community,
}) {
  const { editCommunity, isPending } = useEditMyCommunity();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useEditMyCommunityForm();

  const profilePicture = watch("profilePicture");
  const inputFileRef = useRef();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profilePicture", file);
  };

  //  Fill the form with community data when modal opens
  useEffect(() => {
    if (community) {
      reset({
        price: community.price,
        about: community.helper.about || "",
        profilePicture: null,
      });
    }
  }, [community, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("desc", data.about || "");
    formData.append("price", data.price || 0);
    formData.append("is_active", community.is_active === "true" ? "1" : "0");

    if (data.profilePicture instanceof File) {
      formData.append("image", data.profilePicture);
      formData.append("delete_image", "0");
    } else {
      formData.append("delete_image", "0");
    }

    editCommunity(
      { communityId: community.id, formData },
      {
        onSuccess: (res) => {
          setShowModal(false);
          queryClient.invalidateQueries(["my-community"]);
          toast.success(res.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
        onSettled: () => {
          reset();
        },
      }
    );
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
        <h6> {t("website.platform.myCommunity.editCommunity")} </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <p className="image-label">
                <span>{t("website.platform.myCommunity.coverPicture")}</span>{" "}
                <span></span>
              </p>
              <label className="images-input w-100">
                <div className="image-input-wrapper community-cover">
                  {profilePicture ? (
                    <img
                      src={URL.createObjectURL(profilePicture)}
                      alt="preview"
                      className="preview-img"
                    />
                  ) : community?.image ? (
                    <img
                      src={community.image}
                      alt="cover"
                      className="preview-img"
                    />
                  ) : (
                    <img src="/icons/add-photo.svg" alt="placeholder" />
                  )}
                </div>
                <input
                  type="file"
                  ref={inputFileRef}
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="col-12 p-2">
              <InputField
                label={t("website.platform.myCommunity.price")}
                {...register("price")}
                icon={"/icons/ryal.svg"}
                error={errors.price?.message}
                hint={t("website.platform.myCommunity.priceHint")}
              />
            </div>

            <div className="col-12 p-2">
              <TextField
                label={t("website.platform.myCommunity.about")}
                {...register("about")}
                error={errors.about?.message}
              />
            </div>
            <div className="col-12 p-2">
              <CustomButton
                loading={isPending}
                fullWidth
                size="large"
                type="submit"
              >
                {t("save")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
