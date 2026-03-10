import React from 'react';

export default class EventHandling extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cnt: 0 }

        //this.increment = this.increment.bind(this); // this context binding
    }

    /*
    increment(msg) {
        this.setState({ cnt: this.state.cnt + 1 });
        console.log(msg);
    }
        */

    increment = (msg) => (event) => { // fuggvenykifejezes, autobind
        this.setState({ cnt: this.state.cnt + 1 });
        console.log(msg);
        console.log(event); // synthetic event, wrapper az eredeti DOM event korul
    }

    handleClick = (event) => {
        console.log("The link was clicked.");
        event.preventDefault(); // megakadályozza a link alapértelmezett működését
        console.log(event.type);
    }

    handleClickButton = (event) => {
        console.log('handleClickButton event type=' + event.type);
        event.stopPropagation();
    }

    handleDivClick = (event) => {
        console.log('handleDivClick event type=' + event.type);
    }

    handleChildClick = (event) => {
        console.log('handleChildClick event type=' + event.type);
    }

    render() {
        var msg = "This is a message";
        return (
            <>
                <div>
                    <h1>Counter: {this.state.cnt}</h1>
                    <button onClick={this.increment(msg)}>INC</button>
                </div>
                <div>
                    <a href="https://hwsw.hu" onClick={this.handleClick}>LINK</a>
                </div>
                <div>
                    <div onClick={this.handleDivClick}>Click
                        <button onClick={this.handleClickButton} className="btn btn-primary">Button</button>
                    </div>
                </div>
                <div>
                    <Child ev1={this.handleChildClick} ev2={this.handleClick} />
                </div>
            </>
        );
    }
}

class Child extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <button onClick={this.props.callbackFn} >Child</button>;
    }
}