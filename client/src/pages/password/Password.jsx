import "./password.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from "react";
import { useState } from "react";

export default function Password() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [currentUser, setUser] = useState();

  
  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== repeatPassword.current.value) {
      repeatPassword.current.setCustomValidity("Passwords don't match!");
    }
    else {
      const user = {
        password: password.current.value
      }
      const res = await axios.get(`users?username=${username.current.value}`, {isAdmin:true});
      
      setUser(res.data);
      user.userId = res.data._id;
    
      try {
        
        await axios.patch(`/users/${user.userId}`, user, {isAdmin:true});
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
            We are here to help you with everything!
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form className="loginBox" onSubmit={handleClick}>
              <input placeholder="Username" required ref={username} className="loginInput" />
              <input placeholder="Email" required ref={email} type="email" className="loginInput" />
              <input placeholder="New Password" required ref={password} type="password" minLength="8" className="loginInput" />
              <input placeholder="Repeat Password" required ref={repeatPassword} type="password" minLength="8" className="loginInput" />
              <button className="loginButton" type="submit">{isFetching ? <CircularProgress color="white" size="20px" /> : "Change Password"}</button>
            </form>
            <button className="loginRegisterButton" onClick={handleLogin}>
              {isFetching ? <CircularProgress color="white" size="20px" /> : "Log Into Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
