import {ChatroomListConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";


class ChatroomListAction {
    
    loadAll(force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: ChatroomListConst.LOAD_DATA,
            forceFlag: force
        });
    }

    create(title, users, cb) {
        AppDispatcher.dispatch({
            type: ChatroomListConst.CREATE,
            callback: cb,
            title: title,
            users: users,
        });
    }
}   

export default new ChatroomListAction();