'use strict';

import NotificationBox from './NotificationBox'
var Link = ReactRouter.Link;

export default class Sidebar extends React.Component {

    render() {

        var activeStyle = {
            'opacity': '1',
            'backgroundColor': 'white'
        };

        var noticeCount = 10;
        var noticeBox = (<NotificationBox count={noticeCount}/>);

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
                    {noticeBox}
                    <Link to="/chatroom"    activeStyle={activeStyle} ><img src="/assets/imgs/ic_bubble.png" />
                    </Link>
                </li>
                <li>
                    <Link to="/appointment" activeStyle={activeStyle} ><img src="/assets/imgs/ic_memo.png" />
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