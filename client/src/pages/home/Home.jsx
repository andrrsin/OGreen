
import  { useContext, useEffect, useState } from "react";
import Share from "../../components/share/Share";
import Post from "../../components/post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import './home.css';

export default function Home({username}) {
    const [posts, setPosts] = useState([]);
    const { currenUser } = useContext(AuthContext);
  
   
    useEffect(() => {
      const fetchPosts = async () => {
        const res = username
          ? await axios.get("/users/posts/" + username)
          : await axios.get("posts/timeline/" + currenUser._id);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      };
      fetchPosts();
    }, [username, currenUser]);
  
  
    return (
      <div className="feed">
        <div className="feedWrapper">
          {(!username || username === currenUser.username) && <Share />}
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    );
    
}