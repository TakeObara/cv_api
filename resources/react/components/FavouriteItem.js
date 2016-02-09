
import UserStore from "../stores/UserStore"

import ChatroomListAction from "../actions/ChatroomListAction"
import FavouriteAction from "../actions/FavouriteAction"

var browserHistory = ReactRouter.browserHistory;

export default class FavouriteItem extends React.Component{

    _onRemoveClick() {
        var profile = this.props.profile;
        FavouriteAction.removeFavourite(profile.id);
    }

    _onSpeakClick() {
        var userMeta = this.props.profile;
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
        
        var profile = this.props.profile;

        return (
            <div className="clearfix favouriteItem">
                <img className="profileImg" src={profile.profile_image_url}/>
                <div className="profileMeta">
                    <p>{profile.name}</p>
                    <p className="profileWanted"><span className="label">W :</span>{profile.resource_needed}</p>
                    <p className="profileIntroduce"><span className="label">I :</span>{profile.resource_introduce}</p>
                    <p className="profileDesc">{profile.description}</p>
                </div>
                <img className="favouriteBtn favouriteSpeak" src="/assets/imgs/ic_bubble_w.png" onClick={this._onSpeakClick.bind(this)} />
                <img className="favouriteBtn favouriteRemove" src="/assets/imgs/ic_plus_white.png" onClick={this._onRemoveClick.bind(this)} />
            </div>
        );

    }
}