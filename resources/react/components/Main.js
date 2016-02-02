import Header from "./Header"
import Sidebar from "./Sidebar"
import UserList from "./UserList"
import Login from "./Login"
import AuthEngine from "../middleware/AuthEngine"

import NotificationSystem from "./NotificationSystem"

export default class Main extends React.Component{

    componentDidMount() {
        
    }

    render() {

        // var p = this.context.router.getCurrentRoutes();
        var paths = window.location.pathname.split("/");

        var container = null;
        if(AuthEngine.isAuthorized()) {
            if(paths.length > 1 && paths[1] === 'tutorial') {
                container = (
                    <div className="container clearfix">
                        {this.props.children}
                    </div>
                );
                
            }else {
                container = (
                    <div className="container clearfix">
                        <Sidebar />
                        <div className="inner-container">
                            <div className="half-container">
                                {this.props.children}
                            </div>
                            <div className="scrollable half-container userList">
                                <UserList />
                            </div>
                        </div>
                    </div>
                );
            }
        }else {
            container = (
                <div className="container clearfix">
                    <Login />
                </div>
            );
        }

        return (
            <div>
                <Header />
                {container}
                <NotificationSystem ref="notificationSystem"/>
            </div>
        );
    }
}

