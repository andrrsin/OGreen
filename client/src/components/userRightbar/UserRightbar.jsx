import "./userRightbar.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import { useLocation } from "react-router";
export default function UserRightbar() {
 
  const { currentUser } = useContext(AuthContext);

  const userId = useLocation().pathname.split("/")[2];

  
  const {update} = useContext(AuthContext);

  const [following, setFollowing] = useState(false);

  const { isLoading, error, data:user } = useQuery(["user"], () =>
    makeRequest.get("/users?username=" + userId).then((res) => {
      setFollowing(res.data.followers.includes(currentUser._id));
      console.log(res.data);
      return res.data;
    })
  );
  const mutation = useMutation(
    (following) => {
      if (following)
        setFollowing(false);
      else
        setFollowing(true);
      makeRequest.patch("/users/"+userId+"/follow");
      update();
      
    }
  );

  const handleFollow = () => {
    mutation.mutate(user.followers.includes(currentUser.id));
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <>
          {isLoading?"Loading":
          user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleFollow}>
              {following ? "Unfollow" : "Follow"}
              {following ? <RemoveIcon /> : <AddIcon />}
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
            {isLoading?"Loading":
            user.followers.map((friend) => (
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
