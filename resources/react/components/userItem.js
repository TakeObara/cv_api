
export default class UserItem extends React.Component{
    
    constructor() {
        super();
    }

    render() {

        var userMeta = this.props.userMeta;

        return (
            <div className="userItem">
                <img src={userMeta.profile_image_url} />
                <div className="userMeta">
                    <div className="userName">{userMeta.name}</div><div className="line"></div>
                    <div className="userDesc">{userMeta.description}</div>
                </div>
            </div>
        )
    } 

}