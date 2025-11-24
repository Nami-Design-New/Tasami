const PermissionList = ({ permissions }) => {
  console.log(permissions);

  return (
    <ul className="permission-list">
      {permissions.map((permission, index) => (
        <li className="permission-list__item" key={permission?.id}>
          <i className="fa-solid fa-badge-check permission-list__icon"></i>
          <span className="permission-list__label">{permission?.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default PermissionList;
