import React, { useEffect, useState } from "react";

function UserFetcher() {
    const [user, setUser] = useState();
    // State to store user data

    useEffect(() => {
        // Fetch user data 
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json()) // Convert response to JSON
            .then((data) => setUser(data[0])) // Store the first user in state
            .catch((error) => console.error("Error fetching user data:", error));
    }, []); // Runs only once when the component mounts,because of empty []

    // If user data is not yet fetched, render nothing
    if (!user) return null;

    return (
        <>
            <h2> User Data</h2>
            <p>NAME : {user.name}</p>
            <p>EMAIL : {user.email}0</p>
        </>
    );
}

export default UserFetcher;
