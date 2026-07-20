import { useState } from "react";
import { Outlet } from "react-router";
import useGetCurrentRoute from "../../../hooks/shared/useGetCurrentRoute";
import PageHeader from "../../../ui/PageHeader";
import EditWorkGroupModal from "../../../ui/modals/EditWorkGroupModal";
import OperatingSectorsModal from "../../../ui/modals/OperatingSectorsModal";
import SubjectModal from "../../../ui/modals/SubjectModal";
import CustomButton from "../../../ui/CustomButton";
import { useTranslation } from "react-i18next";
import useAdminPermissions from "../../../hooks/auth/dashboard/useAdminPermissions";
import { DASHBOARD_PERMISSIONS } from "../../../utils/dashboardPermissions";

const ListManagement = () => {
  const { t } = useTranslation();
  const { currentLocation } = useGetCurrentRoute();
  const { hasPermission } = useAdminPermissions();

  const [showModal, setShowModal] = useState(false);
  const [showAddSectorModal, setAddSectorShowModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const canManageWorkingGroups = hasPermission(
    DASHBOARD_PERMISSIONS.WORKING_GROUPS,
  );
  const canManageAdministrativeSystems = hasPermission(
    DASHBOARD_PERMISSIONS.TASK_SYSTEMS,
  );

  return (
    <>
      <section>
        <div className="p-2 d-flex align-items-center justify-content-between">
          <PageHeader />

          {currentLocation === "working-groups" && canManageWorkingGroups && (
            <CustomButton
              icon={<i className="fa-solid fa-plus"></i>}
              color="secondary"
              onClick={() => setShowModal(true)}
            >
              {t("dashboard.listManagement.newGroup")}
            </CustomButton>
          )}

          {currentLocation === "administrative-systems" &&
            canManageAdministrativeSystems && (
            <CustomButton
              icon={<i className="fa-solid fa-plus"></i>}
              color="secondary"
              onClick={() => setShowSubjectModal(true)}
            >
              {t("dashboard.listManagement.newSubject")}
            </CustomButton>
          )}
        </div>

        <div className="row">
          <div className="col-12">
            <Outlet />
          </div>
        </div>
      </section>

      {showModal && canManageWorkingGroups && (
        <EditWorkGroupModal setShowModal={setShowModal} showModal={showModal} />
      )}

      {showAddSectorModal && (
        <OperatingSectorsModal
          setShowModal={setAddSectorShowModal}
          showModal={showAddSectorModal}
        />
      )}

      {showSubjectModal && canManageAdministrativeSystems && (
        <SubjectModal
          showModal={showSubjectModal}
          setShowModal={setShowSubjectModal}
        />
      )}
    </>
  );
};

export default ListManagement;
