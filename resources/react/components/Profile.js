import ToastAction from "../actions/ToastAction"

import UserAction from "../actions/UserAction"
import UserStore from "../stores/UserStore"

export default class Profile extends React.Component{

    constructor() {
        super();
        
        this.state = {me: UserStore.getMyProfile()};

        this._onChange = this._onChange.bind(this);
    }


    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        console.log("profile component onChange");
        this.setState({me: UserStore.getMyProfile() });
    }

    _handleInput(e) {
        var attr = e.target.getAttribute("name");

        if(e.target.type === 'checkbox') {
            this.state.me[attr] = e.target.checked;
        }else {
            this.state.me[attr] = e.target.value;    
        }
        
        this.setState({me: this.state.me});
    }

    _updateDescription(e) {
        this.state.me.description = e.target.value;
        this.setState({me: this.state.me});
    }

    _profileImageClicked(e) {
        var _uploadElement = e.target.parentNode.getElementsByTagName("input")[0];
        _uploadElement.click();
    }

    _onfileChange(e) {
        console.log(e.target.files);
        UserStore.uploadImage(e.target.files[0]);
    }    

    _save() {
        ToastAction.show("info","updated");
        UserAction.updateMyProfile(this.state.me);
    }

    render() {
        var profileImg = "/assets/imgs/ic_camera.png";
        if(this.state.me.profile_image_url && this.state.me.profile_image_url.length > 0)  {
            profileImg = this.state.me.profile_image_url;
        }

        var prefectures = [];
        for(var index in prefectureList) {

            prefectures.push((<option key={index} value={index}>{prefectureList[index]}</option>));
        }

        return (
            <div className="halfPage profilePage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content scrollable">
                    <div className="halfPage-title">PROFILE</div>
                    <div className="halfPage-group clearfix">
                        <div className="col-half">
                            <button className="profileImage" onClick={this._profileImageClicked.bind(this)}>
                                <img src={profileImg} />
                                <input type="file" onChange={this._onfileChange.bind(this)} />
                            </button>
                        </div>
                        <div className="col-half">
                            <div className="form-group">
                                <label >名前</label>
                                <input value={this.state.me.name} name="name" onChange={this._handleInput.bind(this)}/>
                            </div>

                            <div className="form-group">
                                <label className="orange">WANT</label>
                                <input value={this.state.me.resource_needed} name="resource_needed" onChange={this._handleInput.bind(this)} placeholder="紹介して欲しい人を発信しましょう" />
                            </div>

                            <div className="form-group">
                                <label className="form-group blue">INTRODUCTION</label>
                                <input value={this.state.me.resource_introduce} name="resource_introduce" onChange={this._handleInput.bind(this)} placeholder="紹介できる人を発信しましょう" />
                            </div>

                            <div className="form-group share clearfix">
                                <a className="right btn-gray" target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("http://cvendor.jp")}><img src="/assets/imgs/ic_mice.png" /> 発信する</a>
                            </div>
                        </div>
                    </div>
                    <div className="halfPage-group">
                        <label>自己紹介</label>
                        <textarea cols="5" value={this.state.me.description} onChange={this._updateDescription.bind(this)}/>
                    </div>

                    <div className="halfPage-group">
                        <label>お住まいの地域</label><br/>
                        <select value={this.state.me.place} name="place" onChange={this._handleInput.bind(this)}>
                            {prefectures}
                        </select>
                    </div>

                    <button className="btn right" onClick={this._save.bind(this)}>更新</button>
                    <div className="right isPublic"><input type="checkbox" checked={this.state.me.is_public} name="is_public" onChange={this._handleInput.bind(this)} /> 公開する</div>
                </div>
            </div>
        );
    }
}
