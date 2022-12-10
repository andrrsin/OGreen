import "./eventRightbar.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
export default function EventRightbar({ event }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [participants, setParticipants] = useState(event.participants);
  const { user, dispatch } = useContext(AuthContext);
  const [participating, setParticipating] = useState(
    event.participants.includes(user._id)
  );
  useEffect(() => {
    setParticipating(event.participants.includes(user._id));
  }, [event]);


  const handleClick = async () => {
    try {

      await axios.patch(`/events/${event._id}/participate`, {
        userId: user._id,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      setParticipating(participating ? false : true);

    } catch (err) {
    }
  };

  const handleOrganizer = async (participant) => {
    try {
      await axios.patch(`/events/${event._id}/organize`, {
        userId: user._id,
        organizer : participant._id
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <>

          <button className="rightbarFollowButton" onClick={handleClick}>
            {participating ? "Stop Participating" : "Participate"}
            {participating ? <RemoveIcon /> : <AddIcon />}
          </button>

          <h4 className="rightbarTitle">Event information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Location:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Date:</span>
              <span className="rightbarInfoValue" type="date">{event.date}</span>
            </div>


          </div>
          <h4 className="rightbarTitle">Participants</h4>
          <div className="rightbarFollowings">
            {participants.map((friend) => (
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
                  {event.userId === user._id && event.organizers.includes(friend._id) ?
                    <button className="rightbarFollowingButton" onClick={handleOrganizer(friend)}>Add Organizer</button> :
                    <button className="rightbarFollowingButton" onCLick={handleOrganizer(friend)}>Eliminate Organizer</button>}
                </div>
              </Link>
            ))}
          </div>
        </>

      </div>
    </div>
  )
}
