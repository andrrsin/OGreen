
import "./eventsFeed.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CreateEvent from "../createEvent/CreateEvent";
import Event from "../event/Event";

export default function EventsFeed() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("events/all", {
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
  }, []);


  return (
    <div className="feed">
      <div className="feedWrapper">
        <CreateEvent />
        {posts.map((p) => (
          <Event key={p._id} event={p} />
        ))}
      </div>
    </div>
  );
}
