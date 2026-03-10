import React from 'react';
import cloud from './cloud.jpg';

export default class MouseTracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mouseX: 0,
            mouseY: 0,
            inputText: "",
            reverseText: ""
        }
    }

    handleMouseMove = (event) => {
        let currentTargetRect = event.currentTarget.getBoundingClientRect();
        const event_offsetX = event.pageX - currentTargetRect.left,
            event_offsetY = event.pageY - currentTargetRect.top;

        this.setState({ mouseX: event_offsetX, mouseY: Math.floor(event_offsetY) });
    }

    handleInput = (event) => {
        this.setState({ inputText: event.target.value, reverseText: event.target.value.split("").reverse().join("") });
    }

    render() {
        return (
            <>
                <div>
                    <img src={cloud} onMouseMove={this.handleMouseMove} /><br />
                    {this.state.mouseX} px / {this.state.mouseY} px
                </div>
                <div>
                    <input onChange={this.handleInput} value={this.state.inputText} /><br /><br />
                    <input readOnly value={this.state.reverseText} />
                </div>
            </>
        )

    }
}