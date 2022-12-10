import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (

    <li className="sidebarFriend">
      <Link to={`/profile/${user.username}`}>
        <img className="sidebarFriendImg" src={user.profilePicture ? PF + user.profilePicture : PF + "defaults/noAvatar.png"} alt="" />
      </Link>
      <span className="sidebarFriendName">{user.username}</span>
    </li>

  );
}