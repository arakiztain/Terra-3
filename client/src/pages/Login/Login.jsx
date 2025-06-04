import styles from "./Login.module.css";
import { useState, useContext } from "react";
// import { getUserInfo, loginFetch } from "../utils/fetchServer.js";
import icon4 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon5 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon6 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";
import { AuthContext } from "../../context/AuthContext.jsx";
import fetchServer from "../../utils/fetchServer";

const Login = () =>{
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const [userData, setUserData] = useState({
      email: "",
      password: "",
    });

    const { onLogin } = useContext(AuthContext);
    
    const handleUserPassword = (event) => {
      const newPassword = event.target.value;
      const newState = { ...userData, password: newPassword };
      setUserData(newState);
    };

    const handleUserEmail = (event) => {
      const newEmail = event.target.value;
      const newState = { ...userData, email: newEmail };
      setUserData(newState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchServer.loginFetch({email: email, password: password});
    }

    return(
        <div className={styles.fullscreen}>
            <div className={styles.formGrid}>
                <div className={styles.formWrapper}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <input className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="" type="email" name="email" required />
                            <label className={styles.label}>Email</label>
                        </div>
                        <div className={styles.field}>
                            <input className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="" type="password" name="password" required />
                            <label className={styles.label}>Password</label>
                        </div>
                        <button className={styles.formButton} type="submit">Log in!</button>
                    </form>
                </div>
            <div className={styles.terraformBottom}>
                <img src={icon4} className="icon" />
                <img src={icon5} className="icon" />
                <img src={icon6} className="icon" />
            </div>
            </div>
            <div className={styles.lettering}>
                <h1 className={styles.hello}>Hello</h1>
                <h1 className={styles.again}>again!</h1>
            </div>
        </div>
      </div>
    );
}

export default Login;