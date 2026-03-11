import React, { useState } from 'react';

function Image(props) {
    const cnt = props.cnt;
    console.log(cnt);
    return (
        <img src={(cnt % 2 == 0 ? '/smile.png' : '/smile_sad.png')} />
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
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
            <ErrorBoundary>
                <ClickCounter render={(props) => (
                    <Image {...props} />
                )} />
            </ErrorBoundary>
        </div>

    );
}

export default MouseTracker;