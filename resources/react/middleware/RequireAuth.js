
import AuthEngine from "./AuthEngine";
import NotificationAction from "../actions/NotificationAction";

export default function RequireAuth(nextState, replaceState) {
    var nextStatePathname = nextState.location.pathname;
    if(!AuthEngine.isAuthorized()) {
        replaceState({ nextPathname: nextStatePathname }, '/login')
    }else {
        NotificationAction.updatePath();
    }
}