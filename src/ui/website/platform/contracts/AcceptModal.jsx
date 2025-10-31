import React from "react";
import { Modal } from "react-bootstrap";
import SelectField from "../../../forms/SelectField";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import useGetMyGroups from "../../../../hooks/website/my-groups/useGetMyGroups";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAcceptOrRefuseContract from "../../../../hooks/website/contracts/useAcceptOrRefuseContract";
import { toast } from "sonner";
import CustomButton from "../../../CustomButton";

export default function AcceptModal({ workId, showModal, setShowModal }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { acceptOrRefuse, isPending } = useAcceptOrRefuseContract();
  const { isLoading, myGroups } = useGetMyGroups("off");
  const schema = yup.object().shape({
    group: yup.string().required(t("validation.required")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const allGroups = myGroups?.pages?.flatMap((page) => page?.data) ?? [];
  const onSubmit = (data) => {
    const payload = { groupId: data?.group, id: workId, status: "accepted" };
    acceptOrRefuse(payload, {
      onSuccess: (res) => {
        toast.success("تم قبول العقد بنجاح ✅");
        queryClient.invalidateQueries(["workDetails"]);
        queryClient.refetchQueries(["my-contracts"]);
        reset();
      },
      onError: (error) => {
        toast.error(error.message || "حدث خطأ أثناء تنفيذ العملية");
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
      size="md"
    >
      <Modal.Header closeButton>اختيار المجموعه</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <SelectField
                label={t("website.platform.groups.group")}
                loading={isLoading}
                id="group"
                options={allGroups.map((g) => ({
                  name: g.title,
                  value: g.id,
                }))}
                {...register("group")}
                error={errors?.group?.message}
              />
            </div>
            <div className="col-12 p-2">
              <CustomButton fullWidth loading={isPending}>
                {t("confirm")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
