import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== repeatPassword.current.value) {
      repeatPassword.current.setCustomValidity("Passwords don't match!");
    }
    else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">OGreen</h3>
          <span className="loginDesc">
            Create and share experiences with your friends while helping the planet!
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form className="loginBox" onSubmit={handleClick}>
              <input placeholder="Username" required ref={username} className="loginInput" />
              <input placeholder="Email" required ref={email} type="email" className="loginInput" />
              <input placeholder="Password" required ref={password} type="password" minLength="8" className="loginInput" />
              <input placeholder="Repeat Password" required ref={repeatPassword} type="password" minLength="8" className="loginInput" />
              <button className="loginButton" type="submit">{isFetching ? "Loading..." : "Create Account"}</button>
            </form>
            <button className="loginRegisterButton" onClick={handleLogin}>
            {isFetching ? "Loading..." : "Log Into Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
