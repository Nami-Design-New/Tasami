const PermissionList = ({ permissions }) => {
  return (
    <ul className="permission-list">
      {permissions.map((permission, index) => (
        <li className="permission-list__item" key={index}>
          <i className="fa-solid fa-badge-check permission-list__icon"></i>
          <span className="permission-list__label">{permission}</span>
        </li>
      ))}
    </ul>
  );
};

export default PermissionList;
