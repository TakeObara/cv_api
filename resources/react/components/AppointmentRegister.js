import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

import ChatroomStore from "../stores/ChatroomStore"

import AppointmentStore from "../stores/AppointmentStore"
import AppointmentAction from "../actions/AppointmentAction"

import ToastAction from "../actions/ToastAction"

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default class AppointmentRegister extends React.Component {

    constructor() {
        super();

        var now = new Date();
        now.setTime(now.getTime() + (2 * 3600 * 1000));

        this.state = { 
            appointment: {
                place: "",
                meeting_time_date: this.transformToDateValue(now),
                meeting_time_time: this.transformToTimeValue(now.getHours()),
            },
            opponent: {profile: {}},
            showExplain: false,
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
        
        this._loading = false;

        var opponent = ChatroomStore.getOpponent(this.props.params.id);
        var appointment = this.state.appointment;
        appointment.guest = opponent.profile.name;

        this.setState({
            appointment: appointment,
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

        var meetingTime = this.getMeetingTime();

        AppointmentAction.create({
            userId:      this.state.opponent.id,
            guest:       this.state.appointment.guest,
            meetingTime: meetingTime,
            place:       this.state.appointment.place,
            cb:          this._submitCallback.bind(this),
        });
    }

    _submitCallback(data, error) {

        if(error) {
            if(data.place) {
                ToastAction.show("error","場所を入力してください。");    
            }else if(data.wrong_meeting_time) {
                ToastAction.show("error","ミーティングタイムは1日前に設定してください。");    
            }else {
                ToastAction.show("error","エラー発生。");    
            }            
            return;
        }

        browserHistory.push({
            pathname: '/appointment/'+data.id
        });

        ToastAction.show("success","アポイント申請しました。");
    }

    _questionMarkClick(e) {
        e.preventDefault();

        this.setState({showExplain: true});
    }

    months() {
        var rst = [];
        var now = new Date();
        var thisMonth = now.getMonth() + 1;
        var thisYear  = now.getFullYear();

        for (var m = 0; m < 1; m++) {
            if(thisMonth + m > 12 ) {
                var dateValue = (thisYear + 1) + "-" + (thisMonth + m - 12);
                var dateShow  = (thisYear + 1) + "年" + (thisMonth + m - 12) + "月";
                rst.push(<option value={dateValue}>{dateShow}</option>);
            } else {
                var dateValue = thisYear + "-" + (thisMonth + m);
                var dateShow  = thisYear + "年" + (thisMonth + m) + "月";
                rst.push(<option value={dateValue}>{dateShow}</option>);
            }
        }
        return rst;
    }

    days() {
        var rst = [];
        var now = new Date();

        for(var d = 0; d < 31; d++) {
            var date = new Date();

            date.setTime(now.getTime() + (d * 24 * 3600 * 1000));

            var dateValue = this.transformToDateValue(date);
            var dateShow = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";

            rst.push(<option key={d} value={dateValue}>{dateShow}</option>);
        }

        return rst;
    }



    times() {
        var rst = [];
        var now = new Date();

        for(var h = 0;h < 24; h++) {
            rst.push(<option key={h} value={this.transformToTimeValue(h)}>{h + ":00"}</option>);
        }
        return rst;
    }

    transformToTimeValue(hour) {
        return this.transformTwoDigit(hour) + ":00";
    }

    transformToDateValue(date) {
        var month  = this.transformTwoDigit(date.getMonth() + 1);
        var day    = this.transformTwoDigit(date.getDate());

        return date.getFullYear() + "-" + month + "-" + day;
    }

    transformTwoDigit(num) {
        return ("0000" + num).substr(-2, 2);
    }

    getMeetingTime() {
        var appointment = this.state.appointment;
        return appointment.meeting_time_date + " " + appointment.meeting_time_time;
    }

    _closeExplainGroup(e) {
        e.preventDefault();

        this.setState({showExplain: false});
    }

    render() {

        var appointment = this.state.appointment;
        var me = UserStore.getMyProfile();
        var opponent = this.state.opponent;

        var explainGroup = null;
        if(this.state.showExplain) {
            explainGroup = (<div className="explain-group">
                    <button className="cross" onClick={this._closeExplainGroup.bind(this)}><img src="/assets/imgs/ic_plus_white.png" /></button>
                    <img className="explain-bg" src="/assets/imgs/explain.png" />
                </div>);
        }

        return(
            
            <div className="content appointmentCreatePage">
                <Link to={"/chatroom/" + this.props.params.id} className="halfPage-title"> ＜ チャットに戻ります</Link>
                <form className="fence" onSubmit={this._onSubmit.bind(this)}>
                    {explainGroup}
                    <div className="form-group guest">
                        <label className="clearfix">
                            <span>GUEST </span>
                            <img className="icon" src="/assets/imgs/ic_guest.png" />
                            <button className="questionmark" onClick={this._questionMarkClick.bind(this)}>
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
                    <div className="form-group date-group">
                        <label>日時</label>
                        <select className="dark-select" name="meeting_time_date" value={appointment.meeting_time_date} onChange={this._handleInput} >
                        { this.days() }
                        </select>

                        <select className="dark-select" name="meeting_time_time" value={appointment.meeting_time_time} onChange={this._handleInput}>
                        { this.times() }
                        </select>
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

