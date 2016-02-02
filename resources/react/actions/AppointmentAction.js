import {AppointmentConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";


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


    create(formData) {

        AppDispatcher.dispatch({
            type: AppointmentConst.CREATE,
            formData: formData,
        });

    }
    

}   

export default new AppointmentAction();