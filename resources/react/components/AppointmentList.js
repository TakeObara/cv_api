import UserStore from "../stores/UserStore"

import AppointmentStore from "../stores/AppointmentStore";
import AppointmentAction from "../actions/AppointmentAction";

var Link = ReactRouter.Link;

export default class AppointmentList extends React.Component {

    constructor() {
        super();

        AppointmentAction.loadAll();

        this.state = {
            me: UserStore.getMyProfile(),
            list: AppointmentStore.getAll(),
        };

        this._onChange     = this._onChange.bind(this)
    }


    componentDidMount() {
        AppointmentStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppointmentStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        var _state = this.state;
        _state.list = AppointmentStore.getAll();
        this.setState(_state);
    }

    transformResponse(appo) {

        var myId = UserStore.getMyProfile().id;
        var opponent = {profile: {}};
        var host     = {profile: {}};

        for (var i = 0; i < appo.appointment_users.length; i++) {
            var userId = appo.appointment_users[i].user.id;
            if(userId !== myId) {
                opponent = appo.appointment_users[i].user.profile;
            }

            if(userId === appo.host_user_id) {
                host = appo.appointment_users[i].user.profile;
            }
        }

        return {
            id: appo.id,
            host: host,
            opponent: opponent,
            created_at: appo.created_at,
        }
    }

    render() {

        var list = [];
        for (var i = 0; i < this.state.list.length; i++) {
            var _appo = this.transformResponse(this.state.list[i]);

            var status = null;

            if(parseInt(_appo.host.user_id) === UserStore.getMyProfile().user_id) {
                status = (<span className="blue">SEND</span>);
            }else {
                status = (<span className="orange">RECEIVE</span>);
            }

            list.push(
                <Link to={"/appointment/" + _appo.id} key={i} className="clearfix appointItem">
                    <img className="profileImg" src={_appo.opponent.profile_image_url}/>
                    <div className="profileMeta clearfix">
                        <div className="profileMetaLeft">
                            <p>{status}</p>
                            <p>{_appo.opponent.name}</p>
                        </div>
                        <div className="profileMetaRight">
                            <p>{_appo.created_at.substr(0, 10)}</p>
                        </div>
                    </div>
                </Link>
            );
        };

        return (
            <div className="halfPage appintmentListPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content scrollable">
                    <div className="halfPage-title">APPOINTMENT</div>
                    <div className="appointList">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}

