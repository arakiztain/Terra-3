import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Keepo");    
    }

    return(
        <div className={styles.fullscreen}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3>Forgot your password?</h3>
                <h3>We will send you an email with a reset link</h3>
                <label htmlFor="email">Password: </label>
                <input type="email" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ForgotPassword