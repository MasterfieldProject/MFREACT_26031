import React from 'react';
import { flushSync } from 'react-dom';

export default class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cnt: 0,
            hasButtonClicked: false
        }
    }

    increment = () => {
        /* jo megoldas */
        /*
        this.setState((prevState) => ({ cnt: prevState.cnt + 1 }), () => {
            // callback function, called after the state update is done
            this.setState({ hasButtonClicked: this.state.cnt > 0 })
        })
            */

        /*
        for (let i = 0; i < 5; i++) {
            // this.setState({ cnt: this.state.cnt + 1 }); // rossz
            this.setState((prevState) => ({ cnt: prevState.cnt + 1 })); // updater function, prevState: a state snapshot before the update
            console.log(this.state.cnt);
        }
        */

        // szinkronizálhatók a setState hivasok
        for (let i = 0; i < 5; i++) {
            flushSync(() => {
                this.setState({ cnt: this.state.cnt + 1 });
            });
            console.log(this.state.cnt);
        }

        //this.setState((prevState) => ({ cnt: prevState.cnt + 1 })); // updater function, prevState: a state snapshot before the update

        /* egymastol fuggo valtozok eseten hibas, ha egy setSTate-ben modositom */
        /*
        this.setState({ cnt: this.state.cnt + 1, hasButtonClicked: this.state.cnt > 0 })
        */

        /* egymastol fuggo valtozok eseten hibas a tobb setState hivas */
        /*
        this.setState((prevState) => ({ cnt: prevState.cnt + 1 })); // updater function, prevState: a state snapshot before the update
        this.setState({ hasButtonClicked: this.state.cnt > 0 });
        */



        /* ilyet nem csinalunk, helyette a setState metódust használjuk*/
        /*
        this.state.cnt = this.state.cnt + 1;
        console.log(this.state.cnt);
        */

    }

    decrement = () => {
        this.setState((prevState) => ({ cnt: prevState.cnt - 1 }));
    }


    render() {
        return (
            <div>
                <h1>Counter = {this.state.cnt}</h1>
                <h2>hasButtonClicked = {'' + this.state.hasButtonClicked}</h2>
                <button onClick={this.increment} >INC</button>
                <button onClick={this.decrement} >DEC</button>
            </div>
        )
    }
}