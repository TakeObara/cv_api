import {ChatroomConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";


class ChatroomAction {
    
    loadData(id, force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: ChatroomConst.LOAD_DATA,
            forceFlag: force,
            id: id,
        });
    }

    speak(chatroomId, userId, message) {
        AppDispatcher.dispatch({
            type: ChatroomConst.SPEAK,
            id: chatroomId,
            userId: userId,
            message: message,
        });   
    }
}   

export default new ChatroomAction();