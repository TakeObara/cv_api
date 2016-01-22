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

        var container = null;
        if(AuthEngine.isAuthorized()) {
            container = (
                <div className="container clearfix">
                    <Sidebar />
                    <div className="inner-container">
                        <div className="half-container">
                            {this.props.children}
                        </div>
                        <div className="scrollable half-container">
                            <UserList />
                        </div>
                    </div>
                </div>
            );
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

