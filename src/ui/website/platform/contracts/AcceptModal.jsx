import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import useAcceptOrRefuseContract from "../../../../hooks/website/contracts/useAcceptOrRefuseContract";
import useGetMyGroups from "../../../../hooks/website/my-groups/useGetMyGroups";
import CustomButton from "../../../CustomButton";
import SelectField from "../../../forms/SelectField";
import AddGroupModal from "../groups/AddGroupModal";
import GlobalModal from "../../../GlobalModal";

export default function AcceptModal({ workId, showModal, setShowModal }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

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
      onSuccess: () => {
        toast.success(t("contract_accept_success"));
        queryClient.invalidateQueries(["workDetails"]);
        queryClient.refetchQueries(["my-contracts"]);
        reset();
      },
      onError: (error) => {
        toast.error(error.message || t("error_default"));
      },
    });
  };
  return (
    <>
      <GlobalModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          reset();
        }}
        centered
        size="md"
      >
        <GlobalModal.Header closeButton>
          {" "}
          <h6>{t("select_group")}</h6>
        </GlobalModal.Header>
        <GlobalModal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
            <div className="row">
              <div className="col-12 p-2">
                <SelectField
                  label={t("website.platform.groups.group")}
                  labelHint={
                    allGroups?.length === 0 && (
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
          </form>{" "}
        </GlobalModal.Body>
      </GlobalModal>{" "}
      <AddGroupModal
        setShowModal={setShowAddGroupModal}
        showModal={showAddGroupModal}
      />
    </>
  );
}
