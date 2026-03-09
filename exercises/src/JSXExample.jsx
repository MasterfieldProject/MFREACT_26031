import React, { Component } from "react";

const message = "Ez egy üzenet!"
const cnt = 4;

export default class App extends Component {
    render = () =>
        <h4>
            Kapott üzenetek száma {cnt % 2 === 0 ? "páros" : "páratlan"}.
            {cnt > 0 && <p>Kapott üzenet: {message}</p>}
        </h4>
}
