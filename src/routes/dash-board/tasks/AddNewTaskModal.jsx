import { Modal } from "react-bootstrap";
import CustomButton from "../../../ui/CustomButton";
import FileUploader from "../../../ui/forms/FileUPloader";
import InputField from "../../../ui/forms/InputField";
import SelectField from "../../../ui/forms/SelectField";
import TextField from "../../../ui/forms/TextField";
import { useTranslation } from "react-i18next";
import useGetSharedEmployees from "../../../hooks/dashboard/tasks/useGetSharedEmployees";
import usePostAddTask from "../../../hooks/dashboard/tasks/usePostAddTask";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { useState } from "react";
import useAddTaskForm from "../../../hooks/dashboard/tasks/useAddTaskForm";
import useGetTaskSystem from "../../../hooks/dashboard/tasks/useGetTaskSystem";
import { PAGE_SIZE } from "../../../utils/constants";


const AddNewTask = ({ showModal, setShowModal, title }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [files, setFiles] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { employees } = useGetSharedEmployees();
  const { taskSystem } = useGetTaskSystem("", page, PAGE_SIZE);

  const { addTask } = usePostAddTask();
  // console.log("taskSystem", taskSystem);

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useAddTaskForm();

  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
    setValue("files", updatedFiles, { shouldValidate: true });
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("employee_id", data.employee_id);
    formData.append("task_system_id", data.task_system_id);
    formData.append("title", data.title);
    formData.append("description", data.description);

    // Handle file
    if (data.files && data.files.length > 0) {
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    }

    addTask(formData, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["dashboard-tasks"]);
        reset();
        setShowModal(false);
        toast.success(res.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Modal size="lg" centered show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <h6>{title}</h6>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
          <div className="row">
            {/* Employee Select */}
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
                    placeholder={t("dashboard.workModel.addSubjectPlaceholder")}
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
                    options={taskSystem?.data?.map((emp) => ({
                      value: emp.id,
                      name: `${emp.title}`,
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

            {/* File Uploader */}
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
          <div className="col-12 py-2">
            <div className="col-12 mt-3 d-flex align-items-center justify-content-end gap-2">
              <CustomButton
                size="meduim"
                type="button"
                color="secondary"
                onClick={() => setShowModal(false)}
              >
                {t("dashboard.workModel.cancel")}
              </CustomButton>

              <CustomButton size="meduim" color="primary" type="submit">
                {t("dashboard.workModel.send")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewTask;
