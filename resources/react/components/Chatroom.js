
import ChatroomStore from "../stores/ChatroomStore"
import ChatroomAction from "../actions/ChatroomAction"
import MessageListStore from "../stores/MessageListStore"
import Message from "./message"
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
        ChatroomAction.loadData(this.props.params.id);

        this.ws = new WebSocket(this.wsUri + "/" + this.props.params.id); 
        this.ws.onmessage = this.onMessage.bind(this);
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

        this.ws.send(JSON.stringify({userId: userId, message: this.state.myText}));

        this.setState({myText: ""});
    }

    render() {
        var list = [];

        var messages = this.state.chatroom.message;

        for(var i = 0; i < messages.length; i++) {
            var _msg = messages[i];
            list.push(<Message key={i} message={_msg} />);
        }

        return (
            <div className="halfPage">
                <div className="halfPage-cover dark-cover"></div>
                <div className="chatroom content">
                    <div className="chatroomTitle"><Link to="/chatroom"> ＜ {this.state.chatroom.title}</Link></div>
                    <div className="chatroomMessage scrollable">
                        {list}
                    </div>
                    <div className="chatBox clearfix">
                        <form onSubmit={this._onSubmit.bind(this)} >
                            <input className="formText" value={this.state.myText} onChange={this._chatBoxOnChange.bind(this)} />
                            <button className="btnSubmit" type="submit">送信</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}