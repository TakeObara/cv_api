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
                    <div className="userName">{userMeta.name}</div><div className="line"></div>
                    <div className="userDesc">{userMeta.description}</div>
                </div>
            </div>
        )
    } 
}
