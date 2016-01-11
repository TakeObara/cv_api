import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

import AuthEngine from "../middleware/AuthEngine"

export default class Login extends React.Component{

    constructor() {
        super();
        
        this.email = "";
        this.pwd = "";

        this._onLoginCallback = this._onLoginCallback.bind(this);
    }

    componentDidMount() {

        if(AuthEngine.isAuthorized()) {
            // redirect
            this.redirectToApp();
        }

        UserStore.addChangeListener(this._onLoginCallback);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onLoginCallback);
    }

    _onLoginCallback() {
        if(AuthEngine.isAuthorized()) {
            // login success
            this.redirectToApp();
            
        }else {
            // login fail
        }
    }

    _facebookLogin() {

    }

    _onSubmit() {
        console.log(this.email + " " + this.pwd);
        UserAction.login(this.email,this.pwd);
    }

    _emailOnChange(e) {
        this.email = e.target.value;
    }

    _pwdOnChange(e) {
        this.pwd = e.target.value;
    }

    redirectToApp() {
        if(typeof location === 'object') {
            location.href = "/";
        }
    }

    render() {

        return(
            <div className="loginPage">
                <div className="bg"></div>
                <div className="dark-cover"></div>
                <div className="content">
                    <div style={{fontSize:"40px",color:"#a1d784"}}>WELCOME</div>
                    <br />
                    <p>1回3000円で人を紹介する、してもらうサービス</p>
                    <h1 className="brandname">CONNECTION <span className="blue">VENDOR</span></h1>
                    <p>まずは無料登録しましょう</p>
                    <br />
                    <div className="btn_group">
                        <a className="btn_fb_login" href={facebookLoginUrl}>Facebookアカウントでログインする</a>
                    </div>
                </div>
            </div>
        );
    }
}