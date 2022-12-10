import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./post.css";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    const likeHandler = () => {
        try {
            axios.patch("/posts/" + post._id + "/like", { userId: currentUser._id },{headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
               }});
            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked(!isLiked);
        } catch (err) { }

    };

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${post.userId}`,{headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
           }}

          );
          setUser(res.data);
        };
        fetchUser();
      }, [post.userId]);

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className="postProfileImg"
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "defaults/noAvatar.png"
                                }
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.description}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <EmojiEmotionsIcon htmlColor = "forestgreen" onClick={likeHandler} />

                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
