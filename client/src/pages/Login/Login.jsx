import styles from "./Login.module.css";
import { useState, useContext } from "react";
import icon4 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon5 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon6 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";
import { AuthContext } from "../../context/AuthContext";
import TourLogin from "./TourLogin";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { onLogin } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userData:", userData);
    await onLogin( userData);
  };

  return (

    <div className={styles.fullscreen}>
      <div className={styles.formGrid}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.formLogin}>
            <div className={styles.field}>
              <input
                id="login__input-email"
                className={styles.input}
                onChange={(e) => handleChange(e)}
                value={userData.email}
                placeholder=""
                type="email"
                name="email"
                required
              />
              <label className={styles.shyLabel}>Email</label>
            </div>
            <div className={styles.field}>
              <input
                id="login__input-password"
                className={styles.input}
                onChange={(e) => handleChange(e)}
                value={userData.password}
                placeholder=""
                type="password"
                name="password"
                required
              />
              <label className={styles.shyLabel}>Password</label>
            </div>
            <button id="login__button" className={styles.button} type="submit">
              Log in!
            </button>
          </form>
        </div>
        <div className={styles.terraformBottom}>
          <img src={icon4} className={styles.icon} />
          <img src={icon5} className={styles.icon} />
          <img src={icon6} className={styles.icon} />
        </div>
      </div>
      <div className={styles.lettering}>
        <h1>Hello</h1> 
        <h1>again!</h1> 
      </div>
      <TourLogin />
    </div >
  
  );
};

export default Login;
