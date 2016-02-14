import AppointmentAction from "../actions/AppointmentAction"
import AppointmentStore from "../stores/AppointmentStore"
import UserStore from "../stores/UserStore"
import ToastAction from "../actions/ToastAction"

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default class AppointmentDetail extends React.Component {

    constructor() {
        super();
        
        AppointmentAction.loadAll();

        this.state = { 
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
        this.setState({appointment: appointment});
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

    _onAnswerYesGoing(e) {
        e.preventDefault();   

        AppointmentAction.answer(this.props.params.id, true, () => {
            ToastAction.show("info","承諾しました。");
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

        // redirect to payment system
        window.location.href = "https://fastpay.yahoo.co.jp/checkout?key=dj0zaiZpPTdZejV3ZUFNM2dVaiZzPWNvbnN1bWVyc2VjcmV0Jng9YjQ-&amount=3000&redirect_url="+encodeURIComponent("http://localhost:8000/api/v1/test123?action=appointment&id="+this.props.params.id);
    }

    render() {
        var appo = this.state.appointment;      
        var isHost = this.isHost();

        var _hostPanel = null;
        if(isHost) {
            _hostPanel = (
                <div className="col-2">
                    <button onClick={this._onDelete.bind(this)}>キャンセル</button>
                    <button onClick={this._onPayment.bind(this)}>支払う</button>
                </div>
            );
        }else {
            _hostPanel = (
                <div className="col-2">
                    <button onClick={this._onAnswerYesGoing.bind(this)}>承諾する</button>
                    <button onClick={this._onAnswerNotGoing.bind(this)}>拒否する</button>
                </div>
            );
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
                        {_hostPanel}
                    </div>
                </div>
            </div>
        );
    }
}