import "./profile.css"


import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import axios from "axios";
import UserRightbar from "../../components/userRightbar/UserRightbar";
import { useEffect, useState } from "react";

import { useParams } from "react-router";
import Feed from "../../components/feed/Feed";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`, {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }}
        );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  

  return (

      <div className="profile">
  
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "defaults/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "defaults/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username = {username}/>
            <UserRightbar />
          </div>
        </div>
      </div>
    
  );
}
