"use strict";

var Appointment = React.createClass({
    displayName: "Appointment",

    render: function render() {
        return React.createElement(
            "div",
            { className: "users-group" },
            React.createElement("div", { className: "users-item" })
        );
    }
});
"use strict";

var Header = React.createClass({
    displayName: "Header",

    render: function render() {
        return React.createElement(
            "header",
            { className: "clearfix" },
            React.createElement(
                "div",
                { className: "logo" },
                React.createElement(
                    "span",
                    { className: "white" },
                    "CONNECTION"
                ),
                " VENDOR"
            ),
            React.createElement(
                "div",
                { className: "btn-right" },
                "ログアウト"
            )
        );
    }
});
"use strict";

var Main = React.createClass({
    displayName: "Main",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Header, null),
            React.createElement(
                "div",
                { className: "container clearfix" },
                React.createElement(Sidebar, null),
                React.createElement(
                    "div",
                    { className: "inner-container" },
                    React.createElement(
                        "div",
                        { className: "half-container" },
                        this.props.children
                    ),
                    React.createElement(
                        "div",
                        { className: "half-container" },
                        React.createElement(UserList, null)
                    )
                )
            )
        );
    }
});
"use strict";

var Profile = React.createClass({
    displayName: "Profile",

    render: function render() {
        return React.createElement(
            "p",
            null,
            "This is message genereted by ReactJS"
        );
    }
});
'use strict';

var Sidebar = (function (ReactRouter) {

    var Link = ReactRouter.Link;

    return React.createClass({
        render: function render() {

            var activeStyle = {
                'opacity': '1',
                'backgroundColor': 'white'
            };

            return React.createElement(
                'ul',
                { className: 'sidebar' },
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        Link,
                        { to: '/profile', activeStyle: activeStyle },
                        React.createElement('img', { src: '/assets/imgs/ic_people.png' })
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        Link,
                        { to: '/favourite', activeStyle: activeStyle },
                        React.createElement('img', { src: '/assets/imgs/ic_star.png' })
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        Link,
                        { to: '/messages', activeStyle: activeStyle },
                        React.createElement('img', { src: '/assets/imgs/ic_bubble.png' })
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        Link,
                        { to: '/appointment', activeStyle: activeStyle },
                        React.createElement('img', { src: '/assets/imgs/ic_memo.png' })
                    )
                )
            );
        }
    });
})(ReactRouter);
"use strict";

var UserItem = React.createClass({
    displayName: "UserItem",

    render: function render() {
        return React.createElement("div", { className: "user-item" });
    }

});
"use strict";

var UserList = React.createClass({
    displayName: "UserList",

    render: function render() {
        return React.createElement(
            "div",
            { className: "user-group" },
            React.createElement(UserItem, null),
            React.createElement(UserItem, null),
            React.createElement(UserItem, null)
        );
    }
});
"use strict";

var routesMap = (function (ReactRouter) {

    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var BrowserHistory = ReactRouter.browserHistory;

    return routesMap = React.createElement(
        Router,
        { history: BrowserHistory },
        React.createElement(
            Route,
            { path: "/", component: Main },
            React.createElement(Route, { path: "profile", component: Profile }),
            React.createElement(Route, { path: "favourite", component: Profile }),
            React.createElement(Route, { path: "messages", component: Profile }),
            React.createElement(Route, { path: "appointment", component: Appointment })
        )
    );
})(ReactRouter);