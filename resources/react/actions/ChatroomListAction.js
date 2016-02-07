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

    markAsRead(chatroomId) {
        AppDispatcher.dispatch({
            type: ChatroomListConst.MARK_AS_READ,
            id: chatroomId,
        });
    }

    updateUnreadChatroomCount(chatroomId) {
        AppDispatcher.dispatch({
            type: ChatroomListConst.UPDATE_UNREAD_COUNT,
            id: chatroomId,
        });   
    }
}   

export default new ChatroomListAction();