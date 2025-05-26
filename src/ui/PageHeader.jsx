import { useTranslation } from "react-i18next";
import useGetRouteName from "../hooks/shared/useGetRouteName";
import RoutePath from "./RoutePath";

export default function PageHeader({ name, hint, currentName, removeLast }) {
  const { capitalizedRoutes } = useGetRouteName();
  const currentRoute = capitalizedRoutes[capitalizedRoutes.length - 1];
  const { t } = useTranslation();
  return (
    <div className="page_header">
      <h1 className="">{name || t(`pageHeaders.${currentRoute}`)}</h1>
      <RoutePath
        removeLast={removeLast}
        currentName={currentName}
        hint={hint || ""}
      />
    </div>
  );
}
