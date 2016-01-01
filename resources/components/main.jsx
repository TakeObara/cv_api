var Main =  React.createClass({

    render: function() {
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
});

