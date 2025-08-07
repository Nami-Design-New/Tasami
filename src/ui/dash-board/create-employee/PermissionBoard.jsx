import CustomButton from "../../CustomButton";
import PermissionGroup from "./PermissionGroup";

const permessions = [
  {
    id: 1,
    permissionTitle: "اداره المهام",
    permissions: [
      "معاينه مهام الموظفين",
      " معاينه مهام المشرفين ",
      " معاينه مهام التنفيذيين ",
    ],
  },
  {
    id: 2,
    permissionTitle: "اداره الصلاحيات",
    permissions: [
      "تعديل الصلاحيات الوظيفيه",
      "تعديل الصلاحيات الاشرافيه",
      "تعديل الصلاحيات التنفيذيه",
    ],
  },
  {
    id: 3,
    permissionTitle: "التقارير ",
    permissions: [
      "معاينه تقارير االاداء للموظفين",
      " معاينه تقارير االاداء للمشرفين ",
      " معاينه تقارير االاداء للتنفيذيين ",
      " معاينه تقارير االاداء للاشتراكات ",
      " معاينه تقارير االاداء للبرامج و الخدمات ",
      " معاينه تقارير االاداء لخدمه العملاء ",
      " معاينه تقارير االاداء العمليات الاشرافيه و التنفيذيه ",
      " معاينه تقارير االاداء للمبيعات ",
    ],
  },
  {
    id: 4,
    permissionTitle: "اداره القوائم",
    permissions: [
      "اضافه وتعديل مجموعات العمل",
      "اضافه وتعديل قطاعات التشغيل ",
      "اضافه وتعديل المجالات و التخصصات ",
    ],
  },
  {
    id: 5,
    permissionTitle: "اداره الحسابات",
    permissions: [
      "ايقاف حسابات  المستخدمين",
      "ايقاف حسابات الموظفين",
      "ايقاف حسابات المشرفين",
      "ايقاف حسابات التنفيذيين",
      "تحديث البيانات الشخصيه",
      "تحديث بيانات المستخدمين ",
      "تحديث بيانات الموظفين ",
      "تحديث بيانات المشرفين ",
      "تحديث بيانات التنفيذيين ",
      "انشاء موظف",
    ],
  },
  {
    id: 6,
    permissionTitle: "اداره العمليات",
    permissions: [
      "اعاده اسناد المهام الوظيفيه للموظفين",
      "اعاده اسناد المهام الوظيفيه للمشرفين",
      "اعاده اسناد المهام الوظيفيه للتنفيذيين",
      "استقبال المهام",
      "تعيين مجموعات التابعه",
    ],
  },
  {
    id: 7,
    permissionTitle: "الاتصالات",
    permissions: [
      "التواصل مع الموظفين",
      " التواصل مع المشرفين ",
      " التواصل مع التنفيذيين ",
    ],
  },
  {
    id: 8,
    permissionTitle: "الوصول للبيانات",
    permissions: [
      "معاينه مجموعات العمل",
      "معاينه قطاعات التشغيل ",
      "معاينه المجالات و التخصصات ",
      "معاينه سجلات البرامج و الخدمات ",
      "معاينه فرق العمل",
      "معاينه حسابات  المستخدمين",
      "معاينه حسابات الموظفين",
      " معاينه حسابات المشرفين و سجلات النماذج",
      " معاينه حسابات التنفيذيين و سجلات النماذج",
      " معاينه حسابات التنفيذيين ",
      " معاينه المجموعات التابعه ",
      " معاينه السير الذاتيه ",
      " البحث في السير الذاتيه ",
    ],
  },
];

const PermissionBoard = ({ isEdit }) => {
  return (
    <div className="permission">
      <div className="permission__search">
        <h3> الصلاحيات </h3>
        <input type="text" placeholder="البحث عن صلاحية أو مهمة..." />
      </div>
      <form>
        <div className="permission__board">
          {permessions.map((group) => (
            <PermissionGroup
              key={group.id}
              title={group.permissionTitle}
              permissions={group.permissions}
              groupId={`group-${group.id}`}
            />
          ))}
        </div>
        <div className="col-12 p-2 ">
          <div className="buttons w-full justify-content-end ">
            <CustomButton color="secondary" size="large">
              الغاء
            </CustomButton>
            <CustomButton color="primary" size="large">
              {isEdit ? "تعديل" : "حفظ"}{" "}
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PermissionBoard;
