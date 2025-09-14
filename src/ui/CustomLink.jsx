import PropTypes from "prop-types";
import { Link } from "react-router";

const CustomLink = ({
  to,
  children,
  color = "primary",
  size = "medium",
  fullWidth = false,
  icon,
  iconPosition = "left",
  type = "default",
  className = "",
  ...props
}) => {
  const classNames = [
    "custom-link",
    `custom-link--${color}`,
    `custom-link--${size}`,
    fullWidth ? "custom-link--full" : "",
    type === "outlined" ? "custom-link--outlined" : "",
    className,
  ].join(" ");

  return (
    <Link to={to} className={classNames} {...props}>
      {icon && iconPosition === "left" && (
        <span className="link__icon">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="link__icon">{icon}</span>
      )}
    </Link>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "warning",
    "secondary-website",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  type: PropTypes.oneOf(["default", "outlined"]),
};

export default CustomLink;
