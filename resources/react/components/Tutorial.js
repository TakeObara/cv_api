export default class Tutorial extends React.Component {

    constructor() {
        super();
        this.imgs = [
            '/assets/imgs/step1.png',
            '/assets/imgs/step2.png',
            '/assets/imgs/step3.png',
            '/assets/imgs/step4.png',
        ];
        this.leftArrows = [
            '/assets/imgs/left_white.png',
            '/assets/imgs/left_orange.png',
        ];
        this.rightArrows = [
            '/assets/imgs/right_white.png',
            '/assets/imgs/right_orange.png',
        ];
        this.statuses = [
            '/assets/imgs/left1.png',
            '/assets/imgs/left2.png',
            '/assets/imgs/left3.png',
            '/assets/imgs/left4.png',
        ];
        this.point = '/assets/imgs/point.png';

        this.state = {
            count: 0,
            leftArrowCount:  0,
            rightArrowCount: 1
        };
    }

    backClick() {
        this.setState({rightArrowCount: 1});
        if(this.state.count === 0){
            this.setState({
                count: this.state.count,
                leftArrowCount:  0,
            });
        }
        else if(this.state.count === 1){
            this.setState({
                count: this.state.count - 1,
                leftArrowCount:  0,
            });   
        }
        else{
            this.setState({
                count: this.state.count - 1,
                leftArrowCount:  1,
            });
        }
    }

    frontClick() {
        this.setState({leftArrowCount: 1});
        if(this.state.count === this.imgs.length - 1){
            this.setState({
                count: this.state.count,
                rightArrowCount: 0
            });
        }
        else if(this.state.count === this.imgs.length - 2){
            this.setState({
                count: this.state.count + 1,
                rightArrowCount: 0
            });
        }
        else{
            this.setState({
                count: this.state.count + 1,
                rightArrowCount: 1
            });
        }
    }

    render() {
        var background = (<img className='step' src={this.imgs[this.state.count]} />);
        var leftArrow = (<a className='leftArrow' onClick={this.backClick.bind(this)}><img src={this.leftArrows[this.state.leftArrowCount]} /></a>);
        var rightArrow = (<a className='rightArrow' onClick={this.frontClick.bind(this)}><img src={this.rightArrows[this.state.rightArrowCount]} /></a>);
        var point = (<img className='point' src={this.point} />);
        var statusImg = (<img className='status' src={this.statuses[this.state.count]} />);

        return (
            <div className='tutorialPage'>
                { background }
                { leftArrow }
                { point }
                { rightArrow }
                { statusImg }
            </div>
        );
    }
}