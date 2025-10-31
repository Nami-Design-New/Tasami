import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useChangeGroup from "../../../../hooks/website/contracts/useChangeGroup";
import useGetMyGroups from "../../../../hooks/website/my-groups/useGetMyGroups";
import CustomButton from "../../../CustomButton";
import SelectField from "../../../forms/SelectField";

export default function ChangeGroupModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, myGroups } = useGetMyGroups("off");
  const { changeGroup, isPending } = useChangeGroup();
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
    const payload = { group_id: data?.group, work_id: id };
    changeGroup(payload, {
      onSuccess: (res) => {
        setShowModal(false);
        toast.success(res.message);
        reset();
        queryClient.invalidateQueries(["work-group"]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>تغيير المجموعة</Modal.Title>
      </Modal.Header>
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
