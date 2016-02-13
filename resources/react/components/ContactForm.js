
import ToastAction from "../actions/ToastAction"
import ContactAction from "../actions/ContactAction"
import ContactStore from "../stores/ContactStore"

export default class ContactForm extends React.Component {

    constructor() {
        super();

        this.state = {
            text: "",
        };
    }

    _handleInput(e) {
        this.setState({text: e.target.value});
    }

    _sent(error) {
        if(error) {
            ToastAction.show("error","メッセージを入れてください。");    
            return;        
        }

        ToastAction.show("info","送信しました。");
        this.setState({text: ""});
    }

    _submit(e) {
        e.preventDefault();
        ContactAction.sendMail(this.state.text, this._sent.bind(this));
    }

    render() {
        return (
            <div className="page-content contactForm clearfix">
                <textarea value={this.state.text} onChange={this._handleInput.bind(this)}/>
                <button onClick={this._submit.bind(this)}>送信</button>
            </div>
        );
    }   

}