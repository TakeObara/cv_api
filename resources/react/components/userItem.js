import FavouriteStore from '../stores/FavouriteStore';
import FavouriteAction from "../actions/FavouriteAction"

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
        
        // console.log("favourite");
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

                <div className="cover">
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