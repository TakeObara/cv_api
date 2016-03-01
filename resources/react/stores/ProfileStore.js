import { ProfileConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"

class ProfileStore extends BaseStore {

	/**
     * constructor
     */
    constructor() {
        super();

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch(action.type) {
            	case ProfileConst.SHOW:
            		this.getProfile(action.userId);
            	break;
            }
        });
    }

    getProfile(userId) {
    	this.ajax('get', ApiPrefix + '/profile/' + userId, (error, data) => {}, userId);
    }

}

export default new ProfileStore();