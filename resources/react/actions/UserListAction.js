import {UserListConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";

class UserListAction {
    
    loadAll(force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: UserListConst.LOAD_ALL,
            forceFlag: force
        });
    }
}   

export default new UserListAction();