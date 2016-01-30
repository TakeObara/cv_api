'use strict';

import UserStore from "../stores/UserStore"
import AuthEngine from "../middleware/AuthEngine"

export default class Header extends React.Component {

    render() {

        var btn = null;
        var titleImg = "/assets/imgs/title.png";
        if(AuthEngine.isAuthorized()) {
            btn = (<a href={UserStore.getLogoutLink()} className="btn right">ログアウト</a>);
        }else {
            btn = (<div className="btn right">ログイン</div>);
        }

        return (
            <header className="clearfix">
                <div className="logo"><img src={titleImg} /></div>
                {btn}
            </header>
        );
    }
}

