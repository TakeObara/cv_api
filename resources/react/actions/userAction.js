import {UserConst, ApiPrefix} from "../constant";
import AppDispatcher from "../dispatcher";

class UserAction {
    
    loadAll(force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: UserConst.LOAD_ALL,
            forceFlag: force
        });
    }

    loadMyProfile(force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: UserConst.LOAD_USER,
            forceFlag: force
        });
    }

    updateMyProfile(data) {
        AppDispatcher.dispatch({
            type: UserConst.UPDATE_MY_PROFILE,
            data: data
        });
    }
}   

export default new UserAction();