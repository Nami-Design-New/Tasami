import { useState } from "react";
import { Outlet } from "react-router";
import useGetCurrentRoute from "../../../hooks/shared/useGetCurrentRoute";
import PageHeader from "../../../ui/PageHeader";
import EditWorkGroupModal from "../../../ui/modals/EditWorkGroupModal";
import OperatingSectorsModal from "../../../ui/modals/OperatingSectorsModal";
import FiledsAndSpecialzationsModal from "../../../ui/modals/FiledsAndSpecialzationsModal";

const ListManagement = () => {
  const { currentLocation } = useGetCurrentRoute();
  const [showModal, setShowModal] = useState(false);
  const [showAddSectorModal, setAddSectorShowModal] = useState(false);
  const [showAddFiledsModal, setShowAddFiledsModal] = useState(false);

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
              <i className="fa-solid fa-plus"></i>
              <span> اضف مجموعه </span>
            </button>
          )}
          {currentLocation === "operating-sectors" && (
            <button
              className="button button--add"
              onClick={() => setAddSectorShowModal(true)}
            >
              <i className="fa-solid fa-plus"></i>
              <span> اضف قطاع </span>
            </button>
          )}
          {currentLocation === "fields-and-specializations" && (
            <button
              className="button button--add"
              onClick={() => setShowAddFiledsModal(true)}
            >
              <i className="fa-solid fa-plus"></i>
              <span> اضف مجال جديد </span>
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
    </>
  );
};

export default ListManagement;
