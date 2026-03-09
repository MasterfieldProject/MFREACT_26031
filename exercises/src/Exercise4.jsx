import React from 'react';
import cloud from './cloud.jpg';

export default class MouseTracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mouseX: 0,
            mouseY: 0
        }
    }

    handleMouseMove = (event) => {
        let currentTargetRect = event.currentTarget.getBoundingClientRect();
        const event_offsetX = event.pageX - currentTargetRect.left,
            event_offsetY = event.pageY - currentTargetRect.top;

        this.setState({ mouseX: event_offsetX, mouseY: Math.floor(event_offsetY) });
    }

    render() {
        return (
            <div>
                <img src={cloud} onMouseMove={this.handleMouseMove} /><br />
                {this.state.mouseX} px / {this.state.mouseY} px
            </div>
        )

    }
}