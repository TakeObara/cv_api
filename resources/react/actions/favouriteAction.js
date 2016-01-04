import {FavouriteConst, ApiPrefix} from "../Constant";
import AppDispatcher from "../Dispatcher";


class FavouriteAction {
    
    loadAll(force) {
        if(typeof force === 'undefined') {
            force = false;
        }

        AppDispatcher.dispatch({
            type: FavouriteConst.LOAD_DATA,
            forceFlag: force
        });
    }

    appendFavourite(userId) {
        AppDispatcher.dispatch({
            type: FavouriteConst.APPEND,
            userId: userId
        });
    }

    removeFavourite(userId) {
        AppDispatcher.dispatch({
            type: FavouriteConst.REMOVE,
            userId: userId
        });
    }
}   

export default new FavouriteAction();