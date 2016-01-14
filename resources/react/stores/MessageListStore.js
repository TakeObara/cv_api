import { ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"
import MessageStore from "./MessageStore"

class MessageListStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        // this.dispatchToken = AppDispatcher.register( (action) => {
        //     switch (action.type) {
        //         case MessageListConst.LOAD_DATA:
        //             this.loadAll(action.forceFlag);
        //         break;
        //         case MessageListConst.CREATE:
        //             this.create(action.title, action.users, action.callback);
        //         break;
        //     }
        // });

        this.data = {};
    }


    instance(chatroomId, userName, profileImageUrl, message) {

        var msg = MessageStore.instance(userName, profileImageUrl, message);

        this.data[chatroomId].shift(msg);

        return msg;
    }

    get(chatroomId) {
        return this.data[chatroomId] || [];
    }
}

export default new MessageListStore();