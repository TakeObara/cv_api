import { FavouriteConst, ApiPrefix } from "../constant"
import AppDispatcher from "../dispatcher"
import BaseStore from "./baseStore"

class FavouriteStore extends BaseStore {
    /**
     * constructor
     */
    constructor() {
        super();

        this.dispatchToken = AppDispatcher.register( (action) => {
            switch (action.type) {
                case FavouriteConst.LOAD_DATA:
                    this.loadAll(action.forceFlag);
                break;
                case FavouriteConst.APPEND:
                    this.appendFavourite(action.userId);
                break;
                case FavouriteConst.REMOVE:
                    this.removeFavourite(action.userId);
                break;
            }
        });
    }


    loadAll(forceFlag) {
        if(!forceFlag) {
            if(typeof this.data !== 'undefined') {
                this.emitChange();
            }
        }

        this.ajax("get", ApiPrefix + "/favourite", (error, data) => {
            
            for(var i = 0 ; i < data.length ; i ++) {
                if(data[i].profile.profile_image_url.length === 0) {
                    data[i].profile.profile_image_url = "/assets/imgs/profile_imageless.png";
                }    
            }
            
            this.data = data;
            this.emitChange();
        });
    }

    appendFavourite(userId) {

        this.ajax("put", ApiPrefix + "/favourite/"+userId, (error, data) => {
            this.emitChange();
        });
    }

    removeFavourite(userId) {

        this.ajax("delete", ApiPrefix + "/favourite/"+userId, (error, data) => {
            this.emitChange();
        });
    }

    getAll() {
        var dummyData = [];

        return this.data || dummyData;
    }

}

export default new FavouriteStore();