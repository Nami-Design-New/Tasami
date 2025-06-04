import { Link, useLocation } from "react-router";
import { ROLE_REDIRECTS } from "../utils/constants";

export default function PageNotFound() {
  const location = useLocation();

  const roleRedirectPath = Object.values(ROLE_REDIRECTS).find((path) =>
    location.pathname.startsWith(path)
  );

  const roleKey = Object.keys(ROLE_REDIRECTS).find(
    (key) => ROLE_REDIRECTS[key] === roleRedirectPath
  );
  return (
    <div className="error-page">
      <div className="container">
        <img src="/sys-icons/notFound.svg" alt="404 Not Found" />

        <h1 className="error-title">Oops! Page Not Found (404)</h1>

        <p className="error-description">
          We couldn&apos;t find the page you&apos;re looking for. It might have
          been moved, deleted, or never existed.
        </p>

        <Link to={roleRedirectPath || "/"} className="button">
          Return to{" "}
          {roleKey
            ? `${roleKey.charAt(0).toUpperCase() + roleKey.slice(1)}`
            : "Homepage"}
        </Link>
      </div>
    </div>
  );
}
