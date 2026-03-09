import React, { Component } from "react";
const cnt = 5;

var label = "Text";
var newLabel = "Másik szöveg";

const message = <span aria-label={cnt > 2 ? label : newLabel} style={{ color: 'blue' }}> Ez egy üzenet!</span >; // react.createElement();

function isEven(cnt) {
    return cnt % 2 === 0 ? "páros" : "páratlan";
}

export default class App extends Component {
    render = () =>
        <>
            <h4>
                Kapott üzenetek száma {isEven(cnt)}.
                {cnt > 0 && <p>Kapott üzenet: {message}</p>}
            </h4>
            <h4>
                Egy másik üzenet.
            </h4>
            <Table />
        </>
}

class Table extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <Columns />
                    </tr>
                </tbody>
            </table>
        );
    }
}

class Columns extends React.Component {
    render() {
        return (
            <>
                <td>Hello</td>
                <td>World</td>
            </>
        );
    }
}
