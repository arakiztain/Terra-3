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
    await onLogin(userData.email, userData.password);
  };

  return (
    <div className={styles.fullscreen}>
      <div className={styles.formGrid}>
          <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.field}>
                      <input id="login__input-email" className={styles.input} onChange={(e) => handleChange(e)} value={userData.email} placeholder="" type="email" name="email" required />
                      <label className={styles.label}>Email</label>
                  </div>
                  <div className={styles.field}>
                      <input id="login__input-password" className={styles.input} onChange={(e) => handleChange(e)} value={userData.password} placeholder="" type="password" name="password" required />
                      <label className={styles.label}>Password</label>
                  </div>
                  <button id="login__button" className={styles.formButton} type="submit">Log in!</button>
              </form>
          </div>
      <div className={styles.terraformBottom}>
          <img src={icon4} className="icon" />
          <img src={icon5} className="icon" />
          <img src={icon6} className="icon" />
      </div>
      </div>
      <div className={styles.lettering}>
          <h1 className={styles.hello}>Hello</h1>
          <h1 className={styles.again}>again!</h1>
      </div>

      {/* Tour */}
      <TourLogin />
    </div>
  );
};

export default Login;

/* HTML PARA LOGIN.CSS STANDARD

<div className="login">
<div className="login__form-grid">
  <div className="login__form-wrapper">
    <form onSubmit={handleSubmit} className="login__form">
      <div className="login__field">
        <input
          className="login__input-email"
          placeholder=""
          type="email"
          name="email"
          onChange={handleUserEmail}
          required
        />
        <label className="login__label">Email</label>
      </div>
      <div className="login__field">
        <input
          className="login__input-password"
          placeholder=""
          type="password"
          name="password"
          onchange={handleUserPassword}
          required
        />
        <label className="login__label">Password</label>
      </div>
      <button className="login__button" type="submit">
        Log in!
      </button>
    </form>
  </div>
  <div className="login__terraform">
    <img src={icon4} className="icon" />
    <img src={icon5} className="icon" />
    <img src={icon6} className="icon" />
  </div>
</div>
<div className="login__lettering">
  <h1 className="login__hello">Hello</h1>
  <h1 className="login__again">again!</h1>
</div> */