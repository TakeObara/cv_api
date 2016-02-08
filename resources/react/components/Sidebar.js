'use strict';

import NotificationBox from './NotificationBox'
import NotificationStore from '../stores/NotificationStore'

var Link = ReactRouter.Link;

export default class Sidebar extends React.Component {

    constructor() {
        super();

        this._onNotify = this._onNotify.bind(this);
    }

    componentDidMount() {
        
        NotificationStore.addNotifiedListener(this._onNotify)
    
    }

    componentWillUnmount() {
        NotificationStore.removeNotifiedListener(this._onNotify);
    }

    _onNotify(e) {
        if(e.currentPath === window.location.pathname) {
            return;
        }

        this.setState({});
    }


    render() {

        var activeStyle = {
            'opacity': '1',
            'backgroundColor': 'white'
        };

        var chatUnreadCountBox = (<NotificationBox count={ NotificationStore.getUnreadChatCount() }/>);
        var appointmentUnreadCountBox = (<NotificationBox count={ NotificationStore.getUnreadAppointmentCount() }/>);

        return (

            <ul className="sidebar">
                <li>
                    <Link to="/profile"     activeStyle={activeStyle} ><img src="/assets/imgs/ic_people.png" />
                    </Link></li>
                <li>
                    <Link to="/favourite"   activeStyle={activeStyle} ><img src="/assets/imgs/ic_star.png" />
                    </Link>
                </li>
                <li>
                    {chatUnreadCountBox}
                    <Link to="/chatroom"    activeStyle={activeStyle} ><img src="/assets/imgs/ic_bubble.png" />
                    </Link>
                </li>
                <li>
                    {appointmentUnreadCountBox}
                    <Link to="/appointment" activeStyle={activeStyle} ><img src="/assets/imgs/ic_memo.png" />
                    </Link>
                </li>
                <li>
                    <Link to="/configuration" activeStyle={activeStyle} ><img src="/assets/imgs/ic_gear.png" />
                    </Link>
                </li>
                <li>
                    <Link to="/info"        activeStyle={activeStyle} >
                        <img src="/assets/imgs/ic_hatena.png" />
                    </Link>
                </li>
            </ul>

        );
    }
}