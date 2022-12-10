import "./editAccount.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { useState } from "react";
import {  updateCall } from "../../auth";
export default function EditAccount() {
  const description = useRef();
  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();
  const gender = useRef();
  const navigate = useNavigate();
  const city = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    
    
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      try {
        await axios.post("/upload", data,{headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
         }});
        await axios.patch("/users/" + user._id, {
          userId: user._id,
          profilePicture: fileName,
        }, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
      } catch (err) {
        console.log(err)
      }
    }
    
    if (password.current.value !== repeatPassword.current.value) {
      repeatPassword.current.setCustomValidity("Passwords don't match!");
    }
    else {
      const body = {
        userId: user._id,
      }
      if (description.current.value)
        body.description = description.current.value
      if (email.current.value)
        body.email = email.current.value
      if (password.current.value)
        body.password = password.current.value
      if (gender.current.value)
        body.gender = gender.current.value
      if (city.current.value)
        body.city = city.current.value
      
      try {
        
        await axios.patch("/users/" + user._id, body, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        console.log(user);
        
        updateCall({username: user.username},
          dispatch
        );
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };




  const [file, setFile] = useState(null);


  
  const handleBack = () => {
    navigate("/");
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/users/" + user._id, { userId: user._id }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">OGreen</h3>
          <span className="loginDesc">
            {"Edit here your user preferences :)"}
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form className="loginBox" onSubmit={handleClick}>
              <input placeholder="Email" ref={email} type="email" className="loginInput" />
              <input placeholder="Description" ref={description} className="loginInput" />
              <input placeholder="Gender" ref={gender} className="loginInput" />
              <input placeholder="City" ref={city} className="loginInput" />
              <input placeholder="Password" ref={password} type="password" minLength="8" className="loginInput" />
              <input placeholder="Repeat Password" ref={repeatPassword} type="password" minLength="8" className="loginInput" />
              <label htmlFor="file" className="shareOption">
                <AspectRatioIcon htmlColor="forestgreen" className="shareIcon" />
                <span className="shareOptionText">Profile Picture</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>

              <button className="loginButton" type="submit" onClick={handleClick}>{isFetching ? "Loading..." : "Update Account"}</button>
            </form>

            <button className="deleteButton" onClick={handleDelete}>
              {isFetching ? "Loading..." : "Delete Account"}
            </button>
            <button className="loginButton" onClick={handleBack}>
              {isFetching ? "Loading..." : "Go Back"}
            </button>
          </div>
        </div>
      </div >
    </div >
  );
}
