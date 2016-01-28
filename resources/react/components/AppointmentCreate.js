import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

import AppointmentStore from "../stores/AppointmentStore";
import AppointmentAction from "../actions/AppointmentAction";

var Link = ReactRouter.Link;
var BrowserHistory = ReactRouter.browserHistory;

export default class AppointmentCreate extends React.Component {

    constructor() {
        super();

        this.state = { 
            appointment: {},
        };

        this._handleInput = this._handleInput.bind(this);
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

    render() {

        var appointment = this.state.appointment;

        return(
            <div className="halfPage appointmentCreatePage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content">
                    <Link to="/chatroom" className="halfPage-title"> ＜ APPOINTMENT</Link>
                    <div className="fence">
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
                        <div className="form-group">
                            <label>紹介者</label>
                            <input name="introduce" value={appointment.introduce} onChange={this._handleInput} />
                        </div>
                        <div className="form-group">
                            <label>被紹介者</label>
                            <input name="introduced" value={appointment.introduced} onChange={this._handleInput} />
                        </div>
                        <div className="form-group">
                            <label>日時</label>
                            <input name="time" value={appointment.time} onChange={this._handleInput} />
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
                    </div>
                </div>
            </div>
        );
    }
}

