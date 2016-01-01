"use strict";

var Header = React.createClass({
    displayName: "Header",

    render: function render() {
        return React.createElement(
            "header",
            null,
            React.createElement(
                "div",
                { className: "logo" },
                "CONNECTION VENDOR"
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
                { className: "container" },
                React.createElement(Sidebar, null),
                React.createElement(
                    "div",
                    { className: "inner-container" },
                    this.props.children
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
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            Link,
                            { to: "/profile" },
                            React.createElement("img", { src: "/assets/imgs/ic_people.png" })
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            Link,
                            { to: "/favourite" },
                            React.createElement("img", { src: "/assets/imgs/ic_star.png" })
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            Link,
                            { to: "/messages" },
                            React.createElement("img", { src: "/assets/imgs/ic_bubble.png" })
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            Link,
                            { to: "/profile" },
                            React.createElement("img", { src: "/assets/imgs/ic_memo.png" })
                        )
                    )
                )
            );
        }
    });
})(ReactRouter);
"use strict";

var Message = React.createClass({
    displayName: "Message",

    render: function render() {
        return React.createElement(
            "p",
            null,
            "This is message genereted by ReactJS"
        );
    }
});

var About = React.createClass({
    displayName: "About",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h2",
                null,
                "About"
            ),
            React.createElement(
                ReactRouter.Link,
                { to: "/" },
                "Go Top"
            )
        );
    }
});

var Timer = React.createClass({
    displayName: "Timer",

    getInitialState: function getInitialState() {
        return { secondsElapsed: 0 };
    },
    tick: function tick() {
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    },
    componentDidMount: function componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function componentWillUnmount() {
        clearInterval(this.interval);
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Message, null),
            React.createElement(
                "p",
                null,
                "Seconds Elapsed: ",
                this.state.secondsElapsed
            ),
            this.props.children
        );
    }
});

// ReactDOM.render(React.createElement(HelloMessage, { name: "John" }), mountNode);
// ReactDOM.render(<Timer />, document.getElementById('main'));
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
            React.createElement(Route, { path: "profile", component: Profile })
        )
    );
})(ReactRouter);