

import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

import ChatroomListStore from "../stores/ChatroomListStore"
import ChatroomListAction from "../actions/ChatroomListAction"

import ChatroomItemList from "./ChatroomItemList"

import NotificationStore from "../stores/NotificationStore"

export default class ChatroomList extends React.Component {

    constructor() {
        super();

        UserAction.loadMyProfile();

        this.state = {
            me: UserStore.getMyProfile(),
            list: ChatroomListStore.getAll(),
        };

        this._onUserChange = this._onUserChange.bind(this);
        this._onChange     = this._onChange.bind(this);
        this._onNotify     = this._onNotify.bind(this);
    }

    _onNotify(e) {
        if(e.currentPath === window.location.pathname) {
            return;
        }

        this.setState({
            list: ChatroomListStore.getAll(true),
        });
    }


    componentDidMount() {
        NotificationStore.addNotifiedListener(this._onNotify)
        UserStore.addChangeListener(this._onUserChange);
        ChatroomListStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        NotificationStore.removeNotifiedListener(this._onNotify);
        UserStore.removeChangeListener(this._onUserChange);
        ChatroomListStore.removeChangeListener(this._onChange);
    }

    _onUserChange() {
        console.log("message component in _onUserChange");
        var _state = this.state;
        _state.me = UserStore.getMyProfile();
        this.setState(_state);
    }

    _onChange() {
        console.log("favourite component in _onChange");
        var _state = this.state;
        _state.list = ChatroomListStore.getAll();
        this.setState(_state);
    }

    render() {

        var list = [];
        for (var i = 0; i < this.state.list.length; i++) {
            var chatroom = this.state.list[i];
            list.push( <ChatroomItemList key={i} info={chatroom} /> );
        }

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content scrollable">
                    <div className="halfPage-title">MESSAGES</div>
                    {list}
                </div>
            </div>
        );
    }
}

