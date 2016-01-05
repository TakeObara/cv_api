
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
        for (var i = 0; i < chatroom.user.length; i++) {
            var _u = chatroom.user[i];
            if(this.me.id !== parseInt(_u.id)) {
                opponentProfile = UserStore.transformResponse(_u.profile);
                break;
            }
        }

        var path = "/chatroom/"+chatroom.id;

        return (
            <Link to={path} className="chatroomItem clearfix">
                <img className="chatroomImg" src={opponentProfile.profile_image_url} />
                <div className="chatroomInfo">
                    <div className="opponentName">{opponentProfile.name}</div>
                </div>
            </Link>
        );
    }
}