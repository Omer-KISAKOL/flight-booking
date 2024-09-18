import React, { useState, useEffect } from 'react';

const FlightsSchiphol = () => {
    const [flight, setFlight] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Backend üzerinden Schiphol API'den uçuş verilerini çekiyoruz
        fetch('http://localhost:5000/api/schiphol-flights')
            .then(response => response.json())
            .then(data => {
                setFlight(data.flights); // Schiphol API'den gelen uçuşları state'e koyuyoruz
                console.log(data.flights)
            })
            .catch(error => console.error('Error fetching flights:', error));
    }, []);

    const handleFlightSubmit = async () => {
        try {
            // Seçilen uçuşu backend'e POST ediyoruz
            const response = await fetch('http://localhost:5000/api/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedFlight),
            });

            const data = await response.text();
            setMessage(data); // POST işleminden dönen mesajı saklıyoruz
        } catch (error) {
            console.error('Error posting flight:', error);
            setMessage('Bir hata oluştu.');
        }
    };

    return (
        <div>
            <h1>Schiphol Uçuşları</h1>

            {flight.map((flight, index) => (
                <>
                <div key={index} className="flight-card">
                    <h3>Flight Number: {flight.flightNumber}</h3>
                    <p><strong>Flight Name:</strong> {flight.flightName}</p>
                    <p><strong>Airline Code:</strong> {flight.airlineCode}</p>
                    <p><strong>Aircraft Type:</strong> {flight.aircraftType.iataMain} ({flight.aircraftType.iataSub})</p>
                    <p><strong>Is Operational Flight:</strong> {flight.isOperationalFlight ? 'Yes' : 'No'}</p>
                    <p><strong>Last Updated At:</strong> {new Date(flight.lastUpdatedAt).toLocaleString()}</p>
                    <p><strong>Estimated Landing Time:</strong> {new Date(flight.estimatedLandingTime).toLocaleString()}</p>
                    <p><strong>Actual Landing Time:</strong> {new Date(flight.actualLandingTime).toLocaleString()}</p>
                    <p><strong>Baggage Claim:</strong> Belts: {flight.baggageClaim.belts.join(', ')}</p>
                    <p><strong>Public Flight State:</strong> {flight.publicFlightState.flightStates.join(', ')}</p>
                    <p><strong>Route:</strong> {flight.route.destinations.join(', ')}</p>
                    <p><strong>Schedule Date:</strong> {new Date(flight.scheduleDateTime).toLocaleDateString()}</p>
                    <p><strong>Terminal:</strong> {flight.terminal}</p>
                </div>
                <button onClick={() => setSelectedFlight(flight)}>Seç</button>
                </>
            ))}


            {selectedFlight && (
                <div>
                    <h2>Seçilen Uçuş:</h2>
                    <p>{selectedFlight.flightNumber} - {selectedFlight.origin} - {selectedFlight.destination}</p>
                    <button onClick={handleFlightSubmit}>Uçuşu Kaydet</button>
                </div>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default FlightsSchiphol;
