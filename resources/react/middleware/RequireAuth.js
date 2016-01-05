
import AuthEngine from "./AuthEngine";

export default function RequireAuth(nextState, replaceState) {
    var nextStatePathname = nextState.location.pathname;
    if(!AuthEngine.isAuthorized()) {
        replaceState({ nextPathname: nextStatePathname }, '/login')
    }
}