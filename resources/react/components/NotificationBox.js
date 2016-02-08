export default class NotificationBox extends React.Component {
    
    render() {
        if(this.props.count > 0) {
            return (<span className="notificationBox">{this.props.count}</span>);
        }

        return null;
    }
}