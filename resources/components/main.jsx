var Main =  React.createClass({

    render: function() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Sidebar />
                    <div className="inner-container">
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

