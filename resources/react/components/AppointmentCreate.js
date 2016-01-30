import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

import AppointmentStore from "../stores/AppointmentStore";
import AppointmentAction from "../actions/AppointmentAction";


export default class AppointmenFlirt extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content">
                    <div className="halfPage-title">APPOINTMENT</div>
                    <p>This is create</p>
                </div>
            </div>
        );
    }
}

