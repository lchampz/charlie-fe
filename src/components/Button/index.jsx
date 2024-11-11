/* eslint-disable react/prop-types */
import "./styled.scss";

const Button = ({
  placeholder,
  click,
  submit = false,
  width = "fit-content",
  padding,
  link = false,
  alternative = false,
  borderRadius,
  margin
}) => {
  let buttonClass = "custom-btn";

  if (link) {
    buttonClass = "custom-link";
  } else if (!link && alternative) {
    buttonClass = "custom-btn " + "alternative";
  }

  return (
    <button
      style={{ width, padding, borderRadius, margin}}
      className={buttonClass}
      type={submit ? "submit" : "button"}
      onClick={click}
    >
      {placeholder}
    </button>
  );
};

export default Button;
