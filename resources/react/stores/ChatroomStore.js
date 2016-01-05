import { ChatroomConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

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

            data = this.transformResponse(data);
            
            this.chatroom[id] = data;
            this.emitChange();
        });
    }

    
    transformResponse(res) {
        res.id = parseInt(res.id);
        return res;
    }

    get(id) {
        var dummyData = {id:0, title: '', message: []};
        return this.chatroom[id] || dummyData;
    }

}

export default new ChatroomStore();