import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import useAdminPermissions from "../../../hooks/auth/dashboard/useAdminPermissions";
import useEditPermissions from "../../../hooks/dashboard/employee/useEditPermissions";
import useGetEmployee from "../../../hooks/dashboard/employee/useGetEmployee";
import useGetPermissions from "../../../hooks/dashboard/shared/useGetPermissions";
import { DASHBOARD_PERMISSIONS } from "../../../utils/dashboardPermissions";
import CustomButton from "../../CustomButton";
import InterestsLoading from "../../loading/InterestsLoading";
import PermissionGroup from "./PermissionGroup";

const getSelectedPermissionIds = (permissionGroups = []) =>
  new Set(
    permissionGroups.flatMap((group) =>
      (group.permissions || [])
        .filter((permission) => permission.is_taken)
        .map((permission) => permission.id),
    ),
  );

const PermissionEditor = ({
  groups,
  employeeId,
  employeePermissions,
  canEditPermissions,
  editPermissions,
  isPending,
  queryClient,
  t,
}) => {
  const [selectedPermissionIds, setSelectedPermissionIds] = useState(() =>
    getSelectedPermissionIds(employeePermissions),
  );

  const togglePermission = (permissionId) => {
    setSelectedPermissionIds((current) => {
      const next = new Set(current);

      if (next.has(permissionId)) {
        next.delete(permissionId);
      } else {
        next.add(permissionId);
      }

      return next;
    });
  };

  const toggleGroupPermissions = (permissionIds, shouldSelect) => {
    setSelectedPermissionIds((current) => {
      const next = new Set(current);

      permissionIds.forEach((permissionId) => {
        if (shouldSelect) {
          next.add(permissionId);
        } else {
          next.delete(permissionId);
        }
      });

      return next;
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    editPermissions(
      {
        employee_id: employeeId,
        permissions: Array.from(selectedPermissionIds),
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.invalidateQueries({
            queryKey: ["dashboard-employee-details", employeeId],
          });
          queryClient.invalidateQueries({
            queryKey: ["dashboard-permissions"],
          });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="permission__board">
        {groups.map((group) => (
          <PermissionGroup
            key={group.id}
            title={group.title}
            permissions={group.permissions}
            selectedPermissionIds={selectedPermissionIds}
            onTogglePermission={togglePermission}
            onToggleAll={toggleGroupPermissions}
          />
        ))}
      </div>

      {canEditPermissions && (
        <div className="col-12 p-2 ">
          <div className="buttons w-full justify-content-end ">
            <CustomButton loading={isPending} color="primary" size="large">
              {t("dashboard.permissions.update")}
            </CustomButton>
          </div>
        </div>
      )}
    </form>
  );
};

const PermissionBoard = () => {
  const { t } = useTranslation();
  const { hasPermission } = useAdminPermissions();
  const canEditPermissions = hasPermission(
    DASHBOARD_PERMISSIONS.PERMISSIONS_EDIT,
  );
  const { permissions, isLoading } = useGetPermissions();
  const { employee, isLoading: isEmployeeLoading } = useGetEmployee();
  const { editPermissions, isPending } = useEditPermissions();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const queryClient = useQueryClient();

  const updateSearchParam = useMemo(
    () =>
      debounce((value) => {
        const params = {};

        if (value.trim() !== "") {
          params.search = value;
        }

        setSearchParams(params);
      }, 600),
    [setSearchParams],
  );

  useEffect(
    () => () => {
      updateSearchParam.cancel();
    },
    [updateSearchParam],
  );

  const onSearchInput = (event) => {
    updateSearchParam(event.target.value);
  };

  if (isLoading || isEmployeeLoading) return <InterestsLoading />;

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

      <PermissionEditor
        key={employee.data.id}
        groups={permissions?.data || []}
        employeeId={employee.data.id}
        employeePermissions={employee.data.permissions}
        canEditPermissions={canEditPermissions}
        editPermissions={editPermissions}
        isPending={isPending}
        queryClient={queryClient}
        t={t}
      />
    </div>
  );
};

export default PermissionBoard;
