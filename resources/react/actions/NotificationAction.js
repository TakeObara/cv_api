import {NotificationConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";


class NotificationAction {

    loadAll(force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: NotificationConst.LOAD_DATA,
            forceFlag: force
        });
    }
        
    chat( chatroomId, message) {
        AppDispatcher.dispatch({
            type: NotificationConst.CHAT,
            chatroomId: chatroomId,
            message: message,
        });
    }

    updatePath() {
        AppDispatcher.dispatch({
            type: NotificationConst.UPDATE_PATH,
        });   
    }

}   

export default new NotificationAction();