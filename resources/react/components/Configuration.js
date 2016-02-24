import ContactForm from "./ContactForm";
import TermPrivacy from "./TermPrivacy";
import Transaction from "./Transaction";

var Link = ReactRouter.Link;

export default class Configuration extends React.Component {

    constructor() {
        super();
    }

    _buildLink(name, toPage, component) {
        var currentPage = this.props.params.page;
        if(currentPage === toPage) {
            return (
            <div>
                <Link to="/configuration" className="item-label">{name}</Link>
                {component}
            </div>
            );
        }else {
            return (<Link to={"/configuration/" + toPage} className="item-label">{name}</Link>);
        }
    }

    render() {

        var page = this.props.params.page;

        return (
            <div className="halfPage">
                <div className="halfPage-cover profile-cover"></div>
                <div className="halfPage-cover dark-cover"></div>
                <div className="content">
                    <div className="halfPage-title">Others</div>
                    <ul className="configurationList">
                        <li>
                            { this._buildLink('利用規約','terms-privacy', (<TermPrivacy />)) }
                        </li>
                        <li>
                            { this._buildLink('問い合わせ','contact', (<ContactForm />)) }
                        </li>
                        <li>
                            <a className="item-label" href="/transaction">ペイメント</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

