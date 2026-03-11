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

const NoMatch = () => {
    let location = useLocation();

    return <div>Nem található a keresett oldal (<code>{location.pathname}</code>)</div>;
}

const Login = ({ isLoggedIn, login, logout }) => {
    return isLoggedIn ?
        <Button variant="info" onClick={logout}>Kijelentkezés</Button> :
        <LoginDialog login={login} />
};

function LoginDialog({ login }) {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleLogin() {
        if (login(username, password)) {
            setShow(false);
        } else {
            setError('Hibás felhasználónév vagy jelszó!');
        }
    }

    return <>
        <Button variant="primary" onClick={() => setShow(true)}>Bejelentkezés</Button>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Bejelentkezés</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Felhasználónév</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Jelszó</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>Mégse</Button>
                <Button variant="primary" onClick={handleLogin}>Bejelentkezés</Button>
            </Modal.Footer>
        </Modal>
    </>
}