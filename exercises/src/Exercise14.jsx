import React, { useContext, useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from 'react-datepicker';
import hu from "date-fns/locale/hu";
registerLocale("hu", hu);

const CountiesContext = React.createContext([
    "Budapest",
    "Bács-Kiskun megye",
    "Baranya megye",
    "Békés megye",
    "Borsod-Abaúj-Zemplén megye",
    "Csongrád megye",
    "Fejér megye",
    "Győr-Moson-Sopron megye",
    "Hajdú-Bihar megye",
    "Heves megye",
    "Jász-Nagykun-Szolnok megye",
    "Komárom-Esztergom megye",
    "Nógrád megye",
    "Pest megye",
    "Somogy megye",
    "Szabolcs-Szatmár-Bereg megye",
    "Tolna megye",
    "Vas megye",
    "Veszprém megye",
    "Zala megye"
]);

export default function Form() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birthDate: null,
        taxnum: '',
        postcode: '',
        county: 'Pest megye',
        errormsg: '',
        validtaxnum: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name === '') {
            setFormData({ ...formData, errormsg: 'A név megadása kötelező!' });
            return;
        }

        if (formData.gender === '') {
            setFormData({ ...formData, errormsg: 'Kötelező a nem kiválasztása!' });
            return;
        }

        if (formData.taxnumber === '') {
            setFormData({ ...formData, errormsg: 'Kötelező az adószám megadása!' });
            return;
        }

        if (!formData.validtaxnumber) {
            setFormData({ ...formData, errormsg: 'Az adószám nincs kitöltve vagy nem érvényes!' });
            return;
        }

        if (formData.postcode === '') {
            setFormData({ ...formData, errormsg: 'Kötelező az irányítószám megadása!' });
            return;
        }

        if (formData.postcode.length !== 4) {
            setFormData({ ...formData, errormsg: 'Irányítószám hibás formátumú!' });
            return;
        }

        setFormData({ ...formData, errormsg: 'OK' });
    };

    const handleChangeName = (e) => {
        if (e.target.value.match("^[a-zA-Z\\s]*$") != null) {
            setFormData({ ...formData, name: e.target.value });
        }
    }

    function validateTaxNumber(taxnum) {
        if (isNaN(taxnum)) {
            console.log("Nem szám!")
            return false;
        }

        if (taxnum.length !== 10) {
            console.log("Nem 10 karakter hosszú!")
            return false;
        }

        const adoArray = [...taxnum];
        if (adoArray[0] !== '8') {
            console.log("Nem 8-cal kezdődik!")
            return false;
        }

        const numOfDays = Math.floor((formData.birthDate - new Date(1867, 0, 1)) / (1000 * 60 * 60 * 24));
        if (adoArray.slice(1, 6).join('') != numOfDays) {
            console.log("Nem egyezik az eltelt napok száma!")
            return false;
        }

        if (getCRC(adoArray.slice(0, 9)) != adoArray[9]) {
            console.log("CRC hiba!")
            return false;
        }

        return true;
    }

    const handleChangeTaxnumber = (e) => {
        var taxnum = e.target.value;

        if (!validateTaxNumber(taxnum)) {
            setFormData({ ...formData, taxnumber: taxnum, validtaxnumber: false });
            return;
        }

        setFormData({ ...formData, taxnumber: taxnum, validtaxnumber: true });
    }

    const handleChangePostcode = (e) => {
        if (e.target.value.match("^[0-9]*$") != null) {
            setFormData({ ...formData, postcode: e.target.value });
        }
    }

    let handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    var date1 = new Date();
    date1.setFullYear(date1.getFullYear() - 18);

    const contextValue = useContext(CountiesContext);
    console.log(contextValue);

    return <form method="post" onSubmit={handleSubmit}>
        <Card style={{ margin: '20px', width: '100%' }} bg="info" text="white">
            <Card.Body>
                <Card.Title>Kapcsolat</Card.Title>
                <label>
                    Név<br />
                    <input type="text" name="name" value={formData.name} onChange={handleChangeName} maxLength="25" />
                </label>
                <br />
                <input type="radio" name="gender" value='male' onChange={handleChange} /> Férfi<br />
                <input type="radio" name="gender" value='female' onChange={handleChange} /> Nő<br />
                <label>
                    Születési idő<br />
                    <DatePicker name="birthdate"
                        dropdownMode="select"
                        showYearDropdown
                        scrollableYearDropdown
                        selected={formData.birthDate}
                        minDate={new Date('1900/01/01')}
                        maxDate={date1}
                        initialDate={date1}
                        dateFormat="yyyy/MM/dd"
                        locale="hu"
                        placeholderText="yyyy/MM/dd"
                        onChange={date => {
                            setFormData({ ...formData, birthDate: date, taxnumber: '' });
                        }} />
                </label>
                <br />
                <label>
                    Adószám<br />
                    <input type="text" name="taxnumber" value={formData.taxnumber} onChange={handleChangeTaxnumber} />
                    {formData.taxnumber !== '' && !formData.validtaxnumber && <span role="img" aria-label="mark"> ❌ </span>}
                    {formData.taxnumber !== '' && formData.validtaxnumber && <span role="img" aria-label="mark"> ✅ </span>}
                </label>
                <br />
                <label>
                    Irányítószám<br />
                    <input type="text" name="postcode" value={formData.postcode} onChange={handleChangePostcode} maxLength="4" />
                </label>
                <br />
                <label>
                    Megye<br />
                    <CountiesContext.Provider value={[...contextValue, 'AAA', 'BBB']} >
                        <select name="county" value={formData.county} onChange={handleChange} >
                            <CountiesContext.Consumer>
                                {counties => counties.map(county => <option key={county} value={county}>{county}</option>)}
                            </CountiesContext.Consumer>
                        </select>
                        <Labels />
                    </CountiesContext.Provider>
                </label>
                <br />
                <br />
                <input type='submit' value='Regisztráció' />
                <br />
                <br />
                {formData.errormsg && formData.errormsg !== 'OK' && <Alert variant='danger'>{formData.errormsg}</Alert>}
                {formData.errormsg && formData.errormsg === 'OK' && <Alert variant='success'>Sikeres regisztráció!</Alert>}
            </Card.Body>
        </Card>
    </form >;

}

const Labels = () => {
    const contextValue = useContext(CountiesContext);
    return <div>
        {contextValue.map(county => <span key={county}>{county} </span>)}
    </div>
}

function getCRC(number) {
    let CRC = 0;
    number.forEach((n, idx) => {
        CRC += n * idx;
    })
    CRC %= 11;

    return CRC;
}