import { AppointmentConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

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
                case AppointmentConst.LOAD_DATA:
                    this.loadAll(action.forceFlag);
                break;
                case AppointmentConst.CREATE:
                    this.create(action.formData);
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
            
            // for(var i = 0 ; i < data.length ; i ++) {
            //     if(data[i].profile.profile_image_url.length === 0) {
            //         data[i].profile.profile_image_url = "/assets/imgs/profile_imageless.png";
            //     }    
            // }
            
            this.data = data;
            this.appointment[data.id] = data;
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

    getAll() {
        var dummyData = [];

        return this.data || dummyData;
    }

    get(id) {
        var dummyData = {id:0};
        return this.appointment[id] || dummyData;
    }

}

export default new AppointmentStore();