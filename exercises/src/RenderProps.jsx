import React, { useState } from 'react';

function Image(props) {
    const cnt = props.cnt;
    return (
        <img src={(cnt % 2 == 0 ? '/smile.png' : '/smile_sad.png')} />
    );
}

function Label(props) {
    const cnt = props.cnt;
    return (
        <label style={{ backgroundColor: (cnt % 2 == 0 ? 'red' : 'blue') }} >{props.label} + {cnt}</label>
    );
}


function ClickCounter(props) {
    const [cnt, setCnt] = useState(0);

    function handleMouseClick() {
        setCnt(cnt => cnt + 1);
    }

    if (cnt === 5) {
        throw new Error("Click Counter Error");
    }
    return (
        <div onClick={handleMouseClick}>
            {props.render({ cnt: cnt })}
            <p>CNT = {cnt}</p>
        </div>
    );
}

function MouseTracker() {
    return (
        <div>
            <ClickCounter render={(props) => (
                //<Label label="MyText" {...props} />
                <Image {...props} />
            )} />
        </div>

    );
}

export default MouseTracker;