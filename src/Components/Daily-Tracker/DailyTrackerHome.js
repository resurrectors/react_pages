import React, { useEffect } from 'react';

export default function DailyTrackerHome() {

    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                console.log("Permission status:", permission);
            });
        }
    }, []); // Runs only once when the component mounts

    const sendNotification = () => {
        if (Notification.permission === "granted") {
            new Notification("Hello!", {
                body: "This is a notification from your React app.",
                icon: "/path-to-icon.png", // optional
            });
        } else {
            console.log("Notification permission not granted");
        }
    };

    return (
        <div>
            <h1>DailyTrackerHome</h1>
            <button onClick={sendNotification}>Send Notification</button>
        </div>
    );
}
