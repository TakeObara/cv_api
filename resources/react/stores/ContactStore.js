import { ContactConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

class ContactStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case ContactConst.SEND:
                    this.sendMail(action._text, action._cb);
                break;
            }
        });
    }


    sendMail(text, cb) {
        this.ajax("post", ApiPrefix + "/contact", (error, data) => {
            if(typeof cb === 'function') {
                cb(error, data);
            }
        },{text: text});
    }

}

export default new ContactStore();