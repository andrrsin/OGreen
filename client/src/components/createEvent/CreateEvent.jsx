import "./createEvent.css"

import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function CreateEvent() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const title = useRef();
  const location = useRef();
  const date = useRef();
  const [file, setFile] = useState(null);


  const submitHandler = async (e) => {
    e.preventDefault();
    const newEvent = {
      userId: user._id,
      description: desc.current.value,
      title: title.current.value,
      location: location.current.value,
      date: date.current.value,

    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newEvent.img = fileName;
      
      try {
        await axios.post("/upload", data,{headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
         }});
      } catch (err) {}
    }
    try {
      await axios.post("/events", newEvent,{headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
      });
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "defaults/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What is the title of your Event?"}
            className="shareInput"
            ref={title}
          />
        </div>
        
        <hr className="shareHr" />
        <input
            placeholder={"Describe the details"}
            className="shareInputDescr"
            ref={desc}
          />
        
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CloseIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <input className="shareOptionText"placeholder={"Location"} ref = {location} />
            </div>
            <div className="shareOption">
              <CalendarMonthIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Date of The Event: </span>
              <input type="date" className="shareOptionTextDate"placeholder={"Date"} ref = {date} />
            </div>
           
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

