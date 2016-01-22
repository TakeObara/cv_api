
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
    },

    MessageConst = {
        LOAD_DATA: 'MESSAGE_LOAD_DATA',
        CREATE:    'MESSAGE_CREATE',
    },

    ChatroomListConst = {
        LOAD_DATA: 'CHATROOMLIST_LOAD_DATA',
        CREATE:    'CHATROOMLIST_CREATE',
    },

    ChatroomConst = {
        LOAD_DATA: 'CHATROOM_LOAD_DATA',
        SPEAK:     'SPEAK',
    },

    NotifyConst = {
        NOTIFY:    'NOTIFY',
    }
;

export { ApiPrefix, UserConst, UserListConst, FavouriteConst , AppointmentConst, MessageConst,ChatroomListConst, ChatroomConst, NotifyConst};
