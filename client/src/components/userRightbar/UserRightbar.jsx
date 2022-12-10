import "./userRightbar.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserRightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user._id)
  );
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user._id));
  }, [currentUser.followings, user]);
  useEffect(() => {

    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/" + user._id + "/followers",{headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
         }});
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.patch(`/users/${user.id}/unfollow`, {
          userId: currentUser._id,
        },{headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
         }});
        dispatch({ type: "UNFOLLOW", payload: user._id });
        setFollowed(false);
      } else {
        await axios.patch(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        setFollowed(true);
      }

    } catch (err) {
    }
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <>
          {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <RemoveIcon /> : <AddIcon />}
            </button>
          )}
          
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Gender:</span>
              <span className="rightbarInfoValue">{user.gender}</span>
            </div>


          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "defaults/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            ))}
          </div>
        </>

      </div>
    </div>
  )
}
