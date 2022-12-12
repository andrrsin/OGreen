import "./login.css";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {



  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        
      await login(inputs);
      navigate("/")
    } catch (err) {
      setErr(err.response.data);
    }
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
            <form className="loginBox">
              <input placeholder="Email" type="email" required className="loginInput"  name = "email" onChange={handleChange} />
              <input placeholder="Password" type="password" required minLength="8" className="loginInput" name = "password" onChange={handleChange} />
              {err ? <span className="loginErr">{err}</span> : null}
              <button className="loginButton" type="submit" onClick={handleLogin}>
                Log In
              </button>
            </form>
            <Link to="/forgotpassword" className="loginForgot">
              <span className="loginForgot">Forgot Password?</span>
            </Link>
            <button className="loginRegisterButton" onClick={handleCreate}>
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
