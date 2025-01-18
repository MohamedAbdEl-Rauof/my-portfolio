"use client";
import { useEffect, useState } from 'react';

export default function Home() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        setCurrentTime(new Date().toLocaleString());
    }, []);

    return (
        <div>
            <h1>Welcome to my portfolio</h1>
            <p>Current time: {currentTime}</p>
        </div>
    );
}