import { useSelector } from "react-redux";
import { Link } from "react-router";
import EmptySection from "../../EmptySection";
import { useTranslation } from "react-i18next";

const WorkingGroups = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.adminAuth);

  return (
    <>
      {user?.shared_groups.length > 0 ? (
        <ul className="permission-list">
          {user?.shared_groups?.map((group, index) => (
            <li className="permission-list__item" key={index}>
              <i className="fa-solid fa-badge-check permission-list__icon"></i>
              <Link
                to={`/dashboard/working-group/${group?.id}`}
                className="permission-list__label group"
              >
                {group?.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptySection message={t("dashboard.noSharedGroups")} />
      )}
    </>
  );
};

export default WorkingGroups;
