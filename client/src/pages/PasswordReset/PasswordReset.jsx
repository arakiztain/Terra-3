import styles from "./PasswordReset.module.css";
import { useState } from "react";
import { useParams } from 'react-router-dom';

import fetchServer from "../../utils/fetchServer";
const PasswordReset = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password==repeatPassword){
            fetchServer.setPassword({ password, token });
        }else{
            alert("Passwords do not match");
        }
    }

    return(
        <div className={styles.fullscreen}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3>Reset password form</h3>
                <label htmlFor="password">Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="password">Repeat password: </label>
                <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PasswordReset