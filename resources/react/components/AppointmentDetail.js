import AppointmentAction from "../actions/AppointmentAction"
import AppointmentStore from "../stores/AppointmentStore"
import UserStore from "../stores/UserStore"

var Link = ReactRouter.Link;

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

    render() {
        var appo = this.state.appointment;        

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
                    </div>
                </div>
            </div>
        );
    }
}