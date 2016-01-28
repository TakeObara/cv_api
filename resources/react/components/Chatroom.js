
import ChatroomStore from "../stores/ChatroomStore"
import ChatroomAction from "../actions/ChatroomAction"
import MessageListStore from "../stores/MessageListStore"
import Message from "./Message"
import UserStore from "../stores/UserStore"

var Link = ReactRouter.Link;

export default class Chatroom extends React.Component {

    constructor() {
        super();
        this._loading = true;
        this.state = { 
            chatroom: ChatroomStore.get(0),
        };

        this._onChange = this._onChange.bind(this);
        this.wsUri = "ws://"+(location.hostname === 'localhost' ? 'localhost:13000': 'chat.cvendor.jp');
    }

    componentDidMount() {
        ChatroomStore.addChangeListener(this._onChange);

        // if there is updated in data, _onChange will be fired and data will be updated
        this.loadChatroom();
    }

    componentDidUpdate (prevProps) {
        // respond to parameter change in scenario 3
        let oldId = prevProps.params.id
        let newId = this.props.params.id
        if (newId !== oldId)
            this.loadChatroom()
    }

    loadChatroom() {
        ChatroomAction.loadData(this.props.params.id, true);

        this.ws = new WebSocket(this.wsUri + "/" + this.props.params.id); 
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = function() {
            console.log("Fail to create WebSocket");
        }
    }

    onMessage(ev) {
        var msg    = JSON.parse(ev.data); //PHP sends Json data

        var chatroomId = this.props.params.id;
        var userId     = msg.userId;
        var message    = msg.message;

        ChatroomAction.speak(chatroomId, userId, message);
    }

    componentWillUnmount() {
        this.ws.close();
        ChatroomStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this._loading = false;
        this.setState({chatroom: ChatroomStore.get(this.props.params.id)});
    }

    _chatBoxOnChange(e) {
        this.setState({myText: e.target.value});
    }

    _onSubmit(e) {
        e.preventDefault();
        

        var userId = UserStore.getMyProfile().id;
        var message = this.state.myText.replace(/</g,"&lt;").replace(/>/g,"&gt;");

        this.ws.send(JSON.stringify({userId: userId, message: message}));

        this.setState({myText: ""});
    }

    _fileOnChange(e) {
        e.preventDefault();

        var chatroomId = this.props.params.id;
        var userId     = UserStore.getMyProfile().id;
        var file       = e.target.files[0];
        
        ChatroomStore.upload(chatroomId, userId, file);
    }

    render() {
        var list = [];

        var messages = this.state.chatroom.message;

        for(var i = 0; i < messages.length; i++) {
            var _msg = messages[i];
            list.push(<Message key={i} message={_msg} />);
        }

        var button = null;
        if(this.state.myText && this.state.myText.length > 0) {
            button = (<button className="btnSubmit" type="submit">送信</button>);
        }else {
            button = (<input className="btnSubmit btnUpload" type="file" onChange={this._fileOnChange.bind(this)} />);
        }

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="chatroom content">
                    <div className="chatroomTitle clearfix">
                        <Link to="/chatroom"> ＜ {this.state.chatroom.title}</Link>
                        <Link to="/appointment/create" className="btn-appointment right"><img src="/assets/imgs/ic_note_white.png" /><br/><span>契約を記入する</span></Link>
                    </div>
                    <div className="chatroomMessage scrollable">
                        {list}
                    </div>
                    <div className="chatBox clearfix">
                        <form onSubmit={this._onSubmit.bind(this)} >
                            <input className="formText" value={this.state.myText} onChange={this._chatBoxOnChange.bind(this)} />
                            {button}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}