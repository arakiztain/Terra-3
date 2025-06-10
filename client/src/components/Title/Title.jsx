import styles from './Title.module.css';
import icon1 from "../../assets/_Terraforms/Individual/SVG/Punky-Green.svg";
import icon2 from "../../assets/_Terraforms/Individual/SVG/Mistyk-Blue.svg";
import icon3 from "../../assets/_Terraforms/Individual/SVG/Melos-Pink.svg";
const Title = () =>{
    return(
        <div className={styles.title}>
            <img src={icon1} className={styles.icon} />
            <img src={icon2} className={styles.icon} />
            <img src={icon3} className={styles.icon} />
            <span>terra ripple</span>
        </div>
    )
}
export default Title;