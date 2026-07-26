import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";

import useUpdateAccountStatus from "../../hooks/dashboard/accountStatus/useUpdateAccountStatus";
import CustomButton from "../CustomButton";
import FileUploader from "../forms/FileUPloader";
import InputField from "../forms/InputField";
import TextField from "../forms/TextField";
import GlobalModal from "../GlobalModal";

const normalizeFiles = (files = []) =>
  files.map((file) => {
    if (file instanceof File) return file;
    return { ...file, file: file.file || file.url };
  });

const getSuspension = (account = {}) => {
  if (account.current_suspension) return account.current_suspension;
  if (account.status !== "stopped") return null;

  return {
    from_date: account.suspension_from_date || "",
    to_date: account.suspension_to_date || null,
    reason: "",
    files: [],
  };
};

const getDefaultValues = (account) => {
  const suspension = getSuspension(account);

  return {
    status: account?.status === "stopped" ? "stopped" : "active",
    fromDate: suspension?.from_date || "",
    toDate: suspension?.to_date || "",
    hasEndDate: Boolean(suspension?.to_date),
    reason: suspension?.reason || "",
    files: normalizeFiles(suspension?.files),
  };
};

const createSchema = (t) =>
  yup.object({
    status: yup.string().oneOf(["active", "stopped"]).required(),
    fromDate: yup.string().when("status", {
      is: "stopped",
      then: (schema) =>
        schema.required(
          t("dashboard.userProfile.accountStatusModal.startRequired"),
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
    hasEndDate: yup.boolean(),
    toDate: yup.string().when(["status", "hasEndDate"], {
      is: (status, hasEndDate) => status === "stopped" && hasEndDate,
      then: (schema) =>
        schema
          .required(t("dashboard.userProfile.accountStatusModal.endRequired"))
          .test(
            "is-after-start",
            t("dashboard.userProfile.accountStatusModal.endAfterStart"),
            function (value) {
              return !this.parent.fromDate || value >= this.parent.fromDate;
            },
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
    reason: yup
      .string()
      .max(500, t("dashboard.userProfile.accountStatusModal.reasonMax")),
    files: yup.array().when("status", {
      is: "stopped",
      then: (schema) =>
        schema
          .min(1, t("dashboard.userProfile.accountStatusModal.filesMin"))
          .max(5, t("dashboard.userProfile.accountStatusModal.filesMax")),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

const AccountStatusModal = ({
  show,
  onHide,
  userDetails,
  canChangeStatus,
  isUser = true,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { updateAccountStatus, isPending } = useUpdateAccountStatus();
  const currentSuspension = getSuspension(userDetails);
  const accountType = isUser ? "user" : "employee";
  const queryKey = isUser
    ? ["user-details", userDetails?.id]
    : ["dashboard-employee-details", userDetails?.id];
  const resolver = useMemo(() => yupResolver(createSchema(t)), [t]);
  const latestVersionRef = useRef(currentSuspension?.version ?? 0);
  const accountSnapshot = [
    userDetails?.id,
    userDetails?.status,
    currentSuspension?.id,
    currentSuspension?.version ?? 0,
    currentSuspension?.from_date,
    currentSuspension?.to_date,
    currentSuspension?.reason,
    currentSuspension?.can_edit_from_date,
    (currentSuspension?.files || [])
      .map((file) => file.id || file.url || file.file)
      .join(","),
  ].join("|");
  const accountSnapshotRef = useRef(accountSnapshot);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: getDefaultValues(userDetails),
  });

  const selectedStatus = watch("status");
  const hasEndDate = watch("hasEndDate");
  const isCurrentlySuspended = userDetails?.status === "stopped";
  const isActivating =
    isCurrentlySuspended && selectedStatus === "active";
  const isStartDateLocked =
    Boolean(currentSuspension) &&
    currentSuspension?.can_edit_from_date !== true;
  const isInteractionLocked = isPending;
  const canEditStatus = canChangeStatus && !isInteractionLocked;

  useEffect(() => {
    if (accountSnapshotRef.current !== accountSnapshot) {
      latestVersionRef.current = currentSuspension?.version ?? 0;
      accountSnapshotRef.current = accountSnapshot;
      reset(getDefaultValues(userDetails));
    }
  }, [
    accountSnapshot,
    currentSuspension?.version,
    reset,
    userDetails,
  ]);

  const handleClose = () => {
    onHide();
  };

  const handleStatusChange = (status) => {
    if (!canEditStatus) return;
    setValue("status", status, { shouldValidate: true });
  };

  const updateCachedAccount = (
    accountData,
    version = latestVersionRef.current,
  ) => {
    if (!accountData || typeof accountData !== "object") return;

    queryClient.setQueryData(queryKey, (current) => {
      const nextAccount = {
        ...(current?.data || {}),
        ...accountData,
      };

      if (nextAccount.status === "stopped" && nextAccount.current_suspension) {
        nextAccount.current_suspension = {
          ...nextAccount.current_suspension,
          version:
            accountData.current_suspension?.version ??
            accountData.status_version ??
            accountData.version ??
            version,
        };
      }

      return {
        ...(current || {}),
        data: nextAccount,
      };
    });
  };

  const refetchAccount = () =>
    queryClient.refetchQueries({ queryKey, type: "active" });

  const submitMutation = (payload) => {
    const submittedVersion = Number(payload.get("version")) || 0;
    const submittedStatus = payload.get("status");

    updateAccountStatus(
      { accountType, id: userDetails?.id, payload },
      {
        onSuccess: async (res) => {
          const responseVersion =
            res?.data?.current_suspension?.version ??
            res?.data?.status_version ??
            res?.data?.version;
          latestVersionRef.current =
            responseVersion ??
            (submittedStatus === "stopped" ? submittedVersion + 1 : 0);
          updateCachedAccount(res?.data);
          toast.success(res?.message);
          onHide();
          await refetchAccount();

          const refreshedAccount = queryClient.getQueryData(queryKey)?.data;
          const refreshedVersion =
            refreshedAccount?.current_suspension?.version ??
            refreshedAccount?.status_version ??
            refreshedAccount?.version;
          if (refreshedVersion !== undefined && refreshedVersion !== null) {
            latestVersionRef.current = refreshedVersion;
          }

        },
        onError: async (error) => {
          if (error.response?.status === 409) {
            const conflictAccount = error.response?.data?.data;
            const conflictVersion =
              conflictAccount?.current_suspension?.version ??
              conflictAccount?.status_version ??
              conflictAccount?.version;
            if (conflictVersion !== undefined && conflictVersion !== null) {
              latestVersionRef.current = conflictVersion;
            }
            updateCachedAccount(conflictAccount);
            toast.error(
              t("dashboard.userProfile.accountStatusModal.staleConflict"),
            );
            await refetchAccount();
            return;
          }

          toast.error(
            error.response?.data?.message ||
              error.message ||
              t("dashboard.userProfile.accountStatusModal.updateFailed"),
          );
        },
      },
    );
  };

  const onSubmit = (data) => {
    if (!canEditStatus) return;

    const payload = new FormData();
    payload.append("status", "stopped");
    payload.append("from_date", data.fromDate);
    payload.append("to_date", data.hasEndDate ? data.toDate : "");
    payload.append("reason", data.reason || "");

    if (currentSuspension?.id) {
      payload.append("suspension_id", currentSuspension.id);
    }
    payload.append("version", latestVersionRef.current ?? 0);

    data.files.forEach((file) => {
      if (file instanceof File) {
        payload.append("files[]", file);
      } else if (file?.id) {
        payload.append("keep_file_ids[]", file.id);
      }
    });

    submitMutation(payload);
  };

  const handleActivate = () => {
    if (!canEditStatus) return;

    const payload = new FormData();
    payload.append("status", "active");
    if (currentSuspension?.id) {
      payload.append("suspension_id", currentSuspension.id);
    }
    payload.append("version", latestVersionRef.current ?? 0);
    submitMutation(payload);
  };

  const restoreSuspendedStatus = () => {
    setValue("status", "stopped", { shouldValidate: true });
  };

  return (
    <GlobalModal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="account-status-modal"
      dialogClassName="account-status-modal__dialog"
      aria-labelledby="account-status-modal-title"
    >
      <GlobalModal.Header closeButton>
        <div className="account-status-modal__heading">
          <span className="account-status-modal__heading-icon">
            <i className="fa-regular fa-user-lock" aria-hidden="true" />
          </span>
          <div className="account-status-modal__heading-copy">
            <h2 id="account-status-modal-title">
              {t("dashboard.userProfile.accountStatusModal.title")}
            </h2>
            <div className="account-status-modal__current">
              <span>
                {t("dashboard.userProfile.accountStatusModal.currentStatus")}
              </span>
              <strong
                className={
                  "account-status-modal__status " +
                  (isCurrentlySuspended ? "is-suspended" : "is-active")
                }
              >
                {isCurrentlySuspended
                  ? t("dashboard.userProfile.accountStatusModal.suspended")
                  : t("dashboard.userProfile.accountStatusModal.active")}
              </strong>
            </div>
          </div>
        </div>
      </GlobalModal.Header>

      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div
            className="account-status-modal__tabs"
            role="tablist"
            aria-label={t("dashboard.userProfile.accountStatusModal.status")}
          >
            <button
              type="button"
              role="tab"
              id="account-status-active-tab"
              aria-selected={selectedStatus === "active"}
              aria-controls="account-status-panel"
              className={selectedStatus === "active" ? "active" : ""}
              disabled={!canEditStatus}
              onClick={() => handleStatusChange("active")}
            >
              <i className="fa-regular fa-circle-check" aria-hidden="true" />
              <span>
                {t("dashboard.userProfile.accountStatusModal.active")}
              </span>
            </button>
            <button
              type="button"
              role="tab"
              id="account-status-suspended-tab"
              aria-selected={selectedStatus === "stopped"}
              aria-controls="account-status-panel"
              className={selectedStatus === "stopped" ? "active" : ""}
              disabled={!canEditStatus}
              onClick={() => handleStatusChange("stopped")}
            >
              <i className="fa-regular fa-circle-pause" aria-hidden="true" />
              <span>
                {t("dashboard.userProfile.accountStatusModal.suspended")}
              </span>
            </button>
          </div>

          <div
            id="account-status-panel"
            className="account-status-modal__panel"
            role="tabpanel"
            aria-busy={isPending}
            inert={isInteractionLocked ? true : undefined}
            aria-labelledby={
              selectedStatus === "active"
                ? "account-status-active-tab"
                : "account-status-suspended-tab"
            }
          >
            {selectedStatus === "stopped" ? (
              <>
                <section className="account-status-modal__section">
                  <div className="account-status-modal__section-header">
                    <div>
                      <i className="fa-regular fa-calendar-range" aria-hidden />
                      <h3>
                        {t(
                          "dashboard.userProfile.accountStatusModal.duration",
                        )}
                      </h3>
                    </div>
                    <label
                      className="account-status-modal__duration-toggle"
                      htmlFor="account-status-has-end-date"
                    >
                      <span>
                        {t(
                          "dashboard.userProfile.accountStatusModal.hasEndDate",
                        )}
                      </span>
                      <input
                        type="checkbox"
                        id="account-status-has-end-date"
                        disabled={!canEditStatus}
                        {...register("hasEndDate")}
                      />
                      <span aria-hidden="true" />
                    </label>
                  </div>

                  <div className="account-status-modal__date-grid">
                    <InputField
                      id="account-status-from-date"
                      name="from_date"
                      type="date"
                      autoComplete="off"
                      label={t(
                        "dashboard.userProfile.accountStatusModal.fromDate",
                      )}
                      disabled={!canEditStatus || isStartDateLocked}
                      aria-invalid={Boolean(errors.fromDate)}
                      {...register("fromDate")}
                      error={errors.fromDate?.message}
                    />

                    {hasEndDate ? (
                      <InputField
                        id="account-status-to-date"
                        name="to_date"
                        type="date"
                        autoComplete="off"
                        label={t(
                          "dashboard.userProfile.accountStatusModal.toDate",
                        )}
                        disabled={!canEditStatus}
                        aria-invalid={Boolean(errors.toDate)}
                        {...register("toDate")}
                        error={errors.toDate?.message}
                      />
                    ) : (
                      <div className="account-status-modal__indefinite">
                        <i className="fa-regular fa-infinity" aria-hidden />
                        <div>
                          <strong>
                            {t(
                              "dashboard.userProfile.accountStatusModal.noEndDate",
                            )}
                          </strong>
                          <span>
                            {t(
                              "dashboard.userProfile.accountStatusModal.indefinite",
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section className="account-status-modal__section">
                  <div className="account-status-modal__section-header">
                    <div>
                      <i className="fa-regular fa-message-lines" aria-hidden />
                      <h3>
                        {t(
                          "dashboard.userProfile.accountStatusModal.reason",
                        )}
                      </h3>
                    </div>
                  </div>
                  <TextField
                    id="account-status-reason"
                    name="reason"
                    autoComplete="off"
                    label={t(
                      "dashboard.userProfile.accountStatusModal.reasonLabel",
                    )}
                    disabled={!canEditStatus}
                    aria-invalid={Boolean(errors.reason)}
                    {...register("reason")}
                    error={errors.reason?.message}
                  />
                </section>

                <section className="account-status-modal__section">
                  <div className="account-status-modal__section-header">
                    <div>
                      <i className="fa-regular fa-paperclip" aria-hidden />
                      <h3>
                        {t(
                          "dashboard.userProfile.accountStatusModal.attachments",
                        )}
                      </h3>
                    </div>
                    <span className="account-status-modal__file-limit">
                      {t(
                        "dashboard.userProfile.accountStatusModal.fileLimit",
                      )}
                    </span>
                  </div>

                  {canChangeStatus ? (
                    <Controller
                      name="files"
                      control={control}
                      render={({ field }) => (
                        <FileUploader
                          files={field.value}
                          onFilesChange={field.onChange}
                          maxFiles={5}
                          label={t(
                            "dashboard.userProfile.accountStatusModal.addFiles",
                          )}
                        />
                      )}
                    />
                  ) : currentSuspension?.files?.length ? (
                    <div className="account-status-modal__file-list">
                      {currentSuspension.files.map((file) => (
                        <a
                          key={file.id || file.url}
                          href={file.url || file.file}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i
                            className="fa-regular fa-file-lines"
                            aria-hidden
                          />
                          <span>
                            {file.name ||
                              t(
                                "dashboard.userProfile.accountStatusModal.attachment",
                              )}
                          </span>
                          <i
                            className="fa-regular fa-arrow-up-right-from-square"
                            aria-hidden
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="account-status-modal__empty-files">
                      <i className="fa-regular fa-file-circle-xmark" aria-hidden />
                      <span>
                        {t(
                          "dashboard.userProfile.accountStatusModal.noAttachments",
                        )}
                      </span>
                    </div>
                  )}
                  {errors.files ? (
                    <p
                      className="account-status-modal__error"
                      aria-live="polite"
                    >
                      {errors.files.message}
                    </p>
                  ) : null}
                </section>
              </>
            ) : (
              <div className="account-status-modal__active-state">
                <span>
                  <i className="fa-regular fa-circle-check" aria-hidden />
                </span>
                <div>
                  <h3>
                    {t(
                      "dashboard.userProfile.accountStatusModal.activeTitle",
                    )}
                  </h3>
                  <p>
                    {t(
                      "dashboard.userProfile.accountStatusModal.activeMessage",
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {isActivating ? (
            <div className="account-status-modal__confirmation" role="alert">
              <i className="fa-regular fa-triangle-exclamation" aria-hidden />
              <div>
                <strong>
                  {t(
                    "dashboard.userProfile.accountStatusModal.confirmActivation",
                  )}
                </strong>
                <p>
                  {t(
                    "dashboard.userProfile.accountStatusModal.activateConfirmation",
                  )}
                </p>
              </div>
            </div>
          ) : null}

          <div className="account-status-modal__actions">
            {isActivating ? (
              <>
                <CustomButton
                  type="button"
                  color="secondary"
                  size="medium"
                  onClick={restoreSuspendedStatus}
                >
                  {t("dashboard.userProfile.accountStatusModal.cancel")}
                </CustomButton>
                <CustomButton
                  type="button"
                  color="primary"
                  size="medium"
                  loading={isPending}
                  disabled={isInteractionLocked}
                  onClick={handleActivate}
                >
                  {t(
                    "dashboard.userProfile.accountStatusModal.confirmActivation",
                  )}
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton
                  type="button"
                  color="secondary"
                  size="medium"
                  onClick={handleClose}
                >
                  {t("dashboard.userProfile.accountStatusModal.close")}
                </CustomButton>
                {canChangeStatus && selectedStatus === "stopped" ? (
                  <CustomButton
                    type="submit"
                    color="primary"
                    size="medium"
                    loading={isPending}
                    disabled={isInteractionLocked}
                  >
                    {currentSuspension
                      ? t(
                          "dashboard.userProfile.accountStatusModal.saveChanges",
                        )
                      : t(
                          "dashboard.userProfile.accountStatusModal.suspendAccount",
                        )}
                  </CustomButton>
                ) : null}
              </>
            )}
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
};

export default AccountStatusModal;
