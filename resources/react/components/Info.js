import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"


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
        console.log("info component in _onUserChange");
        var _state = this.state;
        _state.me = UserStore.getMyProfile();
        this.setState(_state);
    }

    render() {

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content">
                    <div className="halfPage-title">INFORMATION</div>
                    <p>ご利用の流れ</p>
                    <div className="infoPage" >
                        <p>1.紹介者と被紹介者がアポイントを確認</p>
                        <img className="inline" src="/assets/imgs/info/ex1.png" />
                        <p>2.事務局への振り込みを確認</p>
                        <img className="inline" src="/assets/imgs/info/ex2.png" />
                        <p>3.紹介が完了次第、紹介者の売上に反映されます</p>
                        <img className="inline" src="/assets/imgs/info/ex3.png" />
                    </div>
                </div>
            </div>
        );
    }
}

