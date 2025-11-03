import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "../../forms/InputField";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";
import useRenewContract from "../../../hooks/website/MyWorks/groups/useRenewContract";
import Currency from "../../Currency";
import CustomButton from "../../CustomButton";

const calculateRenewDate = (baseDate, daysToAdd) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split("T")[0]; // => "2025-12-10"
};

const getSchema = (t) =>
  yup
    .object({
      month: yup
        .number()
        .transform((value, originalValue) => {
          if (originalValue === "" || originalValue == null) return null;
          return isNaN(value) ? NaN : value;
        })
        .nullable()
        .typeError(t("validation.mustBeNumber"))
        .min(0, t("validation.mustBePositive"))
        .max(24, t("validation.maxMonths", { max: 24 })),

      day: yup
        .number()
        .transform((value, originalValue) => {
          if (originalValue === "" || originalValue == null) return null;
          return isNaN(value) ? NaN : value;
        })
        .nullable()
        .typeError(t("validation.mustBeNumber"))
        .min(0, t("validation.mustBePositive"))
        .max(30, t("validation.maxDays", { max: 30 })),
    })
    .test("at-least-one", t("validation.atLeastOne"), function (values) {
      if (!values) return false;
      const { month, day } = values;
      if ((month && month > 0) || (day && day > 0)) return true;

      return this.createError({
        path: "month",
        message: t("validation.atLeastOne"),
      });
    })

    .test(
      "max-total",
      t("validation.maxTotal", { max: 720 }),
      function (values) {
        if (!values) return true;
        const { month = 0, day = 0 } = values;
        const total = month * 30 + day;
        if (total <= 720) return true;

        return this.createError({
          path: "day",
          message: t("validation.maxTotal", { max: 720 }),
        });
      }
    );

export default function RenewContractModal({
  showModal,
  setShowModal,
  contract,
}) {
  const { t } = useTranslation();
  const [price, setPrice] = useState();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: {
      durationInDays: "",
      month: 0,
      day: 0,
    },
    mode: "onChange",
  });
  const month = watch("month");
  const day = watch("day");
  const durationInDays = Number(month) * 30 + Number(day);

  useEffect(() => {
    if (contract?.day_price && durationInDays > 0) {
      setPrice(durationInDays * Number(contract.day_price));
    } else {
      setPrice(0);
    }
  }, [durationInDays, contract]);

  const { renewContract, isPending } = useRenewContract();
  const onSubmit = async () => {
    const renew_to_date = calculateRenewDate(
      contract.expected_end_date,
      durationInDays
    );

    const payload = {
      contract_id: contract?.id,
      renew_to_date,
    };

    renewContract(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setShowModal(false);
        reset();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>تمديد التعاقد</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
          <div className="row">
            <div className="col-12   p-2">
              <div
                className="d-flex align-items-end gap-2"
                style={{ whiteSpace: "noWrap" }}
              >
                <InputField
                  label={"عدد ايام تمديد التعاقد"}
                  placeholder="00"
                  {...register("month")}
                  icon={"/icons/month.svg"}
                />
                <InputField
                  placeholder="00"
                  {...register("day")}
                  icon={"/icons/day.svg"}
                />
              </div>
              <p className="mt-2" style={{ color: "gray" }}>
                {t("website.platform.myAssistance.totalDuration", {
                  duration: durationInDays,
                })}
              </p>
              <p className="error-text d-block">
                {errors?.month?.message}
                {errors?.day?.message}
              </p>
            </div>

            <div className="col-12 p-2">
              <sapn>المبلغ المطلوب</sapn>
              <span>{price}</span>
              <Currency />
            </div>
            <div className="col-12 p-2">
              <CustomButton loading={isPending} fullWidth size="large">
                {t("send")}
              </CustomButton>{" "}
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
