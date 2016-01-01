
var Message = React.createClass({
    render: function() {
        return (
            <p>This is message genereted by ReactJS</p>
        );
    }
});

var About = React.createClass({
    render: function() {
        return (
            <div>
                <h2>About</h2>
                <ReactRouter.Link to="/">Go Top</ReactRouter.Link>
            </div>
        );
    }
});

var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>
            <Message />
            <p>Seconds Elapsed: {this.state.secondsElapsed}</p>

            {this.props.children}
      </div>
    );
  }
});


// ReactDOM.render(React.createElement(HelloMessage, { name: "John" }), mountNode);
// ReactDOM.render(<Timer />, document.getElementById('main'));