import { MessageConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

class MessageStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case MessageConst.LOAD_DATA:
                    this.loadAll(action.forceFlag);
                break;
                case MessageConst.CREATE:
                    this.create(action.title, action.users, action.callback);
                break;
            }
        });
    }


    loadAll(forceFlag) {
        if(!forceFlag) {
            if(typeof this.data !== 'undefined') {
                this.emitChange();
                return;
            }
        }

        this.ajax("get", ApiPrefix + "/chatroom", (error, data) => {
            if(error) {
                this.emitChange();
                return;
            }
            
            // for(var i = 0 ; i < data.length ; i ++) {
            //     if(data[i].profile.profile_image_url.length === 0) {
            //         data[i].profile.profile_image_url = "/assets/imgs/profile_imageless.png";
            //     }    
            // }
            
            this.data = data;
            this.emitChange();
        });
    }

    create(title, users, callback) {

        var formData = {
            title: title,
            users: users
        };

        this.ajax("post", ApiPrefix + "/chatroom", (error, chatroom) => {
            if(error) {
                callback(error, chatroom);
                this.emitChange();
                return;
            }
            
            this.data.push(chatroom);
            callback(false, chatroom);
            this.emitChange();
        }, formData);
    }

    getAll() {
        var dummyData = [];

        return this.data || dummyData;
    }

}

export default new MessageStore();