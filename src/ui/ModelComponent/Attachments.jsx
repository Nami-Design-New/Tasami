import { useState, useRef } from "react";
import { Link } from "react-router";
import AttachmentsModal from "./AttachmentsModal";
import usePostAddTaskFile from "../../hooks/dashboard/tasks/usePostAddTaskFile";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Attachments = ({ taskData }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  const { addTaskFile } = usePostAddTaskFile();
  const { t } = useTranslation();

  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("task_id", "1");
    formData.append("file", file);

    addTaskFile(formData, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const handleSave = () => {};

  return (
    <>
      <div className="attachments-container ">
        <h4 className="attachments-title">
          {t("dashboard.tasks.modelTask.taskDetails.attachment")}
        </h4>
        <div className="table-container table-responsive border">
          <table className="custom-table table table-bordered text-center align-middle mb-0  attachments-table">
            <thead className="table-light">
              <tr>
                <th>{t("dashboard.tasks.modelTask.taskDetails.date")}</th>
                <th>{t("dashboard.tasks.modelTask.taskDetails.time")}</th>
                <th>{t("dashboard.tasks.modelTask.taskDetails.name")}</th>
                <th>
                  {t("dashboard.tasks.modelTask.taskDetails.accountNumber")}{" "}
                </th>

                <th>
                  {t("dashboard.tasks.modelTask.taskDetails.fileAttachment")}{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {taskData?.task?.files.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{`${item.employee.first_name} ${item.employee.family_name}`}</td>
                  <td>
                    <Link
                      to={`/dashboard/employee-details/${item.account}`}
                      className="link-styles"
                    >
                      {item.employee.id_number}
                    </Link>
                  </td>

                  <td>{item.file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div className="add-btn-container">
          <button
            className="add-attachment-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <i className="fa-solid fa-circle-plus"></i>
            {t("dashboard.tasks.modelTask.taskDetails.addAttachment")}
          </button>
        </div>
      </div>

      <AttachmentsModal
        showModal={showModal}
        setShowModal={setShowModal}
        titleInput={titleInput}
        setTitleInput={setTitleInput}
        handleSave={handleSave}
      />
    </>
  );
};

export default Attachments;
