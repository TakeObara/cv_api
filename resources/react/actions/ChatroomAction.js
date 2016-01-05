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
}   

export default new ChatroomAction();