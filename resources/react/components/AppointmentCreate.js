import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

import ChatroomStore from "../stores/ChatroomStore"

import AppointmentStore from "../stores/AppointmentStore"
import AppointmentAction from "../actions/AppointmentAction"

import NotificationAction from "../actions/NotificationAction"

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default class AppointmentCreate extends React.Component {

    constructor() {
        super();

        this.state = { 
            appointment: {},
            opponent: {profile: {}},
        };

        this._handleInput = this._handleInput.bind(this);
        this._onChange    = this._onChange.bind(this);
    }

    componentDidMount() {

        this._onChange();

        ChatroomStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ChatroomStore.removeChangeListener(this._onChange);
    }

    // componentDidUpdate (prevProps) {
    //     this.state = { 
    //         appointment: {},
    //         opponent: ChatroomStore.getOpponent(this.props.params.id),
    //     };
    //     console.log(this.props.params.id);
    //     console.log(this.state.opponent);
    // }

    _onChange() {
        var opponent = ChatroomStore.getOpponent(this.props.params.id);

        this._loading = false;
        this.setState({
            appointment: {guest: opponent.profile.name},
            opponent: opponent,
        });
    }

    _handleInput(e) {
        var attr = e.target.getAttribute("name");
        if(e.target.type === 'checkbox') {
            this.state.appointment[attr] = e.target.checked;
        } else if(e.target.tagName === 'SELECT') {
            this.state.appointment[attr] = e.target.value;
        }else {
            this.state.appointment[attr] = e.target.value;    
        }
        
        this.setState({appointment: this.state.appointment});
    }

    _onSubmit(e) {
        e.preventDefault();

        var opponent = this.state.opponent;

        AppointmentAction.create({
            userId:      this.state.opponent.id,
            guest:       this.state.appointment.guest,
            meetingTime: this.state.appointment.meeting_time,
            place:       this.state.appointment.place,
            cb:          this._submitCallback.bind(this),
        });
    }

    _submitCallback(data) {

        browserHistory.push({
            pathname: '/appointment/'+data.id
        });

        NotificationAction.notify("success","アポイント申請しました。");
    }

    render() {

        var appointment = this.state.appointment;
        var me = UserStore.getMyProfile();
        var opponent = this.state.opponent;

        return(
            
            <div className="content appointmentCreatePage">
                <Link to={"/chatroom/" + this.props.params.id} className="halfPage-title"> ＜ APPOINTMENT</Link>
                <form className="fence" onSubmit={this._onSubmit.bind(this)}>
                    <div className="form-group guest">
                        <label className="clearfix">
                            <span>GUEST </span>
                            <img className="icon" src="/assets/imgs/ic_guest.png" />
                            <button className="questionmark">
                                <img src="/assets/imgs/ic_hatena_white.png" />
                            </button>
                        </label>
                        <input name="guest" value={appointment.guest} onChange={this._handleInput} />
                    </div>
                    <div className="form-people clearfix">
                        <div className="form-group">
                            <label>紹介者</label>
                            <input name="introduce" value={me.name} onChange={this._handleInput} disabled={true}/>
                        </div>
                        <div className="middle">
                            <img src="/assets/imgs/ic_bidirection.png" />
                        </div>
                        <div className="form-group">
                            <label>被紹介者</label>
                            <input name="introduced" value={opponent.profile.name} onChange={this._handleInput} disabled={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>日時</label>
                        <input name="meeting_time" value={appointment.meeting_time} onChange={this._handleInput} />
                    </div>
                    <div className="form-group">
                        <label>場所</label>
                        <input name="place" value={appointment.place} onChange={this._handleInput} />
                    </div>
                    <div className="form-group price">
                        紹介料 <span>3000円</span>
                    </div>
                    <div className="form-group clearfix">
                        <button type="submit" className="btn-submit">紹介料を支払う</button>
                    </div>
                </form>
            </div>
        );
    }
}

