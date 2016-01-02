import UserAction from "../actions/userAction"
import UserStore from "../stores/userStore"
import UserItem from './userItem';

export default class UserList extends React.Component {

    constructor() {
        super();

        UserAction.loadAll();

        this.state = {
            list: UserStore.getAll(),
        };

        this._onChange     = this._onChange.bind(this)
    }


    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        var _state = this.state;
        _state.list = UserStore.getAll();
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

        console.log(this.state.list);

        return (
            <div className="userListPage clearfix">
                { list }
            </div>
        );
    }
}
