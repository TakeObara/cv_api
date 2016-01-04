import UserListAction from "../actions/UserListAction"
import UserListStore from "../stores/UserListStore"
import UserItem from './UserItem';

export default class UserList extends React.Component {

    constructor() {
        super();

        UserListAction.loadAll();

        this.state = {
            list: UserListStore.getAll(),
        };

        this._onChange     = this._onChange.bind(this)
    }


    componentDidMount() {
        UserListStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserListStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        console.log("userList component onChange");
        var _state = this.state;
        _state.list = UserListStore.getAll();
        this.setState(_state);
    }

    render() {

        var list = [];
        for (var i = 0; i < this.state.list.length; i++) {
            var _user = this.state.list[i];
            list.push(
                <UserItem key={i} userMeta={_user} />
            );
        }

        return (
            <div className="userListPage clearfix">
                { list }
            </div>
        );
    }
}
