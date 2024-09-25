import "./styled.scss"

const Button = ({placeholder, click, submit = false, styled=false, width="fit-content"}) => {
    return <button style={{minWidth: width}} className={!styled && "custom-btn"} type={submit ? "submit" : "button"} onClick={click}>{placeholder}</button>;
}
 
export default Button;