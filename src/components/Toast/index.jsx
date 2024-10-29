import React from "react";
import Warning from "../../assets/warning-icon.png";
import Info from "../../assets/info-icon.png";
import Success from "../../assets/check-icon.png";
import "./styled.scss";

const Toast = ({ role = "info", message, isVisible }) => {
  const getIcon = () => {
    switch (role) {
      case "info":
        return <img src={Info} alt="img-toast" />;
      case "fail":
        return <img src={Warning} alt="img-toast" />;
      case "success":
        return <img src={Success} alt="img-toast" />;
      default:
        return null;
    }
  };

  return (
    <div
      role={role}
      className={`toast-container ${role} ${isVisible ? "toast--visible" : ""}`}
    >
      {getIcon()}
      <span className="toast-msg">{message}</span>
    </div>
  );
};

export default Toast;
