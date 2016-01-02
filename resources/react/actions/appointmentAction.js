import {AppointmentConst, ApiPrefix} from "../constant";
import AppDispatcher from "../dispatcher";


class AppointmentAction {
    
    loadAll(force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: AppointmentConst.LOAD_DATA,
            forceFlag: force
        });
    }

}   

export default new AppointmentAction();