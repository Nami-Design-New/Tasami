// import { useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { Controller } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import { toast } from "sonner";

// import CustomButton from "../../../ui/CustomButton";
// import FileUploader from "../../../ui/forms/FileUPloader";
// import InputField from "../../../ui/forms/InputField";
// import SelectField from "../../../ui/forms/SelectField";
// import TextField from "../../../ui/forms/TextField";

// import useAddTaskForm, {
//   ADD_NEW_TASK_MODAL,
// } from "../../../hooks/dashboard/tasks/useAddTaskForm";
// import useGetSharedEmployees from "../../../hooks/dashboard/tasks/useGetSharedEmployees";
// import useGetTaskSystem from "../../../hooks/dashboard/tasks/useGetTaskSystem";
// import usePostAddTask from "../../../hooks/dashboard/tasks/usePostAddTask";
// import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
// import { PAGE_SIZE } from "../../../utils/constants";
// import GlobalModal from "../../../ui/GlobalModal";
// import useFormCloseHandler from "../../../hooks/shared/useFormCloseHandler";

// const AddNewTask = ({ showModal, setShowModal, title }) => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();

//   const [page] = useState(1);

//   const { employees } = useGetSharedEmployees();
//   const { taskSystem } = useGetTaskSystem("", page, PAGE_SIZE, "internal");
//   const { addTask, isAddingTask } = usePostAddTask();

//   const {
//     handleSubmit,
//     reset,
//     watch,
//     control,
//     formState: { errors },
//   } = useAddTaskForm();
//   const { showAlertModal, requestClose, confirmClose, cancelClose } =
//     useFormCloseHandler({
//       watch,
//       reset,
//       defaultValues: ADD_NEW_TASK_MODAL,
//       onClose: () => setShowModal(false),
//     });
//   /* ==============================
//      CLOSE HANDLING (IMPORTANT)
//   ============================== */

//   /* ==============================
//      SUBMIT
//   ============================== */

//   const onSubmit = (data) => {
//     const formData = new FormData();

//     formData.append("employee_id", data.employee_id);
//     formData.append("task_system_id", data.task_system_id);
//     formData.append("title", data.title);
//     formData.append("description", data.description);

//     if (data.files?.length) {
//       console.log(data.files);

//       data.files.forEach((file, index) => {
//         formData.append(`files[${index}]`, file);
//       });
//     }

//     addTask(formData, {
//       onSuccess: (res) => {
//         queryClient.invalidateQueries({ queryKey: ["dashboard-tasks"] });
//         toast.success(res.message);
//         confirmClose();
//       },
//       onError: (err) => {
//         toast.error(err.message);
//       },
//     });
//   };

//   /* ==============================
//      RENDER
//   ============================== */

//   return (
//     <>
//       <GlobalModal size="lg" centered show={showModal} onHide={requestClose}>
//         <GlobalModal.Header closeButton>
//           <h6>{title}</h6>
//         </GlobalModal.Header>

//         <GlobalModal.Body>
//           <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
//             <div className="row">
//               {/* Employee */}
//               <div className="col-12 col-md-6 py-2">
//                 <Controller
//                   name="employee_id"
//                   control={control}
//                   render={({ field }) => (
//                     <SelectField
//                       {...field}
//                       label={t("dashboard.workModel.employee")}
//                       options={employees.map((emp) => ({
//                         value: emp.id,
//                         name: `${emp.first_name} ${emp.family_name}`,
//                       }))}
//                       error={errors.employee_id?.message}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Title */}
//               <div className="col-12 col-md-6 py-2">
//                 <Controller
//                   name="title"
//                   control={control}
//                   render={({ field }) => (
//                     <InputField
//                       {...field}
//                       label={t("dashboard.workModel.subjectTitle")}
//                       placeholder={t(
//                         "dashboard.workModel.addSubjectPlaceholder",
//                       )}
//                       error={errors.title?.message}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Task Type */}
//               <div className="col-12 col-md-6 py-2">
//                 <Controller
//                   name="task_system_id"
//                   control={control}
//                   render={({ field }) => (
//                     <SelectField
//                       {...field}
//                       label={t("dashboard.workModel.formType")}
//                       options={taskSystem?.data?.map((item) => ({
//                         value: item.id,
//                         name: item.title,
//                       }))}
//                       error={errors.task_system_id?.message}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Description */}
//               <div className="col-12 py-2">
//                 <Controller
//                   name="description"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label={t("dashboard.workModel.description")}
//                       placeholder={t(
//                         "dashboard.workModel.addDescriptionPlaceholder",
//                       )}
//                       error={errors.description?.message}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Files */}
//               <div className="col-12 py-2">
//                 <Controller
//                   name="files"
//                   control={control}
//                   render={({ field }) => (
//                     <FileUploader
//                       label={t("dashboard.workModel.addAttachments")}
//                       files={field.value || []}
//                       onFilesChange={field.onChange}
//                     />
//                   )}
//                 />
//                 {errors.files && (
//                   <p className="error-text">{errors.files[0]?.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="col-12 mt-3 d-flex justify-content-end gap-2">
//               <CustomButton
//                 size="meduim"
//                 type="button"
//                 color="secondary"
//                 onClick={requestClose}
//               >
//                 {t("dashboard.workModel.cancel")}
//               </CustomButton>

//               <CustomButton
//                 size="meduim"
//                 color="primary"
//                 type="submit"
//                 loading={isAddingTask}
//               >
//                 {t("dashboard.workModel.send")}
//               </CustomButton>
//             </div>
//           </form>
//         </GlobalModal.Body>
//       </GlobalModal>

//       {/* CONFIRM MODAL */}
//       <AlertModal
//         showModal={showAlertModal}
//         setShowModal={cancelClose}
//         onConfirm={confirmClose}
//         confirmButtonText={t("auth.continue")}
//       >
//         {t("confirmDeleteAlert")}
//       </AlertModal>
//     </>
//   );
// };

// export default AddNewTask;
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

import useAddTaskForm, {
  ADD_NEW_TASK_MODAL,
} from "../../../hooks/dashboard/tasks/useAddTaskForm";
import useGetSharedEmployees from "../../../hooks/dashboard/tasks/useGetSharedEmployees";
import useGetTaskSystem from "../../../hooks/dashboard/tasks/useGetTaskSystem";
import usePostAddTask from "../../../hooks/dashboard/tasks/usePostAddTask";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import { PAGE_SIZE } from "../../../utils/constants";
import GlobalModal from "../../../ui/GlobalModal";
import useFormCloseHandler from "../../../hooks/shared/useFormCloseHandler";

/* ==============================
   Accepted file types for the task attachments uploader.
   Covers images, videos, and common document formats.
============================== */
const TASK_ACCEPTED_FILES = {
  "image/*": [],
  "video/*": [],
  "application/pdf": [],
  "application/msword": [],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
  "application/vnd.ms-excel": [],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
  "application/vnd.ms-powerpoint": [],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    [],
  "text/plain": [],
  "text/csv": [],
  "application/zip": [],
  "application/x-rar-compressed": [],
};

const AddNewTask = ({ showModal, setShowModal, title }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [page] = useState(1);

  const { employees } = useGetSharedEmployees();
  const { taskSystem } = useGetTaskSystem("", page, PAGE_SIZE, "internal");
  const { addTask, isAddingTask } = usePostAddTask();

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useAddTaskForm();
  const { showAlertModal, requestClose, confirmClose, cancelClose } =
    useFormCloseHandler({
      watch,
      reset,
      defaultValues: ADD_NEW_TASK_MODAL,
      onClose: () => setShowModal(false),
    });
  /* ==============================
     CLOSE HANDLING (IMPORTANT)
  ============================== */

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
      console.log(data.files);

      data.files.forEach((file, index) => {
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
      <GlobalModal size="lg" centered show={showModal} onHide={requestClose}>
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
                        "dashboard.workModel.addSubjectPlaceholder",
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
                        "dashboard.workModel.addDescriptionPlaceholder",
                      )}
                      error={errors.description?.message}
                    />
                  )}
                />
              </div>

              {/* Files */}
              <div className="col-12 py-2">
                <Controller
                  name="files"
                  control={control}
                  render={({ field }) => (
                    <FileUploader
                      label={t("dashboard.workModel.addAttachments")}
                      files={field.value || []}
                      onFilesChange={field.onChange}
                      accept={TASK_ACCEPTED_FILES}
                    />
                  )}
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
        setShowModal={cancelClose}
        onConfirm={confirmClose}
        confirmButtonText={t("auth.continue")}
      >
        {t("confirmDeleteAlert")}
      </AlertModal>
    </>
  );
};

export default AddNewTask;
