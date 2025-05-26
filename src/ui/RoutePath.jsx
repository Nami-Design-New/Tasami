import { Link } from "react-router";
import { Fragment } from "react";
import useGetRouteName from "../hooks/shared/useGetRouteName";
import { useTranslation } from "react-i18next";

export default function RoutePath({ currentName, hint, removeLast }) {
  const { routes } = useGetRouteName();
  const filteredRoutes = routes.slice(
    0,
    removeLast ? routes.length - 1 : routes.length
  );
  const { t } = useTranslation();

  return (
    <div className="route_path">
      {filteredRoutes.map((route, i) => {
        const isLast = i === filteredRoutes.length - 1;
        return (
          <Fragment key={route.name}>
            <Link className={isLast ? "pe-none disabled" : ""} to={route.to}>
              {isLast && currentName
                ? t(`pageHeaders.${currentName}`)
                : t(`pageHeaders.${route.name}`)}
            </Link>
            {!isLast && <span> / </span>}
          </Fragment>
        );
      })}
      {hint && <small> {hint}</small>}
    </div>
  );
}
