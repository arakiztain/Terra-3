import styles from './Title.module.css';
import { Link } from "react-router-dom";
import icon1 from "../../assets/_Terraforms/Individual/SVG/Punky-Green.svg";
import icon2 from "../../assets/_Terraforms/Individual/SVG/Mistyk-Blue.svg";
import icon3 from "../../assets/_Terraforms/Individual/SVG/Melos-Pink.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Title = () => {
    const { userData } = useContext(AuthContext);

    return (
        userData ? (
        <Link to={userData.role === "admin" ? "/admin" : "/dashboard"} >
            <div className={styles.title}>
                <img src={icon1} className={styles.icon} />
                <img src={icon2} className={styles.icon} />
                <img src={icon3} className={styles.icon} />
                <span className={styles.textTitle}>terra ripple</span>
            </div>
            </Link>
        ) : (
            <div className={styles.title}>
                <img src={icon1} className={styles.icon} />
                <img src={icon2} className={styles.icon} />
                <img src={icon3} className={styles.icon} />
                <span className={styles.textTitle}>terra ripple</span>
            </div>
        )
    )
}
export default Title;