import PropTypes from "prop-types";

const CustomButton = ({
  children,
  color = "primary",
  size = "medium",
  fullWidth = false,
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props
}) => {
  const classNames = [
    "custom-btn",
    `custom-btn--${color}`,
    `custom-btn--${size}`,
    fullWidth ? "custom-btn--full" : "",
    loading ? "btn--loading" : "",
  ].join(" ");

  return (
    <button className={classNames} disabled={disabled || loading} {...props}>
      {" "}
      {loading && <i className="fas fa-spinner fa-spin btn__spinner" />}
      {!loading && icon && iconPosition === "left" && (
        <span className="btn__icon">{icon}</span>
      )}
      {children}{" "}
      {!loading && icon && iconPosition === "right" && (
        <span className="btn__icon">{icon}</span>
      )}
    </button>
  );
};

CustomButton.propTypes = {
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
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CustomButton;
