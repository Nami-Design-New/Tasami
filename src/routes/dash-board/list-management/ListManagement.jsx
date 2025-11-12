import { useState } from "react";
import { Outlet } from "react-router";
import useGetCurrentRoute from "../../../hooks/shared/useGetCurrentRoute";
import PageHeader from "../../../ui/PageHeader";
import EditWorkGroupModal from "../../../ui/modals/EditWorkGroupModal";
import OperatingSectorsModal from "../../../ui/modals/OperatingSectorsModal";
import FiledsAndSpecialzationsModal from "../../../ui/modals/FiledsAndSpecialzationsModal";
import SubjectModal from "../../../ui/modals/SubjectModal";
import CustomButton from "../../../ui/CustomButton";

const ListManagement = () => {
  const { currentLocation } = useGetCurrentRoute();
  const [showModal, setShowModal] = useState(false);
  const [showAddSectorModal, setAddSectorShowModal] = useState(false);
  const [showAddFiledsModal, setShowAddFiledsModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  return (
    <>
      <section>
        <div className="p-2 d-flex align-items-center justify-content-between">
          <PageHeader />
          {currentLocation === "working-groups" && (
            <CustomButton
              icon={<i className="fa-solid fa-plus"></i>}
              color="secondary"
              onClick={() => setShowModal(true)}
            >
              مجموعه جديده
            </CustomButton>
          )}
          {currentLocation === "operating-sectors" && (
            <CustomButton
              icon={<i className="fa-solid fa-plus"></i>}
              color="secondary"
              onClick={() => setAddSectorShowModal(true)}
            >
              قطاع جديد
            </CustomButton>
          )}
          {currentLocation === "fields-and-specializations" && (
            <CustomButton
              icon={<i className="fa-solid fa-plus"></i>}
              color="secondary"
              onClick={() => setShowAddFiledsModal(true)}
            >
              مجال جديد
            </CustomButton>
          )}
          {currentLocation === "administrative-systems" && (
            <CustomButton
              icon={<i className="fa-solid fa-plus"></i>}
              color="secondary"
              onClick={() => setShowSubjectModal(true)}
            >
              موضوع جديد
            </CustomButton>
          )}
        </div>
        <div className="row">
          <div className="col-12">
            <Outlet />
          </div>
        </div>
      </section>
      {showModal && (
        <EditWorkGroupModal setShowModal={setShowModal} showModal={showModal} />
      )}

      {showAddSectorModal && (
        <OperatingSectorsModal
          setShowModal={setAddSectorShowModal}
          showModal={showAddSectorModal}
        />
      )}

      {showAddFiledsModal && (
        <FiledsAndSpecialzationsModal
          setShowModal={setShowAddFiledsModal}
          showModal={showAddFiledsModal}
        />
      )}

      {showSubjectModal && (
        <SubjectModal
          showModal={showSubjectModal}
          setShowModal={setShowSubjectModal}
        />
      )}
    </>
  );
};

export default ListManagement;
