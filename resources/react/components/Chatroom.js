
import ChatroomStore from "../stores/ChatroomStore"
import ChatroomAction from "../actions/ChatroomAction"

import Message from "./message"

var Link = ReactRouter.Link;

export default class Chatroom extends React.Component {

    constructor() {
        super();
        this._loading = true;
        this.state = { 
            chatroom: ChatroomStore.get(0),
        };

        this._onChange = this._onChange.bind(this);
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
    }

    componentWillUnmount() {
        ChatroomStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this._loading = false;
        this.setState({chatroom: ChatroomStore.get(this.props.params.id)});
    }

    _onSubmit(e) {
        e.preventDefault();
    }

    render() {
        var list = [];

        for(var i = 0; i < this.state.chatroom.message.length; i++) {
            var _msg = this.state.chatroom.message[i];
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
                            <input className="formText" />
                            <button className="btnSubmit" type="submit">送信</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}