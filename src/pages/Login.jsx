import { useState } from "react";

import Input from "../components/Input";

const Login = () => {
    const [pass, setPass] = useState("");

    const handleChange = (text) => {
        setPass(text);
    }

    return ( <>
       <form>
         <Input placeholder={"senha"} key={123} value={pass} password change={handleChange}/>
       
       </form>
       
    </> );
}
 
export default Login;