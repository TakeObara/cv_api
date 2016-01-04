import { UserConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

class UserStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case UserConst.LOAD_USER:
                    this.loadUser(action.forceFlag);
                break;
                case UserConst.UPDATE_MY_PROFILE:
                    this.updateMyProfile(action.data);
                break;
                case UserConst.LOAD_ALL:
                    this.loadAll(action.forceFlag);
                break;
            }
        });
    }


    loadUser(forceFlag) {
        if(!forceFlag) {
            if(typeof this.myProfile !== 'undefined') {
                this.emitChange();
                return;
            }
        }

        this.ajax("get", ApiPrefix + "/profile/me", (error, data) => {
            this.myProfile = data;
            if(this.myProfile.profile_image_url.length === 0) {
                this.myProfile.profile_image_url = "/assets/imgs/profile_imageless.png";
            }
            this.emitChange();
        });
    }

    updateMyProfile(data) {
        var _profile = this.getMyProfile();

        this.ajax("put", ApiPrefix + "/profile/"+_profile.id, (error, data) => {
            if(error) {
                return;
            }

            this.myProfile = data;
            if(this.myProfile.profile_image_url.length === 0) {
                this.myProfile.profile_image_url = "/assets/imgs/profile_imageless.png";
            }
            this.emitChange();
        }, data);
    }

    getLogoutLink() {
        return ApiPrefix + "/auth/logout";
    }

    getMyProfile() {
        var dummyData = {
            id: 0,
            name: "",
            description: "",
            profile_image_url: "/assets/imgs/profile_imageless.png",
        }

        return this.myProfile || dummyData;
    }

    loadAll(forceFlag) {
        if(!forceFlag) {
            if(typeof this.data !== 'undefined') {
                this.emitChange();
                return;
            }
        }

        this.ajax("get", ApiPrefix + "/profile", (error, data) => {
            
            for(var i = 0 ; i < data.length ; i ++) {
                if(data[i].profile_image_url.length === 0) {
                    data[i].profile_image_url = "/assets/imgs/profile_imageless.png";
                }    
            }
            
            this.data = data;
            this.emitChange();
        });
    }

    getAll() {
        var dummyData = [];

        return this.data || dummyData;
    }

}

export default new UserStore();