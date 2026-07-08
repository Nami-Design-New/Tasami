import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import avatarPlaceholder from "../../assets/images/dashboard/avatar-placeholder.jpg";
import useCreateChatRoom from "../../hooks/dashboard/chats/useCreateChatRoom";
import useGetEmployeeSummary from "../../hooks/dashboard/employee/useGetEmployeeSummary";
import { setChat } from "../../redux/slices/chatSlice";
import CustomButton from "../../ui/CustomButton";
import CustomLink from "../../ui/CustomLink";
import EmptySection from "../../ui/EmptySection";
import Loading from "../../ui/loading/Loading";
import PageHeader from "../../ui/PageHeader";

const getValue = (...values) => values.find((value) => value) || "-";

const getTitle = (value) => {
  if (!value) return "-";
  if (typeof value === "string") return value;
  return value.title || value.name || "-";
};

const getEmployee = (response) =>
  response?.data || response?.employee || response?.employee_summary || {};

const getFullName = (employee) =>
  getValue(
    employee?.full_name,
    employee?.name,
    [employee?.first_name, employee?.family_name].filter(Boolean).join(" "),
  );

const canViewFullDetails = (employee) =>
  Boolean(
    employee?.can_view_full_details ||
      employee?.can_view_details ||
      employee?.canViewFullDetails,
  );

const EmployeeSummaryField = ({ label, value }) => (
  <div className="employee-summary__field">
    <span>{label}</span>
    <strong>{value || "-"}</strong>
  </div>
);

const EmployeeSummary = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createChatRoom, isPending } = useCreateChatRoom();
  const { employeeSummary, isError, isLoading } = useGetEmployeeSummary();

  const employee = useMemo(() => getEmployee(employeeSummary), [employeeSummary]);
  const group = useMemo(() => employee?.group || {}, [employee?.group]);
  const canOpenFullDetails =
    canViewFullDetails(employee) || canViewFullDetails(employeeSummary);

  const fields = useMemo(
    () => [
      {
        label: t("dashboard.employeeProfile.employeeData.description"),
        value: getValue(employee?.job_title, employee?.jobTitle),
      },
      {
        label: t("dashboard.employeeProfile.employeeData.account"),
        value: employee?.code,
      },
      {
        label: t("dashboard.employeeProfile.employeeData.idNumber"),
        value: employee?.id_number,
      },
      {
        label: t("dashboard.employeeProfile.employeeData.groupNumber"),
        value: getValue(group?.name, employee?.group_number),
      },
      {
        label: t("dashboard.employeeProfile.employeeData.region"),
        value: getTitle(getValue(group?.region, employee?.region)),
      },
      {
        label: t("dashboard.employeeProfile.employeeData.location"),
        value: getTitle(getValue(group?.country, group?.sector, employee?.country)),
      },
      {
        label: t("dashboard.employeeProfile.employeeData.city"),
        value: getTitle(getValue(group?.city, employee?.city)),
      },
      {
        label: t("dashboard.employeeProfile.employeeData.hireDate"),
        value: getValue(employee?.hire_date, employee?.created_at),
      },
      {
        label: t("dashboard.employeeProfile.employeeData.accountStatus"),
        value: employee?.status
          ? t(`userAccountsStatus.${employee.status}`, employee.status)
          : "-",
      },
      {
        label: t("dashboard.employeeProfile.employeeData.accountStatusDate"),
        value: employee?.status_date,
      },
      {
        label: t("dashboard.employeeProfile.employeeData.accountStatusTime"),
        value: employee?.status_time,
      },
    ],
    [employee, group, t],
  );

  const handleCreateChatRoom = () => {
    createChatRoom(
      { chater_id: id, chater_type: "employee" },
      {
        onSuccess: (res) => {
          dispatch(setChat(res.data));
          localStorage.setItem("chatId", res.data.id);
          navigate(`/dashboard/chats?chaterId=${id}&chatId=${res?.data?.id}`);
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      },
    );
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <EmptySection
        message={t("dashboard.employeeSummary.unavailable")}
      />
    );
  }

  return (
    <section className="employee-summary">
      <PageHeader
        name={t("dashboard.employeeSummary.title")}
        removeLast
      />

      <div className="row g-3">
        <div className="col-12 col-lg-3">
          <aside className="employee-summary__profile">
            <div className="employee-summary__cover" />
            <img
              src={employee?.image || avatarPlaceholder}
              alt={getFullName(employee)}
              className="employee-summary__avatar"
            />
            <div className="employee-summary__profile-body">
              <h2>{getFullName(employee)}</h2>
              <p>{getValue(employee?.role?.title, employee?.role, "-")}</p>
              <strong>{employee?.code || "-"}</strong>

              <div className="employee-summary__contact-info">
                <span>
                  <i className="fa-solid fa-envelope"></i>
                  {employee?.email || "-"}
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                  {getTitle(getValue(employee?.country_id, employee?.country))}
                </span>
              </div>
            </div>

            <div className="employee-summary__actions">
              <CustomButton
                fullWidth
                loading={isPending}
                onClick={handleCreateChatRoom}
                size="large"
              >
                {t("dashboard.employeeSummary.contact")}
              </CustomButton>

              {canOpenFullDetails ? (
                <CustomLink
                  color="secondary"
                  fullWidth
                  size="large"
                  to={`/dashboard/employee-details/${id}`}
                >
                  {t("dashboard.employeeSummary.fullDetails")}
                </CustomLink>
              ) : (
                <CustomButton color="secondary" disabled fullWidth size="large">
                  {t("dashboard.employeeSummary.fullDetails")}
                </CustomButton>
              )}
            </div>
          </aside>
        </div>

        <div className="col-12 col-lg-9">
          <div className="employee-summary__details">
            <h3>
              {t("dashboard.employeeProfile.employeeData.title")}
            </h3>
            <div className="row">
              {fields.map((field) => (
                <div className="col-12 col-md-6 col-xxl-4 p-2" key={field.label}>
                  <EmployeeSummaryField
                    label={field.label}
                    value={field.value}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeSummary;
