import React, { useState } from "react";

function Current() {
    const initialMinute = 10, initialSeconds = 0;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);

    const [toggle, setToggle] = React.useState(false);
    const [timer, setTimer] = React.useState(0);


    React.useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };


    });

    React.useEffect(() => {
        let counter;
        if (toggle) {
            counter = setInterval(() => setTimer(timer => timer + 1), 1000);
        }
        return () => {
            clearInterval(counter);
        };
    }, [toggle]);

    const handleStart = () => { setToggle(true); };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {minutes === 0 && seconds === 0
                    ? null
                    : <>
                        <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                    </>
                }
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p>Current timer - {timer}</p>
                <button onClick={handleStart}>Start</button>
            </div>

        </>
    );
};

export default Current;
