
import AppointmentStore from "../stores/AppointmentStore"
import UserStore from "../stores/UserStore"

var Link = ReactRouter.Link;

export default class AppointmentDetail extends React.Component {

    constructor() {
        super();
        
        this.state = { 
            appointment: AppointmentStore.get(0),
        };

        this._onChange = this._onChange.bind(this);
    }

    // componentDidMount() {
    //     // ChatroomStore.addChangeListener(this._onChange);

    //     // if there is updated in data, _onChange will be fired and data will be updated
    //     // this.loadChatroom();
    // }

    // componentDidUpdate (prevProps) {
    //     // respond to parameter change in scenario 3
    //     let oldId = prevProps.params.id
    //     let newId = this.props.params.id
    //     if (newId !== oldId)
    //         this.loadChatroom()
    // }


    // componentWillUnmount() {
    //     // ChatroomStore.removeChangeListener(this._onChange);
    // }

    _onChange() {
        
    }

    render() {
        

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content">
                    <p>This is detail</p>
                </div>
            </div>
        );
    }
}