import {ContactConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";

class ContactAction {
    
    sendMail(text, cb) {
        AppDispatcher.dispatch({
            type: ContactConst.SEND,
            _text: text,
            _cb: cb,
        });
    }
}   

export default new ContactAction();