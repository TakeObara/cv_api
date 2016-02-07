
import UserStore from "../stores/UserStore"

var Link = ReactRouter.Link;

export default class ChatroomItemList extends React.Component {
    
    constructor() {
        super();

        this.me = UserStore.getMyProfile();
    }

    render() {
        var chatroom = this.props.info;
        
        var opponentProfile = {};
        for (var i = 0; i < chatroom.users.length; i++) {
            var _u = chatroom.users[i];
            if(this.me.id !== parseInt(_u.id)) {
                opponentProfile = UserStore.transformResponse(_u.profile);
                break;
            }
        }

        var path = "/chatroom/"+chatroom.id;
        var unreadBox = chatroom.unread_count > 0 ? (<div className="unreadBox">{chatroom.unread_count}</div>) : null;

        return (
            <Link to={path} className="chatroomItem clearfix">
                <img className="chatroomImg" src={opponentProfile.profile_image_url} />
                <div className="chatroomInfo">
                    <div className="opponentName">{opponentProfile.name}</div>
                    <div className="meta">
                        <div className="metaItem"><span className="orange">W</span>: {opponentProfile.resource_introduce} </div>
                        <div className="metaItem"><span className="blue">I</span>: {opponentProfile.resource_needed}</div>
                    </div>
                    {unreadBox}
                </div>
            </Link>
        );
    }
}