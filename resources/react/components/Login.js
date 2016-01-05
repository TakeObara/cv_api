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
            <div>
                <h1>Login!!!!</h1>
                <a href={facebookLoginUrl}>Facebook Login</a>
            </div>
        );
    }
}