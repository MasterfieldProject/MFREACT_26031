import React, { useState, useEffect, use } from 'react';
import { Alert, Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CurrencyCalc() {
    const [rates, setRates] = useState({});
    const [errorMsg, setErrorMsg] = useState('OK');


    function getRates() {
        console.log('fetching rates');
        // const API = 'http://api.exchangerate.host/live?source=HUF&access_key=55525b9bbb220e5667acb9300e8e9406';
        const API = 'http://localhost:3000/data'

        fetch(API, { method: 'GET' })
            .then(response => {
                console.log('response received : ' + response.status);
                if (!response.ok) {
                    throw new Error('Hiba a szerverrel való kommunikáció során! (' + response.status + ')');
                }
                return response.json();
            })
            .then(data => {
                setRates(data.quotes);
                setErrorMsg('OK');
            })
            .catch(error => {
                setErrorMsg(error.message);
            });
    }

    useEffect(() => {
        getRates();
    }, []);

    return <Container className="w-100" >
        <Form rates={rates} />
        <Row>
            <Col md={{ span: 2, offset: 2 }}>
                <Rates rates={rates} />
            </Col>
            <Col />
            <Col md={{ span: 4, offset: 2 }}>
                <Alert variant={errorMsg != "OK" ? 'danger' : 'success'}>{errorMsg}</Alert>
            </Col>
        </Row>
    </Container >

}

function Form({ rates }) {
    const [amount, setAmount] = useState(0);
    const [selectedCur, setSelectedCur] = useState('EUR');

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'amount') {
            setAmount(value);
        } else if (name === 'selectedCur') {
            setSelectedCur(value);
        }
    }

    return <Row className="justify-content-md-center p-2">
        <Col md={3}>
            <input name="amount" type="text" value={amount} onChange={handleChange} className="form-control" />
        </Col>
        <Col md={2}>
            <select name="selectedCur" value={selectedCur} onChange={handleChange} className="form-control">
                {Object.keys(rates).sort().map(i => <option key={i} value={i}>{i}</option>)}
            </select >
        </Col>
        <Col md={5}>
            <label className="form-control">= {(amount / rates[selectedCur]).toLocaleString('hu-HU', { maximumFractionDigits: 2 })} HUF</label>
        </Col>

    </Row>
}

function Rates({ rates }) {

    return <div className="w-25">
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Valuta</th>
                    <th>Középárfolyam</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(rates).sort().map(i =>
                    <tr key={i}>
                        <td sm={2}>{i}</td>
                        <td sm={2}>{(1 / rates[i]).toLocaleString('hu-HU', { maximumFractionDigits: 2 })}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    </div>;
}