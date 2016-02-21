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
                case UserConst.LOGIN:
                    this.login(action.email, action.pwd);
                break;
            }
        });
    }

    login(email, pwd) {

        var formData = {
            email: email, 
            password: pwd,
        };
        this.ajax("post", ApiPrefix + "/auth/login", (error, data) => {
            if(error) {
                this.emitChange();
                return;
            }
            
            this.myProfile = this.transformResponse(data.profile);
            this.emitChange();
        }, formData);

    }


    loadUser(forceFlag) {
        if(!forceFlag) {
            if(typeof this.myProfile !== 'undefined') {
                this.emitChange();
                return;
            }
        }

        if(window.myProfile !== null) {
            this.myProfile = this.transformResponse(window.myProfile);
            window.myProfile = null;
            this.emitChange();
            return;
        }

        this.ajax("get", ApiPrefix + "/profile/me", (error, data) => {
            if(error) {
                this.emitChange();
                return;
            }
            
            this.myProfile = this.transformResponse(data);
            this.emitChange();
        });
    }

    updateMyProfile(data) {
        var _profile = this.getMyProfile();

        this.ajax("put", ApiPrefix + "/profile/"+_profile.id, (error, data) => {
            if(error) {
                return;
            }

            this.myProfile = this.transformResponse(data);
            this.emitChange();
        }, data);
    }


    uploadImage(file) {

        super.upload("post", ApiPrefix + "/profile/me/upload", file, (error, data) => {
            this.myProfile.profile_image_url = data.message;
            this.emitChange();
        });
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
            amount: 0,
        }

        return this.myProfile || dummyData;
    }

    transformResponse(res) {
        res.id = parseInt(res.user_id);
        res.user_id = parseInt(res.user_id);
        if(res.profile_image_url.length === 0) {
            res.profile_image_url = "/assets/imgs/profile_imageless.png";
        }

        res.place = parseInt(res.place);
        if(isNaN(res.place)) {
            res.place = 0;
        }
        
        return res;
    }

}

export default new UserStore();