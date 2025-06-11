import styles from "./Login.module.css";
import { useState, useContext } from "react";
import icon4 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon5 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon6 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const notify = () => 
    toast('❌ Unknown credentials', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      className: styles.toast
    });
  const { onLogin } = useContext(AuthContext);

  const handleUserPassword = (event) => {
    setUserData({ ...userData, password: event.target.value });
  };

  const handleUserEmail = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResult = await onLogin(userData.email, userData.password);
    if(loginResult !== null) notify();
  };

  return (
    <div className={styles.fullscreen}>
      <div className={styles.formGrid}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <input
                className={styles.input}
                placeholder=" "
                type="email"
                name="email"
                value={userData.email}
                onChange={handleUserEmail}
                required
              />
              <label className={styles.label}>Email</label>
            </div>
            <div className={styles.field}>
              <input
                className={styles.input}
                placeholder=" "
                type="password"
                name="password"
                value={userData.password}
                onChange={handleUserPassword}
                required
              />
              <label className={styles.label}>Password</label>
            </div>
            <button className={styles.formButton} type="submit">
              Log in!
            </button>
          </form>
        </div>
        <div className={styles.terraformBottom}>
          <img src={icon4} alt="" />
          <img src={icon5} alt="" />
          <img src={icon6} alt="" />
        </div>
      </div>
      <div className={styles.lettering}>
        <h1 className={styles.hello}>Hello</h1>
        <h1 className={styles.again}>again!</h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
