
import Post from "../post/Post";
import "./profileFeed.css";

import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function ProfileFeed({username}) {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const fetchPosts = async () => {
    const res =await axios.get(`/users/posts/${username}`,{headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
     }})
    setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    };
    fetchPosts();
  }, [username]);
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
  
}
