export default class NotificationItem extends React.Component {
    
    _onClick() {
        console.log(this.props.notify);
    }

    render() {
        var notify = this.props.notify;

        return(
            <div className={notify.level + " notificationItem"} onClick={this._onClick.bind(this)}>{notify.message}</div>
        );
    }
}