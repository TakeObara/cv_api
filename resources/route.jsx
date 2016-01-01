var routesMap = (function(ReactRouter) {

    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var BrowserHistory = ReactRouter.browserHistory;


    return routesMap = (
        <Router history={BrowserHistory}>
            <Route path="/" component={Main}>
                <Route path="profile" component={Profile} />
                <Route path="favourite" component={Profile} />
                <Route path="messages" component={Profile} />
                <Route path="appointment" component={Appointment} />
            </Route>
        </Router>
    );

})(ReactRouter);
