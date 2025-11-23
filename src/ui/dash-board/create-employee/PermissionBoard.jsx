import { debounce } from "lodash";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import useGetPermissions from "../../../hooks/dashboard/shared/useGetPermissions";
import CustomButton from "../../CustomButton";
import InterestsLoading from "../../loading/InterestsLoading";
import PermissionGroup from "./PermissionGroup";
import useGetEmployee from "../../../hooks/dashboard/employee/useGetEmployee";

const PermissionBoard = ({ isEdit }) => {
  const { t } = useTranslation();
  const { permissions, isLoading } = useGetPermissions();
  const { employee, isLoading: isEmployeeLoading } = useGetEmployee();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // --- Debounced search updater ---
  const updateSearchParam = useCallback(
    debounce((value) => {
      const params = {};

      if (value.trim() !== "") {
        params.search = value;
      }

      setSearchParams(params);
    }, 600),
    []
  );

  const onSearchInput = (e) => {
    updateSearchParam(e.target.value);
  };
  const groupsWithActivePermissions = useMemo(() => {
    if (!permissions?.data) return [];

    const employeePermissions = employee?.data?.permissions || [];

    return permissions.data.map((group) => ({
      ...group,
      permissions: group.permissions.map((perm) => ({
        key: perm,
        label: perm,
        active: employeePermissions.includes(perm),
      })),
    }));
  }, [permissions, employee]);

  return (
    <div className="permission">
      <div className="permission__search">
        <h3>{t("dashboard.permissions.title")}</h3>
        <input
          type="text"
          defaultValue={search}
          onChange={onSearchInput}
          placeholder={t("dashboard.permissions.searchPlaceholder")}
        />
      </div>
      <form>
        <div className="permission__board">
          {isLoading
            ? [1, 2, 3].map((i) => <InterestsLoading key={i} />)
            : permissions?.data?.map((group) => (
                <PermissionGroup
                  key={group.id}
                  title={group.title}
                  permissions={groupsWithActivePermissions}
                  groupId={`group-${group.id}`}
                />
              ))}
        </div>
        <div className="col-12 p-2 ">
          <div className="buttons w-full justify-content-end ">
            <CustomButton color="primary" size="large">
              {t("dashboard.permissions.update")}
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PermissionBoard;
