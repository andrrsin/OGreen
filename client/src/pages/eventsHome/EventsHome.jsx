
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/feed/Feed';
import EventsFeed from '../../components/eventsFeed/EventsFeed';

import './eventsHome.css';

export default function EventsHome() {


    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <EventsFeed />
                <div className="margin"></div>
            </div>
        </>
    )
}