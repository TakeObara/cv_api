
export default class Message extends React.Component {

    render() {
        var _msg = this.props.message;

        if(typeof _msg.image === 'undefined') {
            _msg.image = "";
        }
        var image = _msg.image.length <= 0 ? "/assets/imgs/profile_imageless.png" : _msg.image;

        return (
            <div className={"messageItem clearfix "+(_msg.me ? "toRight" : "")}>
                <img src={image} />
                <p dangerouslySetInnerHTML={{__html: _msg.message}}></p>
            </div>
        );
    }
}