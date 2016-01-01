'use strict';

var Sidebar = (function(ReactRouter) {

var Link = ReactRouter.Link;

return React.createClass({
    render: function() {
        return (
            <div>
                <ul>
                    <li><Link to="/profile"><img src="/assets/imgs/ic_people.png" /></Link></li>
                    <li><Link to="/favourite"><img src="/assets/imgs/ic_star.png" /></Link></li>
                    <li><Link to="/messages"><img src="/assets/imgs/ic_bubble.png" /></Link></li>
                    <li><Link to="/profile"><img src="/assets/imgs/ic_memo.png" /></Link></li>
                </ul>
            </div>
        );
    }
});

})(ReactRouter);
