import "./sidebar.css";
import EventIcon from '@mui/icons-material/Event';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const { user } = useContext(AuthContext);

    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/" + user._id + "/following",{headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                   }});
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/events" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <EventIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <AnnouncementIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Announcements </span>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <DynamicFeedIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Posts </span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <WorkspacesIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Collaborate with us </span>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {friends.map((u) => (

                        <CloseFriend key={u.id} user={u} />

                    ))}
                </ul>
            </div>
        </div>
    )
}