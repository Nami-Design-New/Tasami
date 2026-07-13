import PropTypes from "prop-types";

export default function ApiErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="alert alert-danger" role="alert" aria-live="assertive">
      {message}
    </div>
  );
}

ApiErrorAlert.propTypes = {
  message: PropTypes.string,
};

