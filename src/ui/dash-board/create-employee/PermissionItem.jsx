const PermissionItem = ({ label, id, checked, onChange }) => {
  return (
    <div className="permission__item">
      <label htmlFor={id}>
        <input type="checkbox" id={id} checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

export default PermissionItem;
