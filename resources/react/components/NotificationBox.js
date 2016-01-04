export default class NotificationBox extends React.Component {
    
    render() {

        return(
            <span className="notificationBox">{this.props.count}</span>
        );
    }
}