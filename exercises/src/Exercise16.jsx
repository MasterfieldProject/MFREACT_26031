import React, { useEffect, useState } from 'react';
import { Alert, Button, Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Form(props) {
    const [state, setState] = useState({
        amount: 0,
        selectedCur: ""
    });

    function handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        });
    }

    return <Row className="justify-content-md-center p-2">
        <Col md={3}>
            <input name="amount" type="text" value={state.amount} onChange={handleChange} className="form-control" />
        </Col>
        <Col md={2}>
            <select name="selectedCur" value={state.selectedCur} onChange={handleChange} className="form-control">
                {Object.keys(props.rates).sort().map(i => <option key={i} value={i}>{i}</option>)}
            </select >
        </Col>
        <Col md={3}>
            <label className="form-control">= {
                (state.amount / props.rates[state.selectedCur]).toLocaleString('hu-HU', { maximumFractionDigits: 2 })} HUF</label>
        </Col>
    </Row>
}

export default function App() {
    const [state, setState] = useState({
        base: "",
        date: "",
        rates: {},
        errorMsg: "OK",
    });

    useEffect(() => {
        getRates()
    }, []);

    function getRates() {
        console.log("getRates() called")
        //const API = 'http://api.exchangerate.host/live?source=USD&access_key=55525b9bbb220e5667acb9300e8e9406';
        const API = 'http://localhost:3000/data';
        fetch(API)
            .then(response => {
                console.log(response.status)
                if (!response.ok) {
                    throw new Error('HTTP hiba, státusz kód = ' + response.status);
                }
                return response.json();

            })
            .then(responseData => setState({ ...state, base: responseData.base, rates: responseData.quotes }))
            .catch(err => { console.log(err.message); setState({ ...state, errorMsg: err.message }) }); // TypedError
    }


    return (<Container className="w-50" >
        <Form rates={state.rates} />
        <Row>
            <Col md={{ span: 2, offset: 2 }}>
                <Rates rates={state.rates} />
            </Col>
            <Col md={{ span: 5, offset: 2 }}>
                <Alert variant={state.errorMsg !== "OK" ? 'danger' : 'success'}>
                    {state.errorMsg}
                </Alert>
            </Col>
        </Row>
    </Container >);
}

function Rates(props) {

    return <div className="w-25">
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Valuta</th>
                    <th>Középárfolyam</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.rates).sort().map(i =>
                    <tr key={i}>
                        <td sm={2}>{i}</td>
                        <td sm={2}>{(1 / props.rates[i]).toLocaleString('hu-HU', { maximumFractionDigits: 2 })}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>;
}
