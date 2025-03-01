import React, { useRef, useState } from 'react'

export default function StopWatch() {

    const [sec, setSec] = useState(0);
    const ref = useRef(null);

    const handleStart = () => {
        ref.current = setInterval(() => {
            setSec((prevSec) => prevSec + 1);
        }, 1000)
    }

    const handleStop = () => {
        clearInterval(ref.current);
    }

    const handleReset = () => {
        clearInterval(ref.current);
        setSec(0);
    }

    const formatTime = (sec) => {
        const hours = String(Math.floor(sec / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
        const secs = String(sec % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    return (
        <div className="container text-center mt-5">
            <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "300px" }}>
                <h2 className="mb-4">Stopwatch</h2>
                <div className="display-4 text-primary">{formatTime(sec)} s</div>
                <div className="mt-4">
                    <button className="btn btn-success mx-2" onClick={handleStart}>
                        Start
                    </button>
                    <button className="btn btn-danger mx-2" onClick={handleStop}>
                        Stop
                    </button>
                    <button className="btn btn-secondary mx-2" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}
