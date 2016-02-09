export default class Tutorial extends React.Component {

    constructor() {
        super();

        this.count = 0;
        this.image = [
            '/assets/imgs/step1.png',
            '/assets/imgs/step2.png',
            '/assets/imgs/step3.png',
            '/assets/imgs/step4.png',
        ];
    }

    _backClick() {
        if(this.count !== 0) this.count--;
        document.getElementById('step').src = this.image[this.count];
    }

    _frontClick() {
        if(this.count !== 3) this.count++;
        document.getElementById('step').src = this.image[this.count];
    }
    render() {
        return (
            <div className="tutorialPage">
                <button onClick={this._frontClick.bind(this)}>進む</button><br/>
                <button onClick={this._backClick.bind(this)}>戻る</button><br/>
                <img id='step' src={this.image[0]} />
            </div>
        );
    }
}