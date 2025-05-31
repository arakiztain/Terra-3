import styles from "./Login.module.css";

import icon4 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon5 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon6 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";

const Login = () =>{
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("clickity click");
    }

    return(
        <div className={styles.fullscreen}>
            <div className={styles.formGrid}>
                <div className={styles.formWrapper}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div class={styles.field}>
                            <input className={styles.input} placeholder="" type="email" name="email" required />
                            <label className={styles.label}>Email</label>
                        </div>
                        <div class={styles.field}>
                            <input className={styles.input} placeholder="" type="password" name="password" required />
                            <label className={styles.label}>Password</label>
                        </div>
                        <button className={styles.formButton} type="submit">Log in!</button>
                    </form>
                </div>
            </div>
            <div className={styles.lettering}>
                <h1 class={styles.hello}>Hello</h1>
                <h1 class={styles.again}>again!</h1>
                <div className={styles.terraformBottom}>
                    <img src={icon4} className="icon" />
                    <img src={icon5} className="icon" />
                    <img src={icon6} className="icon" />
                </div>
            </div>
        </div>
    )
}

export default Login;