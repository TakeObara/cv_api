import UserItem from './userItem';

export default class UserList extends React.Component {
    render() {
        return (
            <div className="user-group">
                <UserItem />
                <UserItem />
                <UserItem />
            </div>
        );
    }
}
