import { Modal } from "react-bootstrap";
import CustomButton from "../../../ui/CustomButton";
import SelectField from "../../../ui/forms/SelectField";
import { useTranslation } from "react-i18next";
import useGetSharedEmployees from "../../../hooks/dashboard/tasks/useGetSharedEmployees";
import usePostReassignTask from "../../../hooks/dashboard/tasks/usePostReassignTask";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ReassignTaskModal({
  showModal,
  setShowModal,
  selectedRow,
}) {
  const { t } = useTranslation();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const { employees } = useGetSharedEmployees();
  const { reassignTask } = usePostReassignTask();
  const queryClient = useQueryClient();

  const handleReassignTask = () => {
    const payload = {
      task_id: selectedRow,
      employee_id: selectedEmployee,
    };
    reassignTask(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ["dashboard-tasks"],
        });
        setShowModal(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <h6>{t("dashboard.tasks.reassignModal.title")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <SelectField
                label={t("dashboard.tasks.reassignModal.employeeLabel")}
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                options={employees.map((emp) => ({
                  value: emp.id,
                  name: `${emp.first_name} ${emp.family_name}`,
                }))}
              />
            </div>
            <div className="col-12 p-2">
              <CustomButton
                type="button"
                onClick={handleReassignTask}
                fullWidth
                size="large"
              >
                {t("dashboard.tasks.reassignModal.reassignButton")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
