import React from "react";
import "./styled.scss";

const Button = ({
  placeholder,
  click,
  submit = false,
  width = "fit-content",
  padding,
  link = false,
  alternative = false,
}) => {
    
  let buttonClass = "custom-btn";

  
    if (link) {
      buttonClass = "custom-link";
    } else if (!link && alternative) {
      buttonClass = "custom-btn " + alternative;
    }
  

  return (
    <button
      style={{ width, padding }}
      className={buttonClass}
      type={submit ? "submit" : "button"}
      onClick={click}
    >
      {placeholder}
    </button>
  );
};

export default Button;
