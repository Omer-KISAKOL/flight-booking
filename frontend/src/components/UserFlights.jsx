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

    console.log(flight);

    return (
        <div>
            <h1>Flight List</h1>
            {flight.length > 0 ? (
                <ul>
                    {flight.map((flight, index) => (
                        <li key={index} className="user-flight-card">
                            <h3>Flight Number: {flight.flightNumber}</h3>
                            <p><strong>Flight Name:</strong> {flight.flightName}</p>
                            <p><strong>Airline Code:</strong> {flight.airlineCode}</p>
                            {/*<p><strong>Aircraft Type:</strong> {flight.aircraftType.iataMain} ({flight.aircraftType.iataSub})</p>*/}
                            <p><strong>Is Operational Flight:</strong> {flight.isOperationalFlight ? 'Yes' : 'No'}</p>
                            <p><strong>Last Updated At:</strong> {new Date(flight.lastUpdatedAt).toLocaleString()}</p>
                            <p><strong>Estimated Landing Time:</strong> {new Date(flight.estimatedLandingTime).toLocaleString()}</p>
                            <p><strong>Actual Landing Time:</strong> {new Date(flight.actualLandingTime).toLocaleString()}</p>
                            {/*<p><strong>Baggage Claim:</strong> Belts: {flight.baggageClaim.belts.join(', ')}</p>*/}
                            {/*<p><strong>Public Flight State:</strong> {flight.publicFlightState.flightStates.join(', ')}</p>*/}
                            {/*<p><strong>Route:</strong> {flight.route.destinations.join(', ')}</p>*/}
                            <p><strong>Schedule Date:</strong> {new Date(flight.scheduleDateTime).toLocaleDateString()}</p>
                            <p><strong>Terminal:</strong> {flight.terminal}</p>
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
