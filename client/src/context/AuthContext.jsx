import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { saveToken, removeToken } from "../utils/localStorage";
import fetchServer from "../utils/fetchServer.js";

// Envuelve la app con los datos del usuario logeado
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();


    useEffect(()=>{
        handleGetUserInfo();
    },[])

    const handleGetUserInfo= async()=>{
        const result = await fetchServer.getUserInfo();
        if(result.user){
            setUserData(result.user);
        }
    }

    const handleLogin = async (email, password) => {
        const result = await fetchServer.loginFetch({ email, password });
        if (result.error) {
            // removeToken();
            return result.error;
        } else {
            setUserData(result.user);
            // saveToken(result.token);
            if (result.user.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/dashboard");
            }
            return null;
        }
    }

    const handleLogout = () => {
        // removeToken(); // borrar token del localStorage
        // logout(); //borrar cookie que el backend guarda del token
        setUserData(null); //borrar datos de sesion del usuario
        navigate("/", { replace: true } ); // replace impide que se pueda volver a la pagina de login o de logout
    }; 

    
    return (
        <AuthContext.Provider value={{ userData: userData, setUserData, onLogin: handleLogin, onLogout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };