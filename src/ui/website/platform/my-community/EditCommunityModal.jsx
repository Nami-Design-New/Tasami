import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useEditMyCommunityForm from "../../../../validations/communities/edit-my-communities";
import CustomButton from "../../../CustomButton";
import InputField from "../../../forms/InputField";
import TextField from "../../../forms/TextField";
import useEditMyCommunity from "../../../../hooks/website/communities/useEditMyCommunity";
import addPhoto from "../../../../assets/icons/add-photo.svg";
import GlobalModal from "../../../GlobalModal";
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
  const price = watch("price");
  const isFreeCommunity = Number(price) === 0;
  const inputFileRef = useRef();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profilePicture", file);
  };

  //  Fill the form with community data when modal opens
  useEffect(() => {
    if (community) {
      const hasStoredPrice =
        community.price !== null && community.price !== undefined;
      const currentPrice = hasStoredPrice ? Number(community.price) || 0 : 8;

      reset({
        price: currentPrice,
        about: community.helper.about || "",
        profilePicture: null,
      });
    }
  }, [community, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("_method", "put");
    formData.append("desc", data.about || "");
    formData.append("price", data.price);
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
          queryClient.invalidateQueries({ queryKey: ["my-community"] });
          toast.success(res.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
        onSettled: () => {
          reset();
        },
      },
    );
  };

  return (
    <GlobalModal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      centered
      size="lg"
    >
      <GlobalModal.Header closeButton>
        <h6> {t("website.platform.myCommunity.editCommunity")} </h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
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
                    <img src={addPhoto} alt="placeholder" />
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
              <label className="community-fee-label">
                {t("website.platform.myCommunity.price")}
                <span>{t("website.platform.myCommunity.priceHint")}</span>
              </label>

              <div className="community-fee-controls">
                <div
                  className="community-fee-selector"
                  role="radiogroup"
                  aria-label={t("website.platform.myCommunity.price")}
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={!isFreeCommunity}
                    className={!isFreeCommunity ? "active" : ""}
                    onClick={() => {
                      if (Number(price) < 8) {
                        setValue("price", 8, { shouldValidate: true });
                      }
                    }}
                  >
                    {t("website.platform.myCommunity.monthlyFee")}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isFreeCommunity}
                    className={isFreeCommunity ? "active" : ""}
                    onClick={() => {
                      setValue("price", 0, { shouldValidate: true });
                    }}
                  >
                    {t("website.platform.myCommunity.freeFee")}
                  </button>
                </div>

                <div className="community-fee-amount">
                  <InputField
                    type="number"
                    min={isFreeCommunity ? 0 : 8}
                    disabled={isFreeCommunity}
                    {...register("price")}
                    icon={"/icons/ryal.svg"}
                    error={errors.price?.message}
                  />
                </div>
              </div>

              {!isFreeCommunity && !errors.price && (
                <p className="community-fee-minimum">
                  {t("website.platform.myCommunity.minimumMonthlyFee")}
                </p>
              )}
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
      </GlobalModal.Body>
    </GlobalModal>
  );
}
