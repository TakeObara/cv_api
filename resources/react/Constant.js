
// prefix of api url 
var ApiPrefix = '/api/v1',

    UserConst = {
        
        LOGIN:             'USER_LOGIN',
        LOAD_USER:         'USER_LOAD_USER',
        UPDATE_MY_PROFILE: 'USER_UPDATE_MY_PROFILE',

    },

    UserListConst = {
        LOAD_ALL:           'USERLIST_LOAD_ALL',
    },

    FavouriteConst = {
        LOAD_DATA: 'FAVOURITE_LOAD_DATA',
        APPEND:    'FAVOURITE_APPEND',
        REMOVE:    'FAVOURITE_REMOVE',
    },

    AppointmentConst = {
        LOAD_DATA: 'APPOINTMENT_LOAD_DATA',
        CREATE:    'APPOINTMENT_CREATE',
        MARK_AS_READ: 'APPOINTMENT_MARK_AS_READ',
        DELETE: 'APPOINTMENT_DELETE',
        ANSWER: 'APPOINTMENT_ANSWER',
        MET: 'APPOINTMENT_MET',
        
        ANSWER_NOT_YET: __config.APPOINTMENT_ANSWER_NOT_YET,
        ANSWER_NO_GOING: __config.APPOINTMENT_ANSWER_NO_GOING,
        ANSWER_YES_GOING: __config.APPOINTMENT_ANSWER_YES_GOING,
        MET_UNKNOWN: __config.APPOINTMENT_MET_UNKNOWN,
        MET_NO: __config.APPOINTMENT_MET_NO,
        MET_YES: __config.APPOINTMENT_MET_YES,
        
    },

    MessageConst = {
        LOAD_DATA: 'MESSAGE_LOAD_DATA',
        CREATE:    'MESSAGE_CREATE',
    },

    ChatroomListConst = {
        LOAD_DATA: 'CHATROOMLIST_LOAD_DATA',
        CREATE:    'CHATROOMLIST_CREATE',
        MARK_AS_READ: 'CHATROOMLIST_MARK_AS_READ',
        UPDATE_UNREAD_COUNT: 'CHATROOMLIST_UPDATE_UNREAD_COUNT',
    },

    ChatroomConst = {
        LOAD_DATA: 'CHATROOM_LOAD_DATA',
        SPEAK:     'CHATROOM_SPEAK',
    },

    ToastConst = {
        SHOW:    'TOAST_SHOW',
    },

    NotificationConst = {
        LOAD_DATA:   'NOTIFICATION_LOAD_DATA',
        CHAT:        'NOTIFICATION_CHAT',
        UPDATE_PATH: 'NOTIFICATION_UPDATE_PATH',

        // server constant
        TYPE_MESSAGE       : 1,
        TYPE_APPOINTMENT   : 2,
        TYPE_SYSTEM        : 3,
    },

    ContactConst = {
        SEND:      'CONTACT_SEND',
    },

    ProfileConst = {
        SHOW: 'PROFILE_SHOW',
    }
;

export { 
    ApiPrefix, 
    UserConst, 
    UserListConst, 
    FavouriteConst , 
    AppointmentConst, 
    MessageConst, 
    ChatroomListConst, 
    ChatroomConst, 
    ToastConst, 
    NotificationConst,
    ContactConst,
    ProfileConst
};
