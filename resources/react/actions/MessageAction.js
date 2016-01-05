import {MessageConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";


class MessageAction {
    
    loadAll(force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: MessageConst.LOAD_DATA,
            forceFlag: force
        });
    }

    create(title, users, cb) {
        AppDispatcher.dispatch({
            type: MessageConst.CREATE,
            callback: cb,
            title: title,
            users: users,
        });
    }
}   

export default new MessageAction();