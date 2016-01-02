import Main from "./components/main" 
import Profile from "./components/profile" 
import Appointment from "./components/appointment" 


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
            <Route path="favourite" component={Profile} />
            <Route path="messages" component={Profile} />
            <Route path="appointment" component={Appointment} />
        </Route>
    </Router>
);

if(typeof __SERVER === 'object') {
    __SERVER.routesMap = routesMap;
}

export default routesMap;