import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import CustomButton from "../../../ui/CustomButton";
import FileUploader from "../../../ui/forms/FileUPloader";
import InputField from "../../../ui/forms/InputField";
import SelectField from "../../../ui/forms/SelectField";
import TextField from "../../../ui/forms/TextField";

import useAddTaskForm from "../../../hooks/dashboard/tasks/useAddTaskForm";
import useGetSharedEmployees from "../../../hooks/dashboard/tasks/useGetSharedEmployees";
import useGetTaskSystem from "../../../hooks/dashboard/tasks/useGetTaskSystem";
import usePostAddTask from "../../../hooks/dashboard/tasks/usePostAddTask";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import { PAGE_SIZE } from "../../../utils/constants";
import GlobalModal from "../../../ui/GlobalModal";

const AddNewTask = ({ showModal, setShowModal, title }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [files, setFiles] = useState(null);
  const [page] = useState(1);

  const { employees } = useGetSharedEmployees();
  const { taskSystem } = useGetTaskSystem("", page, PAGE_SIZE);
  const { addTask, isAddingTask } = usePostAddTask();

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useAddTaskForm();

  /* ==============================
     CLOSE HANDLING (IMPORTANT)
  ============================== */

  // Intercept ALL close attempts
  const requestClose = () => {
    setShowAlertModal(true);
  };

  // Actually close after confirmation
  const confirmClose = () => {
    setShowAlertModal(false);
    setShowModal(false);
    reset();
    setFiles(null);
  };

  /* ==============================
     FILE HANDLING
  ============================== */

  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
    setValue("files", updatedFiles, { shouldValidate: true });
  };

  /* ==============================
     SUBMIT
  ============================== */

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("employee_id", data.employee_id);
    formData.append("task_system_id", data.task_system_id);
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.files?.length) {
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    }

    addTask(formData, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["dashboard-tasks"] });
        toast.success(res.message);
        confirmClose();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  /* ==============================
     RENDER
  ============================== */

  return (
    <>
      <GlobalModal
        size="lg"
        centered
        show={showModal}
        onHide={requestClose}
        backdrop="static"
        keyboard={false}
      >
        <GlobalModal.Header closeButton>
          <h6>{title}</h6>
        </GlobalModal.Header>

        <GlobalModal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
            <div className="row">
              {/* Employee */}
              <div className="col-12 col-md-6 py-2">
                <Controller
                  name="employee_id"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      {...field}
                      label={t("dashboard.workModel.employee")}
                      options={employees.map((emp) => ({
                        value: emp.id,
                        name: `${emp.first_name} ${emp.family_name}`,
                      }))}
                      error={errors.employee_id?.message}
                    />
                  )}
                />
              </div>

              {/* Title */}
              <div className="col-12 col-md-6 py-2">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label={t("dashboard.workModel.subjectTitle")}
                      placeholder={t(
                        "dashboard.workModel.addSubjectPlaceholder"
                      )}
                      error={errors.title?.message}
                    />
                  )}
                />
              </div>

              {/* Task Type */}
              <div className="col-12 col-md-6 py-2">
                <Controller
                  name="task_system_id"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      {...field}
                      label={t("dashboard.workModel.formType")}
                      options={taskSystem?.data?.map((item) => ({
                        value: item.id,
                        name: item.title,
                      }))}
                      error={errors.task_system_id?.message}
                    />
                  )}
                />
              </div>

              {/* Description */}
              <div className="col-12 py-2">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("dashboard.workModel.description")}
                      placeholder={t(
                        "dashboard.workModel.addDescriptionPlaceholder"
                      )}
                      error={errors.description?.message}
                    />
                  )}
                />
              </div>

              {/* Files */}
              <div className="col-12 py-2">
                <FileUploader
                  label={t("dashboard.workModel.addAttachments")}
                  files={files}
                  onFilesChange={handleFilesChange}
                />
                {errors.files && (
                  <p className="error-text">{errors.files[0]?.message}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="col-12 mt-3 d-flex justify-content-end gap-2">
              <CustomButton
                size="meduim"
                type="button"
                color="secondary"
                onClick={requestClose}
              >
                {t("dashboard.workModel.cancel")}
              </CustomButton>

              <CustomButton
                size="meduim"
                color="primary"
                type="submit"
                loading={isAddingTask}
              >
                {t("dashboard.workModel.send")}
              </CustomButton>
            </div>
          </form>
        </GlobalModal.Body>
      </GlobalModal>

      {/* CONFIRM MODAL */}
      <AlertModal
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={confirmClose}
        confirmButtonText={t("auth.continue")}
      >
        {t("confirmDeleteAlert")}
      </AlertModal>
    </>
  );
};

export default AddNewTask;
