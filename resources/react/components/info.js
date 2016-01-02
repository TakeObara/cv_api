import UserAction from "../actions/userAction"
import UserStore from "../stores/userStore"


export default class Info extends React.Component {

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
        var _state = this.state;
        _state.me = UserStore.getMyProfile();
        this.setState(_state);
    }

    render() {

        var profileCoverStyle = { backgroundImage: 'url('+this.state.me.profile_image_url+')' };

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover" style={profileCoverStyle}></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content">
                    <div className="halfPage-title">INFORMATION</div>
                    <p>ご利用の流れ</p>
                    <div style={{marginLeft: "30px"}}>
                        <p>1.紹介者と被紹介者がアポイントを確認</p>
                        <p>2.事務局への振り込みを確認</p>
                        <p>3.紹介が完了次第、紹介者の売上に反映されます</p>
                    </div>
                </div>
            </div>
        );
    }
}

