import { ChatroomConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"
import MessageStore from "./MessageStore"
import UserStore from "./UserStore"
import NotificationStore from "./NotificationStore";

class ChatroomStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.chatroom = {};

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case ChatroomConst.LOAD_DATA:
                    this.loadData(action.id ,action.forceFlag);
                break;
                case ChatroomConst.SPEAK:
                    this.speak(action.id, action.userId, action.message);
                break;
            }
        });
    }


    loadData(id, forceFlag) {
        if(!forceFlag) {
            if(typeof this.chatroom[id] !== 'undefined') {
                this.emitChange();
                return;
            }
        }

        this.ajax("get", ApiPrefix + "/chatroom/"+id, (error, data) => {

            if(error) {
                this.emitChange();
                return;
            }
            
            // for(var i = 0 ; i < data.length ; i ++) {
            //     if(data[i].profile.profile_image_url.length === 0) {
            //         data[i].profile.profile_image_url = "/assets/imgs/profile_imageless.png";
            //     }    
            // }

            // data.message = [{userId: 4, message: "aaaa"},{userId: 4, message: "bbbb"},{userId: 4, message: "cccc"}];
            data = this.transformResponse(data);
            
            this.chatroom[id] = data;
            this.emitChange();
        });
    }

    upload(_id, userId, files) {
        super.upload("post", "/api/v1/chatroom/"+_id+"/upload", files, (result, res) => {
            
            var _src = res.message.destination_path + res.message.filename;
            this.speak(_id, userId, "<img src=\""+_src+"\">");    
            
            
            this.emitChange();
        });
    }

    transformResponse(res) {
        res.id = parseInt(res.id);
        res.unread_count = parseInt(res.unread_count);

        for (var i = 0; i < res.message.length; i++) {

            var message = res.message[i].message;
            var user = {profile: {}};  // dummy object
            for (var u = 0; u < res.users.length; u++) {
                if(res.users[u].id == res.message[i].user_id) {
                    user = res.users[u];
                    break;
                }
            }

            res.message[i] = MessageStore.instance(user.profile, message);
        }

        return res;
    }

    speak(_id, userId, message) {

        var users = this.chatroom[_id].users;
        var user = {profile: {}};  // dummy object
        for (var u = 0; u < users.length; u++) {
            if(users[u].id == userId) {
                user = users[u];
                break;
            }
        }


        this.chatroom[_id].message.push(MessageStore.instance(user.profile, message));
        this.emitChange();
    }

    get(id) {
        var dummyData = {id:0, title: '', message: [], users:[], unread_count: 0};
        return this.chatroom[id] || dummyData;
    }

    getOpponent(_id) {
        var opponent = {profile: {}};
        var myUserId = UserStore.getMyProfile().user_id;
        var chatroom = this.get(_id);
        
        for (var i = 0; i < chatroom.users.length; i++) {
            var _user = chatroom.users[i];
            if(parseInt(_user.id) !== myUserId) {
                opponent = _user;
                break;
            }
        }

        return opponent;
    }

}

export default new ChatroomStore();