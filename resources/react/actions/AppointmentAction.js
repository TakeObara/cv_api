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
    
    markAsRead() {
        AppDispatcher.dispatch({
            type: AppointmentConst.MARK_AS_READ,
        });
    }

    delete(id, cb) {
        AppDispatcher.dispatch({
            type: AppointmentConst.DELETE,
            id: id,
            cb: cb
        });
    }

    answer(id, answer, cb) {
        AppDispatcher.dispatch({
            type: AppointmentConst.ANSWER,
            id: id,
            answer: answer,
            cb: cb,
        });   
    }

}   

export default new AppointmentAction();