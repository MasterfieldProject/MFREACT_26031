import React from 'react';
import pacman from './pacman.jpg';

export default class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            x: getRandom().x,
            y: getRandom().y,
            catched: 0,
            missed: 0,
            interval: 3000
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            this.state.interval
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            x: getRandom().x,
            y: getRandom().y,
            missed: this.state.missed + 1
        });
    }

    handleMouseOver = () => {
        this.setState({
            x: getRandom().x,
            y: getRandom().y,
            catched: this.state.catched + 1,
            interval: this.state.interval - 100
        }, () => { // callback new timer
            this.timerID = setInterval(
                () => this.tick(),
                this.state.interval
            );
        });
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <div>
                    <img src={pacman} style={{ height: 50, position: 'absolute', top: this.state.y, left: this.state.x }}
                        onMouseOver={this.handleMouseOver} />
                </div>
                <div style={{ position: 'absolute', top: 600, left: 500 }}>
                    Elkapott={this.state.catched}<br />
                    Mellé={this.state.missed}
                </div>
            </div>
        );
    }

}

function getRandom() {
    return { x: Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 500) };
}