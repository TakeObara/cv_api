
class MessageStore {
    /**
     * constructor
     */
    constructor() {

    }


    instance(user, message) {

        return {
            uname: user.name,
            image: user.profile_image_url,
            message: message,
        };
    }
}

export default new MessageStore();