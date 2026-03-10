import React, { useState, useEffect } from 'react';


export default function Example_CustomHook() {

    const happyPress = useKeyPress('h');
    const sadPress = useKeyPress('s');
    const robotPress = useKeyPress('r');
    const foxPress = useKeyPress('f');

    return (
        <div>
            <Welcome title="React" />
            <div>h, s, r, f</div>
            <div>
                {happyPress && '😊'}
                {sadPress && '😢'}
                {robotPress && '🤖'}
                {foxPress && '🦊'}
            </div>
        </div>
    );
}

/*
function Welcome() {
    return <div>
        <h1>Welcome to React</h1>
    </div>
}
*/
const Welcome = (props) => <div><h1>Welcome to {props.title}</h1></div>;

function useKeyPress(targetKey) {

    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({ key }) => { // key: akutalis lenyomott billentyu
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });

    return keyPressed;
}