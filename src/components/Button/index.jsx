import "./styled.scss"

const Button = ({placeholder, click, submit = false, styled=false, width="fit-content", padding, link}) => {
    return <button style={{width: width, padding: padding}} className={link ? "custom-link" : !styled && "custom-btn"} type={submit ? "submit" : "button"} onClick={click}>{placeholder}</button>;
}
 
export default Button;