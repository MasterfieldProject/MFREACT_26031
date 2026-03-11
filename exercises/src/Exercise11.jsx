import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import { Button, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function UserApp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (username, password) => {
        if (username === 'user' && password === 'pass') {
            setIsLoggedIn(true);
            return true;
        }
        return false;
    }

    const logout = () => {
        setIsLoggedIn(false);
    }

    return <Router>
        <Login isLoggedIn={isLoggedIn} login={login} logout={logout} />
        <ul>
            <li>
                <Link to="/personal">Személyes adatok</Link>
            </li>
            <li>
                <Link to="/contact">Kapcsolat</Link>
            </li>
        </ul>
        <Routes>
            <Route path="/" element={isLoggedIn ? <PersonalInfo /> : <NotLoggedIn />} />
            <Route path="/personal" element={isLoggedIn ? <PersonalInfo /> : <NotLoggedIn />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </Router>

}

const PersonalInfo = () => <div>Személyes adatok</div>;
const Contact = () => <div>Kapcsolat</div>;
const NotLoggedIn = () => <div>Nincs bejelentkezve!</div>;
const NoMatch = () => <div>Nem található az oldal</div>;

const Login = ({ isLoggedIn, login, logout }) => {
    return isLoggedIn ? <Button variant="info" onClick={logout}>Kijelentkezés</Button> : <Button variant="primary" onClick={() => login('user', 'pass')}>Bejelentkezés</Button>
};
