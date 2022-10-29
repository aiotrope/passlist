import "../styles.css";

export const Notification = ({ error, success }) => {
  if (error === null) {
    return null;
  } else if (success === null) {
    return null;
  } else if (success) {
    return <div className="success">{success}</div>;
  } else if (error) {
    return <div className="error">{error}</div>;
  } else {
    return null;
  }
};
