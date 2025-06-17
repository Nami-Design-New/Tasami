import React from "react";
import { Link } from "react-router";

const groups = ["AG-000254", "AG-000254", "AG-000254"];

const WorkingGroups = () => {
  return (
    <ul className="permission-list">
      {groups.map((permission, index) => (
        <li className="permission-list__item" key={index}>
          <i className="fa-solid fa-badge-check permission-list__icon"></i>
          <Link
            to={`/dashboard/woking-group/${permission}`}
            className="permission-list__label group "
          >
            {permission}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default WorkingGroups;
