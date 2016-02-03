import { NotificationConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

var NOTIFIED_EVENT = "NOTIFIED_EVENT";

class NotificationStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.notifyList = [];

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case NotificationConst.LOAD_DATA:
                    this.loadAll(action.forceFlag);
                break;
                case NotificationConst.CHAT:
                    this.chat(action.chatroomId, action.message);
                break;
            }
        });


        this.wsUri = "ws://"+(location.hostname === 'localhost' ? 'localhost:13000': 'chat.cvendor.jp');

        this.ws = new WebSocket(this.wsUri); 
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = function() {
            console.error("Fail to create WebSocket");
        }
    }

    chat(chatroomId, message) {

        var msg = {
            type:       'chat',
            chatroomId: chatroomId,
            message:    message,
        };
        
        this.ws.send(JSON.stringify(msg));
    }

    appointment(userId, guest, place, meetingTime) {

        var msg = {
            type:        'appointment',
            userId:      userId,
            guest:       guest,
            place:       place,
            meetingTime: meetingTime,
        };
        
        this.ws.send(JSON.stringify(msg));
    }

    onMessage(ev) {
        var msg    = JSON.parse(ev.data); //PHP sends Json data

        this.emit(NOTIFIED_EVENT, msg)
    }

    addNotifiedListener(cb) {
        this.on(NOTIFIED_EVENT, cb);
    }

    removeNotifiedListener(cb) {
        this.removeListener(NOTIFIED_EVENT, cb);    
    }
    
    close() {
        this.ws.close();
    }

    loadAll(forceFlag) {
        if(!forceFlag) {
            if(typeof this.data !== 'undefined') {
                this.emitChange();
                return;
            }
        }

        this.ajax("get", ApiPrefix + "/notification", (error, data) => {
            if(error) {
                return;
            }
            
            this.data = data;
            this.emitChange();
        });
    }

}

export default new NotificationStore();