import React from 'react';
import table50 from "./50_kph.png";

export default class SpeedLimit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speed: 20
        }
    }

    handleChange = (event) => {
        this.setState({ speed: event.target.value });
    }

    render() {
        return (
            <>
                <div>
                    <h1>Sebessége: {this.state.speed} km/h</h1>
                    <input type="range" min="0" max="200" value={this.state.speed}
                        onChange={this.handleChange} />
                </div>
                {this.state.speed > 50 && <img src={table50} alt="speed limit exceeded" style={{ width: '10%', height: '10%' }} />}
            </>
        )
    }
}