import { useState } from "react";
import { Outlet } from "react-router";
import useGetCurrentRoute from "../../../hooks/shared/useGetCurrentRoute";
import PageHeader from "../../../ui/PageHeader";
import EditWorkGroupModal from "../../../ui/modals/EditWorkGroupModal";
import OperatingSectorsModal from "../../../ui/modals/OperatingSectorsModal";
import FiledsAndSpecialzationsModal from "../../../ui/modals/FiledsAndSpecialzationsModal";
import SubjectModal from "../../../ui/modals/SubjectModal";

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
            <button
              className="button button--add"
              onClick={() => setShowModal(true)}
            >
              {/* <i className="fa-solid fa-plus"></i> */}
              <span> مجموعه جديده </span>
            </button>
          )}
          {currentLocation === "operating-sectors" && (
            <button
              className="button button--add"
              onClick={() => setAddSectorShowModal(true)}
            >
              <i className="fa-solid fa-plus"></i>
              <span> قطاع جديد</span>
            </button>
          )}
          {currentLocation === "fields-and-specializations" && (
            <button
              className="button button--add"
              onClick={() => setShowAddFiledsModal(true)}
            >
              <span> مجال جديد </span>
            </button>
          )}
          {currentLocation === "administrative-systems" && (
            <button
              className="button button--add"
              onClick={() => setShowSubjectModal(true)}
            >
              <span> موضوع جديد </span>
            </button>
          )}
        </div>
        <div className="row">
          <div className="col-12">
            <Outlet />
          </div>
        </div>
      </section>
      <EditWorkGroupModal setShowModal={setShowModal} showModal={showModal} />
      <OperatingSectorsModal
        setShowModal={setAddSectorShowModal}
        showModal={showAddSectorModal}
      />
      <FiledsAndSpecialzationsModal
        setShowModal={setShowAddFiledsModal}
        showModal={showAddFiledsModal}
      />
      <SubjectModal
        showModal={showSubjectModal}
        setShowModal={setShowSubjectModal}
      />
    </>
  );
};

export default ListManagement;
