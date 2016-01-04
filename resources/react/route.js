import Main from "./components/Main" 
import Profile from "./components/Profile" 
import MessagesList from "./components/Messages"
import Favourite from "./components/Favourite" 
import Appointment from "./components/Appointment" 
import Info from "./components/Info"



if(typeof __SERVER === 'undefined') {
    console.log(Main);    
}

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var BrowserHistory = ReactRouter.browserHistory;

var routesMap = (
    <Router history={BrowserHistory}>
        <Route path="/" component={Main}>
            <Route path="profile" component={Profile} />
            <Route path="favourite" component={Favourite} />
            <Route path="messages" component={MessagesList} />
            <Route path="appointment" component={Appointment} />
            <Route path="info" component={Info} />
        </Route>
    </Router>
);

if(typeof __SERVER === 'object') {
    __SERVER.routesMap = routesMap;
}

export default routesMap;