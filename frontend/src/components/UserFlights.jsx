import React, { useState, useEffect } from 'react';
import "../index.css"


function Flights({GetRouteInfo})  {
    const [flight, setFlight] = useState([]);

    useEffect(() => {
        // GET isteği ile uçuş verilerini çekiyoruz
        fetch('http://localhost:5000/api/flights')
            .then(response => response.json())
            .then(data => setFlight(data))
            .catch(error => console.error('Error:', error));
    }, [flight]);


    const deleteFlight = async (flightId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/flights/${flightId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Uçuş silinirken bir hata oluştu');
            }
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <div>
            <h1>Flight List</h1>
            {flight.length > 0 ? (
                <ul className="user-flight-list">
                    {flight.slice().reverse().map((flight, index) => (
                        <li key={index} className="flight-card">
                            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                            {/*<p><strong>Flight Name:</strong> {flight.flightName}</p>*/}
                            {/*<p><strong>Airline Code:</strong> {flight.airlineCode}</p>*/}
                            {/*<p><strong>Aircraft*/}
                            {/*    Type:</strong> {flight.aircraftType.iataMain} ({flight.aircraftType.iataSub})</p>*/}
                            {/*<p><strong>Is Operational Flight:</strong> {flight.isOperationalFlight ? 'Yes' : 'No'}</p>*/}
                            <p><strong>Flight Date:</strong> {new Date(flight.scheduleDateTime).toLocaleString()}</p>
                            <p><strong>Estimated Landing
                                Time:</strong> {new Date(flight.estimatedLandingTime).toLocaleString()}</p>
                            <p><strong>Actual Landing
                                Time:</strong> {new Date(flight.actualLandingTime).toLocaleString()}</p>
                            {/*<p><strong>Baggage Claim:</strong> Belts: {flight.baggageClaim.belts.join(', ')}</p>*/}
                            {/*<p><strong>Public Flight State:</strong> {flight.publicFlightState.flightStates.join(', ')}</p>*/}
                            {/*<p><strong>Route:</strong> {flight.route.destinations.join(', ')}</p>*/}
                            {flight.route && (
                                <p><strong>Route:</strong>
                                    {(() => {
                                        const destinations = flight.route.destinations;
                                        const { transferAirport, finalDestination } = GetRouteInfo(destinations);
                                        return (
                                            <>
                                                {transferAirport ? `Transfer via ${transferAirport} -> ` : ''}
                                                {finalDestination}
                                            </>
                                        );
                                    })()}
                                </p>
                            )}
                            <p><strong>Terminal Section:</strong> {flight.terminal}</p>
                            <p><strong>Last Updated At:</strong> {new Date(flight.lastUpdatedAt).toLocaleString()}</p>

                            <button onClick={() => deleteFlight(flight._id)}>Cancel</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>None</p>
            )}
        </div>
    );
}

export default Flights;
