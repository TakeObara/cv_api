
import FavouriteAction from "../actions/FavouriteAction"

export default class FavouriteItem extends React.Component{

    _onClick() {
        var profile = this.props.profile;
        FavouriteAction.removeFavourite(profile.id);
    }

    render() {
        
        var profile = this.props.profile;

        return (
            <div className="clearfix favouriteItem">
                <img className="profileImg" src={profile.profile_image_url}/>
                <div className="profileMeta">
                    <p>{profile.name}</p>
                    <p className="profileDesc">{profile.description}</p>
                </div>
                <img className="favouriteRemove cross" src="/assets/imgs/ic_plus_white.png" onClick={this._onClick.bind(this)} />
            </div>
        );

    }
}