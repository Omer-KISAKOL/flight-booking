import React, { useState, useEffect } from 'react';

// Uçuş verilerini çekmek için kullanılan bileşen
const Flights = () => {
    const [flight, setFlight] = useState([]);

    useEffect(() => {
        // GET isteği ile uçuş verilerini çekiyoruz
        fetch('http://localhost:5000/api/flights')
            .then(response => response.json())
            .then(data => setFlight(data))
            .catch(error => console.error('Error:', error));
    }, [flight]);

    return (
        <div>
            <h1>Flight List</h1>
            {flight.length > 0 ? (
                <ul>
                    {flight.map(flight => (
                        <li key={flight.flightNumber}>
                            {flight.flightNumber} - {flight.departureTime} - {flight.destination}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>None</p>
            )}
        </div>
    );
};

export default Flights;
