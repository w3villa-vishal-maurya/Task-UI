import { createContext, useState } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    let [auth, setAuth] = useState({});
    const cookies = new Cookies();

    //  auth = JSON.parse(sessionStorage.getItem("email"))

    auth = cookies.get("email");
    // console.log(auth.accessToken);

     const [currentComponent, setCurrentComponent] = useState()
     const [isLogin, setIsLogin] = useState(auth?.email ? true : false);
    
   
    return (
        <AuthContext.Provider value={{ auth, setAuth,currentComponent, setCurrentComponent, isLogin,  setIsLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;