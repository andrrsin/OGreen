import "./share.css"
import EventIcon from '@mui/icons-material/Event';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

export default function Share() {
  const { currentUser:user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const events = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newPost = {
      userId: user._id,
      description: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      
      try {
        await axios.post("/upload", data,{headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
         }});
      } catch (err) {}
    }
    try {
      const event = await axios.get("/?title=" + events.current.value,{headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
       }});
      newPost.event = event.data._id;
      await axios.post("/posts", newPost,{headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
       }});
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
            placeholder={"Show your progress for a greener world!"}
            className="shareInput"
            ref={desc}
          />
        </div>
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
              <EventIcon htmlColor="green" className="shareIcon" />
              <input className="shareOptionText"placeholder={"Event"} ref = {events} />
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

