import Button from ".";

const AlternativeButton = (props) => {
    return ( <div className="alternative-btn">
        
        <Button alternative {...props}/>
        <span className="bite">
            <div className="circle"></div>
            <div className="circle"></div>
        </span>
        
    </div> );
}
 
export default AlternativeButton;