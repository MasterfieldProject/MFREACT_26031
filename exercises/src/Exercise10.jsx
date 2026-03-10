import { useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from 'react-datepicker';
import hu from "date-fns/locale/hu";
registerLocale("hu", hu);

export default function Form() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birthDate: null,
        taxnum: '',
        postcode: '',
        county: '',
        errormsg: '',
        validtaxnum: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name === '') {
            setFormData({ ...formData, errormsg: 'A név megadása kötelező!' });
            return;
        }

    };

    const handleChangeName = (e) => {
        if (e.target.value.match("^[a-zA-Z\\s]*$") != null) {
            setFormData({ ...formData, name: e.target.value });
        }
    }

    return <form method="post" onSubmit={handleSubmit}>
        <Card style={{ margin: '20px', width: '100%' }} bg="info" text="white">
            <Card.Body>
                <Card.Title>Kapcsolat</Card.Title>
                <label>
                    Név<br />
                    <input type="text" name="name" value={formData.name} onChange={handleChangeName} maxLength="25" />
                </label>
                <br />
                <br />
                <br />
                <input type='submit' value='Regisztráció' />
                <br />
                <br />
                {formData.errormsg && <Alert variant='danger'>{formData.errormsg}</Alert>}
            </Card.Body>
        </Card>
    </form >;

}