import React from 'react';

export default class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cnt: 0
        }
    }

    increment = () => {
        this.setState((prevState) => ({ cnt: prevState.cnt + 1 }));
    }

    decrement = () => {
        this.setState((prevState) => ({ cnt: prevState.cnt - 1 }));
    }


    render() {
        return (
            <div>
                <h1>Counter = {this.state.cnt}</h1>
                <button onClick={this.increment} >INC</button>
                <button onClick={this.decrement} >DEC</button>
            </div>
        )
    }
}