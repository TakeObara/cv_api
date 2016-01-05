import { ChatroomListConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

class ChatroomListStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case ChatroomListConst.LOAD_DATA:
                    this.loadAll(action.forceFlag);
                break;
                case ChatroomListConst.CREATE:
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

            chatroom = this.transformResponse(chatroom);

            if(error) {
                callback(error, chatroom);
                this.emitChange();
                return;
            }
            
            if( !this.validateIfExists(chatroom.id) ) {
                this.data.push(chatroom);    
            }
            
            
            callback(false, chatroom);
            this.emitChange();
        }, formData);
    }

    validateIfExists(chatroomId) {
        for (var i = 0; i < this.data.length; i++) {
            if(this.data[i].id === chatroomId) {
                return true;
            }
        }
        return false;
    }

    transformResponse(res) {
        res.id = parseInt(res.id);
        return res;
    }

    getAll() {
        var dummyData = [];

        return this.data || dummyData;
    }

}

export default new ChatroomListStore();