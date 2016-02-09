import { NotificationConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

import ChatroomListAction from "../actions/ChatroomListAction"

var NOTIFIED_EVENT = "NOTIFIED_EVENT";

class NotificationStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.notifyList = {
            chatroom_unread_count: 0,
            appointment_unread_count: 0
        };

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case NotificationConst.LOAD_DATA:
                    this.loadAll(action.forceFlag);
                break;
                case NotificationConst.CHAT:
                    this.chat(action.chatroomId, action.message);
                break;
                case NotificationConst.UPDATE_PATH:
                    this.updateCurrentPath();
                break;
            }
        });


        this.wsUri = "ws://"+(location.hostname === 'localhost' ? 'localhost:13000': 'chat.cvendor.jp');

        this.wsReadyFlag = false;
        this.wsReadyTask = [];
        this.ws = new WebSocket(this.wsUri); 
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = function() {
            console.error("Fail to create WebSocket");
        }
    }

    onOpen() {
        this.wsReadyFlag = true;

        for (var i = 0; i < this.wsReadyTask.length; i++) {
            this.wsReadyTask[i]();
        }
    }

    chat(chatroomId, message) {

        var msg = {
            type:        'chat',
            chatroomId:  chatroomId,
            message:     message,
        };

        this.send(msg);
    }

    appointment(userId, guest, place, meetingTime) {

        var msg = {
            type:        'appointment',
            userId:      userId,
            guest:       guest,
            place:       place,
            meetingTime: meetingTime,
        };
        
        this.send(msg);
    }

    updateCurrentPath() {
        var msg = {
            type: 'update_path',
            currentPath: window.location.pathname,
        }

        this.send(msg);
    }

    onMessage(ev) {
        var msg    = JSON.parse(ev.data); //PHP sends Json data
        if(msg.currentPath !== window.location.pathname) {
            this.updateMyNotification(msg);
        }
        this.emit(NOTIFIED_EVENT, msg)
    }

    updateMyNotification(msg) {
        if(msg.type === 'chat') {

            ChatroomListAction.updateUnreadChatroomCount(parseInt(msg.chatroomId));

            this.notifyList.chatroom_unread_count += 1;
        }else if(msg.type === 'appointment') {
            this.notifyList.appointment_unread_count += 1;
        }
    }

    send(data) {
        if(this.wsReadyFlag) {
            this.ws.send(JSON.stringify(data));
            return;    
        }
        
        this.wsReadyTask.push(() => {
            // clone
            var sendData = {};
            for(var key in data) {
                sendData[key] = data[key];
            }
            this.ws.send(JSON.stringify(sendData));
        });
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

    updateChatroomUnreadCount(_count) {
        this.notifyList.chatroom_unread_count = _count;
        this.emit(NOTIFIED_EVENT, {
            type: 'update_count'
        });
    }

    updateAppointmentUnreadCount() {
        this.notifyList.appointment_unread_count = 0;
        this.emit(NOTIFIED_EVENT, {
            type: 'update_count'
        });
    }

    get() {
        if(myNotification) {
            for(var key in myNotification) {
                this.notifyList[key] = myNotification[key];
            }
            
            myNotification = null;
        }
        return this.notifyList;
    }

    getUnreadChatCount() {
        return this.get().chatroom_unread_count;
    }

    getUnreadAppointmentCount() {
        return this.get().appointment_unread_count;
    }
}

export default new NotificationStore();