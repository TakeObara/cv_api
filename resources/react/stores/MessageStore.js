
import UserStore from "./UserStore"

class MessageStore {
    /**
     * constructor
     */
    constructor() {

    }


    instance(user, message) {

        var myId = UserStore.getMyProfile().id;

        return {
            me: myId === user.user_id,
            uname: user.name,
            image: user.profile_image_url,
            message: message,
        };
    }
}

export default new MessageStore();