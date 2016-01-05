import Header from "./Header";
import Sidebar from "./Sidebar";
import UserList from "./UserList";
import MainHalfPage from "./MainHalfPage";

export default class Main extends React.Component{

    render() {

        var halfPage = null;
        // if(this.props.children === null) {
        //     halfPage = (<MainHalfPage />)
        // }else {
            halfPage = this.props.children;
        // }

        return (
            <div>
                <Header />
                <div className="container clearfix">
                    <Sidebar />
                    <div className="inner-container">
                        <div className="half-container">
                            {halfPage}
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

