import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

import AppointmentStore from "../stores/AppointmentStore";
import AppointmentAction from "../actions/AppointmentAction";


export default class Appointment extends React.Component {

    constructor() {
        super();

        UserAction.loadMyProfile();
        // AppointmentAction.loadAll();

        this.state = {
            me: UserStore.getMyProfile(),
            list: AppointmentStore.getAll(),
        };

        this._onUserChange = this._onUserChange.bind(this);
        this._onChange     = this._onChange.bind(this)
    }


    componentDidMount() {
        UserStore.addChangeListener(this._onUserChange);
        AppointmentStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserChange);
        AppointmentStore.removeChangeListener(this._onChange);
    }

    _onUserChange() {
        console.log("appointment component in _onUserChange");
        var _state = this.state;
        _state.me = UserStore.getMyProfile();
        this.setState(_state);
    }

    _onChange() {
        console.log("appointment component in _onChange");
        var _state = this.state;
        _state.list = AppointmentStore.getAll();
        this.setState(_state);
    }

    render() {

        var profileCoverStyle = { backgroundImage: 'url('+this.state.me.profile_image_url+')' };

        var list = [];
        for (var i = 0; i < this.state.list.length; i++) {
            var _favour = this.state.list[i];
            list.push(
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
                <div className="content">
                    <div className="halfPage-title">APPOINTMENT</div>
                    <div className="favouriteList">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}

