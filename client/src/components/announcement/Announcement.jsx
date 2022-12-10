import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./announcement.css";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Announcement({ announcement }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [like, setLike] = useState(announcement.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    useEffect(() => {
        setIsLiked(announcement.likes.includes(currentUser._id));
    }, [currentUser._id, announcement.likes]);

    const likeHandler = () => {
        try {
            axios.patch("/announcements/" + announcement._id + "/like", { userId: currentUser._id },{headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
               }});
            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked(!isLiked);
        } catch (err) { }

    };

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${announcement.userId}`,{headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
           }}

          );
          setUser(res.data);
        };
        fetchUser();
      }, [announcement.userId]);

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
                        <span className="postUsername">{announcement.title}</span>
                        <span className="postDate">{format(announcement.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{announcement?.description}</span>
                    <img className="postImg" src={PF + announcement.img} alt="" />
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
