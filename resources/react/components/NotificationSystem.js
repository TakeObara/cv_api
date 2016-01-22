import {NotifyConst} from "../Constant"
import AppDispatcher from "../Dispatcher"

export default class NotificationSystem extends React.Component {

    constructor() {
        super();
        this.notifyList = [];
        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case NotifyConst.NOTIFY:
                    this.notify(action.level, action.message);
                break;
            }
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        AppDispatcher.unregister(this.dispatchToken);
    }

    notify(level, message) {

        var timeoutId = setTimeout(() => {
            this.removeNotifyById(timeoutId);
        }, 7000);

        this.notifyList.push({
            id: timeoutId,
            level: level,
            message: message,
        });

        this.setState(this.notifyList);
    }

    removeNotifyById(id) {
        for(var i = 0; i < this.notifyList.length; i++) {
            if(this.notifyList[i].id === id) {
                this.notifyList.splice(i, 1);
                break;
            }
        }
        this.setState(this.notifyList);
    }

    _onClick(i, e) {
        var notify = this.notifyList[i];
        this.removeNotifyById(notify.id);
        clearTimeout(notify.timeoutId);
    }

    render() {

        var items = [];
        for (var i = 0; i < this.notifyList.length; i++) {
            items.push(<div key={i} onClick={this._onClick.bind(this, i)} className={this.notifyList[i].level + " notificationItem"}>{this.notifyList[i].message}</div>);
        }

        return(
            <div className="notificationSystem">
                {items}
            </div>
        );
    }
}