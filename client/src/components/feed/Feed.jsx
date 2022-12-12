import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

 
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/users/posts/" + username)
        : await axios.get("posts/timeline/" + currentUser._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, currentUser]);


  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === currentUser.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
