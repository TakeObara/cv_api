import {ToastConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";


class ToastAction {
    
    show(level, message) {
        AppDispatcher.dispatch({
            type: ToastConst.SHOW,
            level: level,
            message: message,
        });
    }

}   

export default new ToastAction();