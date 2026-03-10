import React, { useEffect, useState } from 'react';

/*
export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cnt: 0 };
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.cnt} times`;
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.cnt} times`;
    }

    render() {
        return (
            <div>
                <h2>Counter = {this.state.cnt}</h2>
                <button onClick={() => this.setState(prev => { return { cnt: prev.cnt + 1 } })}>INC</button>
                <button onClick={() => this.setState(prev => { return { cnt: prev.cnt - 1 } })}>DEC</button>
            </div>
        );
    }
}
*/

export default function Counter(props) {
    const [cnt, setCounter] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${cnt} times`;

        return () => {
            console.log('cleanup');
        }
    }, [cnt]); // mount, unmount, update

    useEffect(() => {
        document.title = `First time`;
    }, []); // mount, unmount

    return (
        <div>
            <h1>{props.list[0]}</h1>
            <h2>Counter = {cnt}</h2>
            <button onClick={() => setCounter(prev => prev + 1)}>INC</button>
            <button onClick={() => setCounter(prev => prev - 1)}>DEC</button>

        </div>
    );
}
