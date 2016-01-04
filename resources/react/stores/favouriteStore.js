import { FavouriteConst, ApiPrefix } from "../Constant"
import AppDispatcher from "../Dispatcher"
import BaseStore from "./BaseStore"
import UserListStore from "./UserListStore"

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
                return;
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
        // after update data, reload data again
        this.ajax("put", ApiPrefix + "/favourite/"+userId, (error, data) => {
            this.loadAll(true);
            // UserListStore.loadAll(true);
        });
    }

    removeFavourite(userId) {
        // after update data, reload data again
        this.ajax("delete", ApiPrefix + "/favourite/"+userId, (error, data) => {
            this.loadAll(true);
            // UserListStore.loadAll(true);
        });
    }

    isFavourite(userId) {
        if(typeof this.data === 'undefined') {
            return false;
        }
        
        for (var i = 0; i < this.data.length; i++) {
            if( this.data[i].id === parseInt(userId)) {
                return true;
            }
        }
        return false;
    }

    getAll() {
        var dummyData = [];

        return this.data || dummyData;
    }

}

export default new FavouriteStore();