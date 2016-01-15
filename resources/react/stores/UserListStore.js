import { UserListConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"
import UserStore from "./UserStore"

class UserListStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case UserListConst.LOAD_ALL:
                    this.loadAll(action.forceFlag);
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

        this.ajax("get", ApiPrefix + "/profile", (error, data) => {
            if(error) {
                this.emitChange();
                return;
            }
            
            for(var i = 0 ; i < data.length ; i ++) {
                data[i] = UserStore.transformResponse(data[i]);
            }
            
            this.data = data;
            this.emitChange();
        });
    }

    getAll() {
        var dummyData = [];
        return this.data || dummyData;
    }

    getAllWithoutMe() {
        var dummyData = [];

        var me = UserStore.getMyProfile();
        var dataWithoutMe = [];
        var data = this.data || dummyData;
        for (var i = 0; i < data.length; i++) {
            if(data[i].id != me.id) {
                dataWithoutMe.push(data[i]);
            }
        }

        return dataWithoutMe;
    }

}

export default new UserListStore();