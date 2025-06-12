import styles from "./PasswordReset.module.css";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import fetchServer from "../../utils/fetchServer";
const PasswordReset = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password==repeatPassword){
            fetchServer.setPassword({ password, token });
            navigate("/");
        }else{
            alert("Passwords do not match");
        }

    }

    return(
        <div className={styles.fullscreen}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3>Set your password</h3>
                <label htmlFor="password">Password: </label>
                <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="password">Repeat password: </label>
                <input className={styles.input} type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PasswordReset