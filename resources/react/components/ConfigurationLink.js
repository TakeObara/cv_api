var Link = ReactRouter.Link;

export default class ConfigurationLink extends React.Component {

    render() {
        var toPage = this.props.toPage;
        var currentPage = this.props.params.page;

        console.log(toPage);
        console.log(currentPage);
        
        return (
            <Link to="/configuration/terms-privacy" className="item-label">利用規約</Link>
        );
    }
    
}