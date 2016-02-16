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
                case AppointmentConst.DELETE:
                    this.delete(action.id, action.cb);
                break;
                case AppointmentConst.ANSWER:
                    this.answer(action.id, action.answer, action.cb);
                break;
                case AppointmentConst.MET:
                    this.met(action.id, action.meet, action.cb);
                break;
            }
        });
    }


    loadAll(forceFlag) {

        if(!forceFlag && !this.isDataExpired()) {
            return;
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
            
            this.updateDataExpireDate();
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
                res.host        = res.appointment_users[i].user.profile;
                res.host.answer = res.appointment_users[i].answer;
                res.host.read   = res.appointment_users[i].read;
            }else {
                res.opponent        = res.appointment_users[i].user.profile;
                res.opponent.answer = res.appointment_users[i].answer;
                res.opponent.read   = res.appointment_users[i].read;
            }
        }

        return res;
    }

    delete(id, cb) {
        this.ajax("delete", ApiPrefix + "/appointment/"+id, (error) => {
            if(error) {
                return;
            }

            delete this.appointment[id];
            if(typeof cb === 'function') {
                cb();
            }

            this.emitChange();
        });
    }

    answer(id, answer, cb) {

        var formData = {
            answer: answer ? AppointmentConst.ANSWER_YES_GOING : AppointmentConst.ANSWER_NO_GOING,
        };

        this.ajax("put", ApiPrefix + "/appointment/"+id+"/answer", (error) => {
            if(error) {
                return;
            }

            if(typeof cb === 'function') {
                cb();
            }

            this.appointment[id].opponent.answer = formData.answer;

            this.emitChange();
        }, formData);
    }

    met(id, met, cb) {

        var formData = {
            met: met ? AppointmentConst.MET_YES : AppointmentConst.MET_NO,
        };

        this.ajax("put", ApiPrefix + "/appointment/"+id+"/met", (error) => {
            if(error) {
                return;
            }

            if(typeof cb === 'function') {
                cb();
            }

            this.appointment[id].met = formData.met;

            this.emitChange();
        }, formData);
    }

    getAll() {
        var data = [];

        for(var key in this.appointment) {
            data.push(this.appointment[key]);
        }

        return data;
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