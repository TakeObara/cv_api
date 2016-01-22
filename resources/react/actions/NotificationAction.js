import {NotifyConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";


class NotificationAction {
    
    notify(level, message) {
        AppDispatcher.dispatch({
            type: NotifyConst.NOTIFY,
            level: level,
            message: message,
        });
    }

}   

export default new NotificationAction();