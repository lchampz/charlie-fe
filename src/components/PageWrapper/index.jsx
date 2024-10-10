import './styled.scss'

const PageWrapper = ({children, bgColor, column = false, id}) => {
    return ( <div id={id ?? ""} style={{ backgroundColor: bgColor, flexDirection: column && "column"}} className="page-wrapper">{children}</div> );
}
 
export default PageWrapper;