import { AppointmentConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

import NotificationStore from "./NotificationStore"

class AppointmentStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.appointment = {};

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case AppointmentConst.LOAD_DATA:
                    this.loadAll(action.forceFlag);
                break;
                case AppointmentConst.CREATE:
                    this.create(action.formData);
                break;
                case AppointmentConst.MARK_AS_READ:
                    this.markAsRead();
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

        this.ajax("get", ApiPrefix + "/appointment", (error, data) => {
            if(error) {
                return;
            }
            
            for(var i = 0 ; i < data.length ; i ++) {
                var appo = data[i];
                appo = this.transformResponse(appo);
                this.appointment[appo.id] = appo;
            }
            

            this.data = data;
            this.emitChange();
        });
    }

    create(formData) {

        var cb = formData.cb;
        delete formData.cb;

        this.ajax("post", ApiPrefix + "/appointment", (error, data) => {
            if(error) {
                return;
            }
            this.loadAll(true);

            if(typeof cb === 'function') {
                cb(data);
            }

        }, formData);
    }

    transformResponse(res) {
        res.id = parseInt(res.id);
        res.host_user_id = parseInt(res.host_user_id);

        for (var i = 0; i < res.appointment_users.length; i++) {
            var userId = parseInt(res.appointment_users[i].user_id);

           if(res.host_user_id === userId) {
                res.host = res.appointment_users[i].user.profile;
            }else {
                res.opponent = res.appointment_users[i].user.profile;
            }
        }

        return res;
    }

    getAll() {
        var dummyData = [];

        return this.data || dummyData;
    }

    get(id) {
        var dummyData = {id:0,host: {}, opponent: {}};
        return this.appointment[id] || dummyData;
    }

    markAsRead() {
        
        NotificationStore.updateAppointmentUnreadCount();

        this.ajax("put", ApiPrefix + "/appointment/markAsRead",() => {});
    }

}

export default new AppointmentStore();