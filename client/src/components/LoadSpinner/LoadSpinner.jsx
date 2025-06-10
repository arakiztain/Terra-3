import spinner from '../../assets/icons/terraforms.gif';
import styles from './LoadSpinner.module.css'
const LoadSpinner = ({ size }) => {
    if (size=="small" || size==undefined){
        return <img src={spinner} alt="loading" className={`${styles.spinner} ${styles[size] || ''}`}/>
    } 
    else if(size=="fullscreen"){
        return (
            <div className={styles.overlay}>
                <img
                    src={spinner}
                    alt="loading"
                    className={`${styles.spinner} ${styles[size] || ''}`}
                />
            </div>
        );
    }
};
export default LoadSpinner