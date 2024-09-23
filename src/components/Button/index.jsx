const Button = ({placeholder, click}) => {
    return <button type="button" onClick={click}>{placeholder}</button>;
}
 
export default Button;