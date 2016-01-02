import Header from "./header";
import Sidebar from "./sidebar";
import UserList from "./userList";


export default class Main extends React.Component{

    render() {
        return (
            <div>
                <Header />
                <div className="container clearfix">
                    <Sidebar />
                    <div className="inner-container">
                        <div className="half-container">
                            {this.props.children}    
                        </div>
                        <div className="half-container">
                            <UserList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

