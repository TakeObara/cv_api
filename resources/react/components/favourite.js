import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

import FavouriteAction from "../actions/FavouriteAction"
import FavouriteStore from "../stores/FavouriteStore"

export default class Favourite extends React.Component{

    constructor() {
        super();

        UserAction.loadMyProfile();
        FavouriteAction.loadAll();

        this.state = {
            me: UserStore.getMyProfile(),
            favourites: FavouriteStore.getAll(),
        };

        this._onUserChange = this._onUserChange.bind(this);
        this._onChange     = this._onChange.bind(this)
    }


    componentDidMount() {
        UserStore.addChangeListener(this._onUserChange);
        FavouriteStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserChange);
        FavouriteStore.removeChangeListener(this._onChange);
    }

    _onUserChange() {
        console.log("favourite component in _onUserChange");
        var _state = this.state;
        _state.me = UserStore.getMyProfile();
        this.setState(_state);
    }

    _onChange() {
        console.log("favourite component in _onChange");
        var _state = this.state;
        _state.favourites = FavouriteStore.getAll();
        this.setState(_state);
    }

    render() {

        var profileCoverStyle = { backgroundImage: 'url('+this.state.me.profile_image_url+')' };

        var favouriteList = [];
        for (var i = 0; i < this.state.favourites.length; i++) {
            var _favour = this.state.favourites[i];
            favouriteList.push(
                <div key={i} className="clearfix favouriteItem">
                    <img className="profileImg" src={_favour.profile.profile_image_url}/>
                    <div className="profileMeta">
                        <p>{_favour.profile.name}</p>
                        <p>{_favour.profile.description}</p>
                    </div>
                </div>
            );
        };

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover" style={profileCoverStyle}></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content scrollable">
                    <div className="halfPage-title">BOOKMARK</div>
                    <div className="favouriteList">
                        {favouriteList}
                    </div>
                </div>
            </div>
        );
    }

}