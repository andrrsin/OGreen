import "./share.css"
import EventIcon from '@mui/icons-material/Event';
import PermMediaIcon from '@mui/icons-material/PermMedia';
export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/person/Person1.jpg" alt="" />
                    <input placeholder="Show what you did during events. ^^" className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <EventIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Event</span>
                        </div>
                        <div className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                    </div>
                    <button className="shareButton">Post</button>
                </div>
            </div>
        </div>
    )
}

