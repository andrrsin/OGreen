
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/feed/Feed';

import './home.css';

export default function Home() {
    return(
        <>
        <Topbar/>
        <div className="homeContainer">
            <Sidebar/>
            <Feed/>
            <div className="margin"></div>
        </div>
        
        </>
    )
}