import UserStore from "../stores/UserStore";

export default class Transaction extends React.Component {

    constructor() {
        super();
    }


    render() {


        return (
            <div className="page-content clearfix">
                <p>残高：{UserStore.getMyProfile().amount}</p>
            </div>
        );
    }
}

