import React from 'react';

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

    render() {
        return (
            <div>
                <div>
                    
                </div>
            </div>

}

function getRandom() {
    return { x: Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 500) };
}