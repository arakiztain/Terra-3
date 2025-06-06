import "./Login.css";
import { useState, useContext } from "react";
import icon4 from "../../assets/_Terraforms/Individual/SVG/Melos-Blue.svg";
import icon5 from "../../assets/_Terraforms/Individual/SVG/Punky-Lime.svg";
import icon6 from "../../assets/_Terraforms/Individual/SVG/Boba-Orange.svg";
import { AuthContext } from "../../context/AuthContext";
import TourLogin from "../../components/TourLogin/TourLogin";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { onLogin } = useContext(AuthContext);

  const handleUserPassword = (event) => {
    const newPassword = event.target.value;
    const newState = { ...userData, password: newPassword };
    setUserData(newState);
  };

  const handleUserEmail = (event) => {
    const newEmail = event.target.value;
    const newState = { ...userData, email: newEmail };
    setUserData(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(userData.email, userData.password);
  };

  return (
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
                onChange={handleUserPassword}
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
      </div>
      <TourLogin />
    </div>
  );
};

export default Login;
