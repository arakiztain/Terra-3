import styles from "./PasswordReset.module.css";

const PasswordReset = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Keepo");    
    }

    return(
        <div className={styles.fullscreen}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3>Reset password form</h3>
                <label htmlFor="password">Password: </label>
                <input type="password" />
                <label htmlFor="password">Repeat password: </label>
                <input type="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PasswordReset