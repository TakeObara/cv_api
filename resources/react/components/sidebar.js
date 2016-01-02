'use strict';

var Link = ReactRouter.Link;

export default class Sidebar extends React.Component {

    render() {

        var activeStyle = {
            'opacity': '1',
            'backgroundColor': 'white'
        };

        return (

            <ul className="sidebar">
                <li><Link to="/profile"     activeStyle={activeStyle} ><img src="/assets/imgs/ic_people.png" /></Link></li>
                <li><Link to="/favourite"   activeStyle={activeStyle} ><img src="/assets/imgs/ic_star.png" /></Link></li>
                <li><Link to="/messages"    activeStyle={activeStyle} ><img src="/assets/imgs/ic_bubble.png" /></Link></li>
                <li><Link to="/appointment" activeStyle={activeStyle} ><img src="/assets/imgs/ic_memo.png" /></Link></li>
            </ul>

        );
    }
}