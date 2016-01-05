import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"


class AuthEngine {
    
    constructor() {
        UserAction.loadMyProfile();
    }    

    isAuthorized() {
        return UserStore.getMyProfile().id !== 0;
    }
}

export default new AuthEngine();