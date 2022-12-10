
import "./detailedEventFeed.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CreateAnnouncement from "../createAnnouncement/CreateAnnouncement";

import Announcement from "../announcement/Announcement";
import Post from "../post/Post";

export default function DetailedEventFeed({ eventId }) {
  console.log(eventId);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const fetchEvent = async () => {
    const res = await axios.get("events/" + eventId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    return(res.data);
  };
  const [event, setEvent] = useState(fetchEvent());

  


      useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get("posts/events/" + event._id, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          });
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        };
        fetchPosts();
      }, [event]);

      useEffect(() => {
        const fetchAnnouncements = async () => {
          const res = await axios.get("events/" + event._id + "/announcements/", {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          });
          setAnnouncements(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        };
        fetchAnnouncements();
      }, [event]);




      return (
        <div className="feed">
          <div className="feedWrapper">
            {event.organizers.includes(user._id) && <CreateAnnouncement eventId={event._id} />}
            <div className="announcements">
              <div className="postsWrapper">Announcements</div>
              {announcements.map((p) => (
                <Announcement key={p._id} announcement={p} />
              ))}
            </div>
            <div className="posts">
              <div className="postsWrapper">Event Posts</div>
              {posts.map((p) => (
                <Post key={p._id} post={p} />
              ))}
            </div>

          </div>
        </div>
      );
    }
