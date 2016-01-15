'use strict';

import UserStore from "../stores/UserStore"
import AuthEngine from "../middleware/AuthEngine"

export default class Header extends React.Component {

    render() {

        var btn = null;
        if(AuthEngine.isAuthorized()) {
            btn = (<a href={UserStore.getLogoutLink()} className="btn right">ログアウト</a>);
        }else {
            btn = (<div className="btn right">ログイン</div>);
        }

        return (
            <header className="clearfix">
                <div className="logo"><span className="white">CONNECTION</span> VENDOR</div>
                {btn}
            </header>
        );
    }
}

