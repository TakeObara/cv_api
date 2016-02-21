import UserStore from "../stores/UserStore"

import FavouriteStore from '../stores/FavouriteStore'
import FavouriteAction from "../actions/FavouriteAction"

import ChatroomListAction from "../actions/ChatroomListAction"

var browserHistory = ReactRouter.browserHistory;
var Link = ReactRouter.Link;

export default class UserItem extends React.Component{

    constructor() {
        super();

    }

    _toggleFavourite() {
        var userMeta = this.props.userMeta;
        if(FavouriteStore.isFavourite(userMeta.id)) {
            FavouriteAction.removeFavourite(userMeta.id);
        } else {
            FavouriteAction.appendFavourite(userMeta.id);
        }
    }

    _startChat() {
        var userMeta = this.props.userMeta;
        var me = UserStore.getMyProfile();
        var title = userMeta.name;
        var users = [
            me.id,
            userMeta.id
        ];
        ChatroomListAction.create(title, users, this._startChatPreparedCallback.bind(this));
    }

    _startChatPreparedCallback(error, data) {
        if(!error) {
            browserHistory.push({
                pathname: '/chatroom/'+data.id
            });
        }
    }


    render() {

        var userMeta = this.props.userMeta;

        var favouriteBtn = null;
        if(FavouriteStore.isFavourite(userMeta.id)) {
            favouriteBtn = (<img src="/assets/imgs/ic_star_white.png" />);
        } else {
            favouriteBtn = (<img src="/assets/imgs/ic_plus_white.png" />);
        }

        var line = null;
        if(userMeta.resource_needed.length > 0 || userMeta.resource_needed.length > 0) {
            var spans = [];
            if(userMeta.resource_needed.length > 0) {
                spans.push(<div className="resource1" key={1}><span className="orange">W :</span>{userMeta.resource_needed}</div>);
            }

            if(userMeta.resource_introduce.length > 0) {
                spans.push(<div className="resource2" key={2}><span className="blue">I :</span>{userMeta.resource_introduce}</div>);
            }

            line = ( <div className="line">{spans}</div> );
        }

        return (
            <div className="userItem">
                <button className="triangle" onClick={this._toggleFavourite.bind(this)}>
                    {favouriteBtn}
                </button>

                <div className="cover"  onClick={this._startChat.bind(this)}>
                    <div className="middleInCover">
                        <img src="/assets/imgs/ic_bubble_w.png" /><br/>
                        会話しましょう
                    </div>
                </div>
                <img src={userMeta.profile_image_url} />
                <div className="userMeta">
                    <div className="userPlace">{prefectureList[userMeta.place]}</div>
                    <div className="userName">{userMeta.name}</div>
                    {line}
                    <div className="userDesc">
                        {userMeta.description}
                    </div>
                </div>
            </div>
        )
    } 
}
