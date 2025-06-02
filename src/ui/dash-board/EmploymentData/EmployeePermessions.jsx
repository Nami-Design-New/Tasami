import PermissionList from "./PermissionList";

const EmployeePermissions = () => {
  const permissions = [
    "ايقاف حسابات المستخدمين",
    "ايقاف حسابات الموظفين",
    "التواصل مع المستخدمين (المحادثات)",
  ];

  return <PermissionList permissions={permissions} />;
};

export default EmployeePermissions;
