import "./sidebar.css";
import EventIcon from '@mui/icons-material/Event';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <EventIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <AnnouncementIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Announcements </span>
                    </li>
                    <li className="sidebarListItem">
                        <DynamicFeedIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Posts </span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkspacesIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Collaborate with us </span>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}