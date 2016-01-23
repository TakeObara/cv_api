import NotificationAction from "../actions/NotificationAction"

import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

export default class Profile extends React.Component{

    constructor() {
        super();
        
        this.state = {me: UserStore.getMyProfile()};

        this._onChange = this._onChange.bind(this);
    }


    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        console.log("profile component onChange");
        this.setState({me: UserStore.getMyProfile() });
    }

    _updateName(e) {
        this.state.me.name = e.target.value;
        this.setState({me: this.state.me});
    }

    _updateDescription(e) {
        this.state.me.description = e.target.value;
        this.setState({me: this.state.me});
    }

    _save() {
        NotificationAction.notify("info","updated");
        UserAction.updateMyProfile(this.state.me);
    }

    render() {

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content">
                    <div className="halfPage-title">PROFILE</div>
                    <div className="halfPage-group">
                        <label>名前</label>
                        <input value={this.state.me.name} onChange={this._updateName.bind(this)}/>
                    </div>
                    <div className="halfPage-group">
                        <label>自己紹介</label>
                        <textarea cols="5" value={this.state.me.description} onChange={this._updateDescription.bind(this)}/>
                    </div>

                    <button className="btn right" onClick={this._save.bind(this)}>更新</button>
                </div>
            </div>
        );
    }
}
