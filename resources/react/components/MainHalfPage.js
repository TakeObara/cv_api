import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

export default class MainHalfPage extends React.Component{

    constructor() {
        super();

        UserAction.loadMyProfile();

        this.state = {
            me: UserStore.getMyProfile(),
        };

        this._onUserChange = this._onUserChange.bind(this);
    }


    componentDidMount() {
        UserStore.addChangeListener(this._onUserChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserChange);
    }

    _onUserChange() {
        console.log("favourite component in _onUserChange");
        var _state = this.state;
        _state.me = UserStore.getMyProfile();
        this.setState(_state);
    }

    render() {

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
            </div>
        );
    }
}

