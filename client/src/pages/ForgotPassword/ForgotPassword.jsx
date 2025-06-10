import styles from "./ForgotPassword.module.css";
import fetchServer from "../../utils/fetchServer";
import { useState } from "react";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchServer.resetFetch({ email });
    }
    
    // router.post("/reset-password",authController.resetPassword);

    return(
        <div className={styles.fullscreen}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3>Forgot your password?</h3>
                <h3>We will send you an email with a reset link</h3>
                <label htmlFor="email">Password: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ForgotPassword