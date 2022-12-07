import "./topbar.css";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">OGreen</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <TravelExploreIcon className="searchIcon" />
                    <input placeholder="Search what is going on in OGreen :)" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Create Event</span>
                    <span className="topbarLink">Log Out</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className="topbarIconBadge">2</span>
                    </div>

                </div>
                <img src="assets/person/Person1.jpg" alt="" className="topbarImg" />


            </div>
        </div>

    )
}