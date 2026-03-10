import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function Game() {
    // state valtozok
    const [x, setX] = useState(getRandom().x);
    const [y, setY] = useState(getRandom().y);
    const [catched, setCatched] = useState(0);
    const [missed, setMissed] = useState(0);
    const [ival, setIval] = useState(3000);
    const [label, setLabel] = useState(getRandomChar());

    function tick() {
        setX(getRandom().x);
        setY(getRandom().y);
        setMissed(prev => prev + 1);
        setLabel(getRandomChar());
    }

    useEffect(() => {
        const timerID = setInterval(() => tick(), ival);

        return () => {
            clearInterval(timerID);
        }
    }, [ival]); // mount, unmount, ival modositasa

    function handleKeyDown(e) {
        if (e.key === label.toLowerCase()) {
            setCatched(prev => prev + 1);
            setIval(prev => prev - 100);
        } else {
            setMissed(prev => prev + 1);
        }

        setX(getRandom().x);
        setY(getRandom().y);
        setLabel(getRandomChar());
    }

    return (
        <div>
            <div>
                <Button style={{ height: 100, width: 100, position: 'absolute', top: y, left: x }}
                    onKeyDown={handleKeyDown}>{label}</Button>
            </div>
            <div style={{ position: 'absolute', top: 600, left: 500 }}>
                Elkapott={catched}<br />
                Mellé={missed}<br />
                Interval={ival}
            </div>
        </div>
    );
}

function getRandom() {
    return { x: Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 500) };
}

function getRandomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26)).toUpperCase();
}