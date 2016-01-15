import {UserConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";

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

    login(email, pwd) {
        AppDispatcher.dispatch({
            type: UserConst.LOGIN,
            email: email,
            pwd: pwd,
        });   
    }
}   

export default new UserAction();