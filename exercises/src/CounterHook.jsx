import React, { useState } from 'react';

/*
export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cnt: 0 };
    }

    render() {
        return (
            <div>
                <h2>Counter = {this.state.cnt}</h2>
                <button onClick={() => this.setState(prev => ({ cnt: prev.cnt + 1 }))}>INC</button>
                <button onClick={() => this.setState(prev => ({ cnt: prev.cnt - 1 }))}>DEC</button>
            </div>
        );
    }
}
*/

export default function Counter() {
    /*
    const [cnt, setCnt] = useState(0); // hook, 0-ra inicializalt allapotvaltozo
    const [flag, setFlag] = useState(false);
    */

    const [stateObj, setStateObj] = useState({ cnt: 0, flag: true }); // objektum allapotvaltozo

    return (
        <div>
            <h2>Counter = {stateObj.cnt}</h2>
            <h2>Flag = {"" + stateObj.flag} </h2>
            <button onClick={() => setStateObj(prev => { return { ...prev, cnt: prev.cnt + 1 } })}>INC</button>
            <button onClick={() => setStateObj(prev => { return { ...prev, cnt: prev.cnt - 1 } })}>DEC</button>
        </div>
    );
}
