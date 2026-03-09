import React from "react";
import PropTypes from "prop-types";
import Szemely from "./Exercise1.js";


export default class SzemelyData extends React.Component {

    render() {
        let sz = new Szemely();
        sz.nev = "Kiss János";
        sz.szuletesiido = new Date(1990, 5, 20);
        sz.adoszam = "8123456789";

        return (
            <div>
                <h1>{this.props.title}</h1>
                <ul>
                    {this.props.list.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Név:</th>
                            <th>Születési idő:</th>
                            <th>Adószám:</th>
                            <th>Adószám valid:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{sz.nev}</td>
                            <td>{sz.szuletesiido.toLocaleDateString()}</td>
                            <td>{sz.adoszam}</td>
                            <td>{sz.checkAdoszam().valid ? "Igen" : "Nem"}</td>
                        </tr>
                    </tbody>
                </table>
            </div >
        )
    }

};

SzemelyData.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}