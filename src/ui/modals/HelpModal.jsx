import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import useRequestOffer from "../../hooks/website/goals/useRequestOffer";
import useGetMyGroups from "../../hooks/website/my-groups/useGetMyGroups";
import InputField from "../../ui/forms/InputField";
import SelectField from "../../ui/forms/SelectField";
import TextField from "../../ui/forms/TextField";
import CustomButton from "../CustomButton";
import AddGroupModal from "../website/platform/groups/AddGroupModal";

const HelpModal = ({ showModal, setShowModal, goal }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const { myGroups, isLaoding } = useGetMyGroups("off");
  const allGroups = myGroups?.pages?.flatMap((page) => page?.data) ?? [];
  const { requestOffer, isPending } = useRequestOffer();
  const schema = yup.object().shape({
    price: yup
      .number()
      .typeError(t("validation.number"))
      .positive(t("validation.mustBePositive"))
      .required(t("validation.required")),
    group: yup.string().required(t("validation.required")),
    extraTerms: yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //  Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    const payload = {
      work_id: goal?.id,
      price: data.price,
      group_id: data.group,
      notes: data.extraTerms,
    };
    requestOffer(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        reset();
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["goal-details"] });
        queryClient.refetchQueries({ queryKey: ["homeData"] });
      },
      onError: (error) => {
        toast.error(error.message);
        setShowModal(false);
      },
    });
  };

  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton className="m-2">
          <h6 className="fw-bold">
            {t("website.offerDetails.submitHelpOffer")}
          </h6>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
            <div className="row">
              <div className="col-12 col-lg-6 p-2">
                <InputField
                  {...register("price")}
                  type="number"
                  label={t("website.offerDetails.offerValue")}
                  placeholder="00"
                  id="personalHelpValue"
                  icon={"/icons/ryal.svg"}
                  error={errors?.price?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <SelectField
                  label={t("website.platform.groups.group")}
                  labelHint={
                    allGroups.length === 0 && (
                      <button
                        onClick={() => {
                          setShowAddGroupModal(true);
                          setShowModal(false);
                        }}
                        type="button"
                        className="add-groub-button"
                      >
                        {t("website.offerDetails.addGroup")}
                      </button>
                    )
                  }
                  loading={isLaoding}
                  id="group"
                  options={allGroups.map((g) => ({
                    name: g.title,
                    value: g.id,
                  }))}
                  {...register("group")}
                  error={errors?.group?.message}
                />
              </div>
            </div>

            <div className="col-12 p-2">
              <TextField
                {...register("extraTerms")}
                label={t("website.offerDetails.extraTerms")}
                hint={`"${t("website.platform.cv.optional")}"`}
                placeholder={t("website.inquiry.placeholder")}
                id="groupAdditionalTerms"
                error={errors?.extraTerms?.message}
              />
            </div>

            <div className="col-12 p-2">
              <CustomButton
                type="submit"
                loading={isPending}
                fullWidth
                size="large"
              >
                {t("send")}
              </CustomButton>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Add group modal */}
      <AddGroupModal
        setShowModal={setShowAddGroupModal}
        showModal={showAddGroupModal}
      />
    </>
  );
};

export default HelpModal;
