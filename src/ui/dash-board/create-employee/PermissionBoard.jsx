import { debounce } from "lodash";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import useGetPermissions from "../../../hooks/dashboard/shared/useGetPermissions";
import CustomButton from "../../CustomButton";
import InterestsLoading from "../../loading/InterestsLoading";
import PermissionGroup from "./PermissionGroup";
import useGetEmployee from "../../../hooks/dashboard/employee/useGetEmployee";
import useEditPermissions from "../../../hooks/dashboard/employee/useEditPermissions";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const PermissionBoard = ({ isEdit }) => {
  const { t } = useTranslation();
  const { permissions, isLoading } = useGetPermissions();
  const { employee, isLoading: isEmployeeLoading } = useGetEmployee();
  const { editPermissions, isPending } = useEditPermissions();
  const { handleSubmit, register } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const queryClient = useQueryClient();

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
    if (!permissions?.data || !employee?.data?.permissions) return [];

    return permissions.data.map((group) => {
      // Find matching employee group

      const empGroup = employee.data.permissions.find(
        (eg) => eg.id === group.id
      );

      return {
        ...group,
        permissions: group.permissions.map((perm) => {
          // Find matching employee permission
          const empPerm = empGroup?.permissions?.find((p) => p.id === perm.id);

          return {
            ...perm,
            active: empPerm?.is_taken ?? false,
          };
        }),
      };
    });
  }, [permissions, employee]);

  const onSubmit = (values) => {

    // convert object {1: true, 2:false,...} → only active IDs
    const activePermissions = Object.entries(values.permissions)
      .filter(([_, isChecked]) => isChecked === true)
      .map(([id]) => Number(id));

    const payload = {
      employee_id: employee.data.id,
      permissions: activePermissions,
    };

    editPermissions(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({ queryKey: ["dashboard-permissions"] });
        queryClient.refetchQueries({ queryKey: ["dashboard-permissions"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="permission__board">
          {isLoading
            ? [1, 2, 3].map((i) => <InterestsLoading key={i} />)
            : groupsWithActivePermissions?.map((group) => (
                <PermissionGroup
                  key={group.id}
                  title={group.title}
                  permissions={group.permissions}
                  groupId={`group-${group.id}`}
                  register={register}
                />
              ))}
        </div>
        <div className="col-12 p-2 ">
          <div className="buttons w-full justify-content-end ">
            <CustomButton loading={isPending} color="primary" size="large">
              {t("dashboard.permissions.update")}
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PermissionBoard;
