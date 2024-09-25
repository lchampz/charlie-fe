import './styled.scss'

const PageWrapper = ({children, bgColor, column = false}) => {
    return ( <div style={{ backgroundColor: bgColor, flexDirection: column && "column"}} className="page-wrapper">{children}</div> );
}
 
export default PageWrapper;