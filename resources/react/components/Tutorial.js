export default class Tutorial extends React.Component {

    constructor() {
        super();

        this.count = 1;
        this.imgs = [
            '/assets/imgs/step1.png',
            '/assets/imgs/step2.png',
            '/assets/imgs/step3.png',
            '/assets/imgs/step4.png',
            '/assets/imgs/step5.png',
        ];
        this.arrows = [
            '/assets/imgs/left_orange.png',
            '/assets/imgs/left_white.png',
            '/assets/imgs/right_orange.png',
            '/assets/imgs/right_white.png',
        ];
        this.point = '/assets/imgs/point.png';
    }

    backClick() {
        if(this.count !== 0) this.count--;
        this._setImages(this.count);
    }

    frontClick() {
        if(this.count !== this.imgs.length) this.count++;
        this._setImages(this.count);
    }

    _setImages(count) {
        document.getElementById('step').src = this.imgs[count];
        switch(count){
            case 0:
                document.getElementById('leftArrow').src = this.arrows[1];
                break;
            case 4:
                document.getElementById('rightArrow').src = this.arrows[3];
                break;
            default:
                document.getElementById('leftArrow').src  = this.arrows[0];
                document.getElementById('rightArrow').src = this.arrows[2];
        }
    }

    render() {
        return (
            <div className='tutorialPage'>
                <img id='step' src={this.imgs[0]} />
                <a className='leftArrow' onClick={this.backClick.bind(this)}><img id='leftArrow' src={this.arrows[1]} /></a>
                <img className='point' src={this.point} />
                <a className='rightArrow' onClick={this.frontClick.bind(this)}><img id='rightArrow' src={this.arrows[2]} /></a>
            </div>
        );
    }
}