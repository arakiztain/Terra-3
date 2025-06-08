import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchServer from "../utils/fetchServer.js";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        console.log("Hellouses");
        console.log("mail and pass", email, password);
        const result = await fetchServer.loginFetch({ email, password });
        if (result.error) {
            return result.error;
        } else {
            localStorage.setItem("token", result.token);
            setUserData({user: result.user, token: result.token});
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
        <AuthContext.Provider value={{ userData: userData, setUserData, onLogin: handleLogin, onLogout: handleLogout  }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };