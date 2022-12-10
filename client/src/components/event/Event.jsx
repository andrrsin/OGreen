import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./event.css";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddTaskIcon from '@mui/icons-material/AddTask';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

export default function Event({ event }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    
    const [isLiked, setIsLiked] = useState(false)
    const [participant, setParticipant] = useState(event.participants.length)
    const { user: currentUser } = useContext(AuthContext);
    useEffect(() => {
        setIsLiked(event.participants.includes(currentUser._id));
    }, [currentUser._id, event.likes]);

    const likeHandler = () => {
        try {
            axios.patch("/events/" + event._id + "/participate", { userId: currentUser._id },{headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
               }});
            setParticipant(isLiked ? participant - 1 : participant + 1);
            setIsLiked(!isLiked);
        } catch (err) { }

    };


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/event/${event._id}`}>
                            <img
                                className="postProfileImg"
                                src={
                                    event.img
                                        ? PF + event.img
                                        : PF + "defaults/noEvent.png"
                                }
                                alt=""
                            />
                        </Link>
                        
                        <span className="postUsername">{event.title}</span>
                        <span className="postDate">{format(event.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{event?.description}</span>
                    
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {isLiked?<NotInterestedIcon htmlColor = "forestgreen" onClick={likeHandler} />:<AddTaskIcon htmlColor = "forestgreen" onClick={likeHandler} />} 

                        <span className="postLikeCounter">{isLiked ? "Leave Event" : "Participate" }</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{participant}{" participants"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
