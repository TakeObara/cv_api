'use strict';

import UserStore from "../stores/UserStore"
var Link = ReactRouter.Link;

export default class Header extends React.Component {

    render() {
        return (
            <header className="clearfix">
                <div className="logo"><span className="white">CONNECTION</span> VENDOR</div>
                <Link to={UserStore.getLogoutLink()} className="btn right">ログアウト</Link>
            </header>
        );
    }
}

