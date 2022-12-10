import "./login.css";
import { useRef, useContext } from "react";
import { loginCall } from "../../auth";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    
  };

  const handleCreate = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">OGreen</h3>
          <span className="loginDesc">
            Create and share experiences with your friends to help the planet!
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form className="loginBox" onSubmit={handleClick}>
              <input placeholder="Email" type="email" required className="loginInput" ref={email} />
              <input placeholder="Password" type="password" required minLength="8" className="loginInput" ref={password} />
              <button className="loginButton" type="submit" disabled={isFetching}>
                {isFetching ? "Loading..." : "Log In"}
              </button>
            </form>
            <Link to="/forgotpassword" className="loginForgot">
              <span className="loginForgot">Forgot Password?</span>
            </Link>
            <button className="loginRegisterButton" onClick={handleCreate}>
              {isFetching ? "Loading..." : "Create a New Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
