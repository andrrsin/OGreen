import "./eventInfo.css"


import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import axios from "axios";

import { useState } from "react";
import DetailedEventFeed from "../../components/detailedEventFeed/DetailedEventFeed";
import EventRightbar from "../../components/eventRightbar/EventRightbar";
import { useParams } from "react-router";


export default function EventInfo() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const eventId = useParams().eventId;
  const fetchUser = async () => {
    const res = await axios.get(`/events/byId/`+eventId, {headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }}
      );
      
      return res.data;
  };
  const [event, setEvent] = useState(fetchUser());

  

  

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  event.img
                    ? PF + event.img
                    : PF + "defaults/defaultEvent.jpeg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{event.title}</h4>
              <span className="profileInfoDesc">{event.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <DetailedEventFeed eventId = {event._id}/>
            <EventRightbar event={event} />
          </div>
        </div>
      </div>
    </>
  );
}
