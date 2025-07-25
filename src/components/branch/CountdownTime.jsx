import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialSeconds, onTimeout }) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() => {
        if (secondsLeft <= 0) {
            onTimeout();
            return;
        }
        const timerId = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [secondsLeft, onTimeout]);

    // Format mm:ss
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return (
        <div>
            <p>Please make sure to pay within <span className='text-red-500'>{formattedTime}</span> </p>
            {secondsLeft <= 60 && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                    Hurry up! Your reservation will be canceled soon.
                </p>
            )}
        </div>
    );
};

export default CountdownTimer;
