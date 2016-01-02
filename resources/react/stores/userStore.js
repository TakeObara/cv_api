import AppDispatcher from "../dispatcher";

class UserStore {
    /**
     * constructor
     */
    constructor() {
        this.dispatchToken = AppDispatcher.register( action => {
            switch (action.type) {
                case UserConst.RECEIVE_TRACKS_BY_ARTIST:
                    this.user = action.tracks;
                break;
                case UserConst.RECEIVE_TRACKS_BY_COUNTRY:
                    tracks = action.tracks;
                break;
            }
        });
    }

    getUser() {
        return this.user;
    }

}

var userStore = new UserStore();