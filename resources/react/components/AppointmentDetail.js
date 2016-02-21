import AppointmentAction from "../actions/AppointmentAction"
import AppointmentStore from "../stores/AppointmentStore"
import UserStore from "../stores/UserStore"
import ToastAction from "../actions/ToastAction"
import {AppointmentConst} from "../Constant"

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default class AppointmentDetail extends React.Component {

    constructor() {
        super();
        
        AppointmentAction.loadAll();

        this.state = { 
            loadFlag: false,
            appointment: AppointmentStore.get(0),
        };

        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        AppointmentStore.addChangeListener(this._onChange);

        this.loadAppointment();
    }

    componentWillUnmount() {
        AppointmentStore.removeChangeListener(this._onChange);
    }

    loadAppointment() {
        var appointment = AppointmentStore.get(this.props.params.id);
        var loadFlag = false;
        if(appointment.id !== 0) {
            loadFlag = true;      
        }

        this.setState({
            loadFlag: loadFlag,
            appointment: appointment,
        });
    }

    _onChange() {
        this.loadAppointment();
    }

    isHost() {
        return this.state.appointment.host_user_id == UserStore.getMyProfile().id;
    }

    _onDelete(e) {
        e.preventDefault();

        AppointmentAction.delete(this.props.params.id, () => {
            browserHistory.push({
                pathname: '/appointment/',
            });

            ToastAction.show("error","アポイントを削除しました");
        }); 
    }

    _onAnswerNotGoing(e) {
        e.preventDefault();   

        AppointmentAction.answer(this.props.params.id, false, () => {
            ToastAction.show("error","拒否しました。");
        }); 
    }

    _onPayment(e) {
        e.preventDefault();
        var host = "http://localhost:8000";
        // redirect to payment system
        window.location.href = "https://fastpay.yahoo.co.jp/checkout?key=dj0zaiZpPTdZejV3ZUFNM2dVaiZzPWNvbnN1bWVyc2VjcmV0Jng9YjQ-&amount=3000&redirect_url="+encodeURIComponent(host+"/api/v1/test123?action=appointment&id="+this.props.params.id+"&");
    }

    _onMeetNo(e) {
        e.preventDefault();

        AppointmentAction.met(this.props.params.id, false, (data) => {

            // redirect to chatroom for negotiation
            browserHistory.push({
                pathname: data.redirectTo,
            });
        }); 

    }

    _onMeetYes(e) {
        e.preventDefault();

        AppointmentAction.met(this.props.params.id, true, () => {
            ToastAction.show("info","答え、ありがとうございます");
        }); 
    }

    render() {
        var appo = this.state.appointment;      
        var isHost = this.isHost();

        var _opponentMessage = "";
        var _opponentPanel = null;

        if(this.state.loadFlag) {

            var afterMeetingTimeFlag = AppointmentStore.isAfterMeetingTime(appo.meeting_time);
            
            if(isHost) {

                if(afterMeetingTimeFlag) {

                    if(appo.paid) {
                        _opponentMessage = 
                            appo.met === AppointmentConst.MET_UNKNOWN ?   'まだ答えていません' :     
                            appo.met === AppointmentConst.MET_NO ?  '「会っていません」と答えました':
                            appo.met === AppointmentConst.MET_YES ? '「会いました！」と答えてくれました' : '???'
                        ;
                    }else {
                        _opponentMessage = "支払われていないので、こちらのアポイントをクローズさせていただきます。";
                    }

                }else {
                    _opponentMessage = 
                        appo.opponent.answer === AppointmentConst.ANSWER_NOT_YET ?   '被紹介者の返信待ち' :     
                        appo.opponent.answer === AppointmentConst.ANSWER_NO_GOING ?  '拒否されました' :
                        appo.opponent.answer === AppointmentConst.ANSWER_YES_GOING ? '支払い完了しました。アポイントの準備しましょう！' : '？？'
                    ;
                    

                    if(appo.opponent.answer === AppointmentConst.ANSWER_NOT_YET) {
                        _opponentPanel = (
                            <div className="col-1 form-btn">
                                <button className="orange" onClick={this._onDelete.bind(this)}>アポイントを削除</button>
                            </div>
                        );    
                    }
                }
                
            }else {

                if( afterMeetingTimeFlag ) {

                    if(appo.paid) {
                        var notAnsweredYet = appo.met === AppointmentConst.MET_UNKNOWN;

                        if(notAnsweredYet) {
                            _opponentPanel = (
                                <div className="col-1 form-btn">
                                    <div>会いましたか？お答えください。</div>
                                    <button className="orange" onClick={this._onMeetYes.bind(this)}>紹介完了</button>
                                    <button className="green" onClick={this._onMeetNo.bind(this)}>紹介者に連絡する</button>
                                </div>
                                );
                        }else {
                            var met = appo.met === AppointmentConst.MET_YES;
                            _opponentMessage = met ? '会いました': '会ってませんでした。紹介者と連絡を取っています。';
                        }
                    }else {
                        _opponentMessage = "支払われていないので、こちらのアポイントをクローズさせていただきます。";
                    }

                }else {
                    _opponentMessage = 
                        appo.opponent.answer === AppointmentConst.ANSWER_NOT_YET ?   '' :     
                        appo.opponent.answer === AppointmentConst.ANSWER_NO_GOING ?  '拒否しました' :
                        appo.opponent.answer === AppointmentConst.ANSWER_YES_GOING ? '支払い完了しました。アポイントの準備しましょう！' : '？？'
                    ;

                    if(appo.opponent.answer === AppointmentConst.ANSWER_NOT_YET) {
                        _opponentPanel = (
                            <div className="col-1 form-btn">

                                <button className="green" onClick={this._onPayment.bind(this)}>支払い画面へ</button>
                                <button className="orange" onClick={this._onAnswerNotGoing.bind(this)}>拒否</button>
                            </div>
                        );
                    }
                }
            }
        }

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content scrollable">
                    <div className="halfPage-title">DETAIL</div>
                    <div className="appointDetail clearfix">
                        <div className="col-2">
                            <label>紹介者</label>
                            <div className="bg-gray">{appo.host.name}</div>
                        </div>
                        <div className="col-2">
                            <label>被紹介者</label>
                            <div className="bg-gray">{appo.opponent.name}</div>
                        </div>
                        <div className="col-1">
                            <label>ゲスト</label>
                            <div className="bg-gray">{appo.guest}</div>
                        </div>
                        <div className="col-2">
                            <label>日時</label>
                            <div className="bg-gray">{appo.meeting_time}</div>
                        </div>
                        <div className="col-2">
                            <label>場所</label>
                            <div className="bg-gray">{appo.place}</div>
                        </div>

                        <div className="appointFund col-1">
                            <p>紹介料</p>
                            <p className="large">　　　3000円</p>
                        </div>
                        <div className="col-1">
                            <label className="status-label">STATUS</label>
                            {_opponentMessage}
                        </div>

                        {_opponentPanel}
                    </div>
                </div>
            </div>
        );
    }
}