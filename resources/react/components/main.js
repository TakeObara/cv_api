import Header from "./Header";
import Sidebar from "./Sidebar";
import UserList from "./UserList";

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
                        <div className="scrollable half-container">
                            <UserList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

