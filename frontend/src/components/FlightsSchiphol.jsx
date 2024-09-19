import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import "../index.css"

const FlightsSchiphol = () => {
    const [flight, setFlight] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleFlightNumberChange = (event) => {
        setFlightNumber(event.target.value);
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const query = new URLSearchParams({
            scheduleDate: selectedDate,
            flightNumber: flightNumber,
        }).toString();

        // Backend üzerinden Schiphol API'den uçuş verilerini çekiyoruz
        fetch(`http://localhost:5000/api/schiphol-flights?${query}`)
            .then(response => response.json())
            .then(data => {
                setFlight(data.flights); // Schiphol API'den gelen uçuşları state'e koyuyoruz
                console.log(data.flights)
            })
            .catch(error => console.error('Error fetching flights:', error));

    };


    // if (selectedDate === '' || selectedDate === null || selectedDate === undefined) {
    //
    // }
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
        <div className="flight-schiphol">
            <h1>Schiphol Uçuşları</h1>

            <div className="flight-schiphol">
                <Link className="link" to="/Flights">Flights</Link>
            </div>



            <form onSubmit={handleFilterSubmit} className="flight-filter">
                <div>
                    <label htmlFor="scheduleDate">Schedule Date:</label>
                    <input
                        type="date"
                        id="scheduleDate"
                        name="scheduleDate"
                        value={selectedDate}
                        onChange={handleDateChange}
                        required={true}
                    />
                </div>
                <div>
                    <label htmlFor="flightNumber">Flight Number:</label>
                    <input
                        type="text"
                        id="flightNumber"
                        name="flightNumber"
                        value={flightNumber}
                        onChange={handleFlightNumberChange}
                    />
                </div>
                <button type="submit">Search Flights</button>
            </form>

            {flight.length > 0 ?(
                flight.map((flight, index) => (
                        <div className="flight-list">
                            <div key={index} className="flight-card">
                                <h3>Flight Number: {flight.flightNumber}</h3>
                                <p><strong>Flight Name:</strong> {flight.flightName}</p>
                                <p><strong>Airline Code:</strong> {flight.airlineCode}</p>
                                {/*<p><strong>Aircraft Type:</strong> {flight.aircraftType.iataMain} ({flight.aircraftType.iataSub})</p>*/}
                                <p><strong>Is Operational Flight:</strong> {flight.isOperationalFlight ? 'Yes' : 'No'}
                                </p>
                                <p><strong>Schedule Date:</strong> {new Date(flight.scheduleDateTime).toLocaleString()}
                                </p>
                                <p><strong>Estimated Landing
                                    Time:</strong> {new Date(flight.estimatedLandingTime).toLocaleString()}</p>
                                <p><strong>Actual Landing
                                    Time:</strong> {new Date(flight.actualLandingTime).toLocaleString()}
                                </p>
                                {/*<p><strong>Baggage Claim:</strong> Belts: {flight.baggageClaim.belts.join(', ')}</p>*/}
                                {/*<p><strong>Public Flight State:</strong> {flight.publicFlightState.flightStates.join(', ')}</p>*/}
                                {/*<p><strong>Route:</strong> {flight.route.destinations.join(', ')}</p>*/}
                                <p><strong>Terminal:</strong> {flight.terminal}</p>
                                <p><strong>Last Updated At:</strong> {new Date(flight.lastUpdatedAt).toLocaleString()}
                                </p>
                            </div>
                            <button onClick={() => setSelectedFlight(flight)}>Seç</button>
                        </div>
                ))
            ):(
                <p>No flights found.</p>
            )}


            {selectedFlight && (
                <div className="selected-flight-card">
                    <h2>Seçilen Uçuş:</h2>
                    <div className="flight-list">
                        <div className="flight-card">
                            <h3>Flight Number: {selectedFlight.flightNumber}</h3>
                            <p><strong>Flight Name:</strong> {selectedFlight.flightName}</p>
                            <p><strong>Airline Code:</strong> {selectedFlight.airlineCode}</p>
                            {/*<p><strong>Aircraft Type:</strong> {selectedFlight.aircraftType.iataMain} ({selectedFlight.aircraftType.iataSub})</p>*/}
                            <p><strong>Is Operational Flight:</strong> {selectedFlight.isOperationalFlight ? 'Yes' : 'No'}
                            </p>
                            <p><strong>Schedule Date:</strong> {new Date(selectedFlight.scheduleDateTime).toLocaleString()}
                            </p>
                            <p><strong>Estimated Landing
                                Time:</strong> {new Date(selectedFlight.estimatedLandingTime).toLocaleString()}</p>
                            <p><strong>Actual Landing
                                Time:</strong> {new Date(selectedFlight.actualLandingTime).toLocaleString()}
                            </p>
                            {/*<p><strong>Baggage Claim:</strong> Belts: {selectedFlight.baggageClaim.belts.join(', ')}</p>*/}
                            {/*<p><strong>Public Flight State:</strong> {selectedFlight.publicFlightState.flightStates.join(', ')}</p>*/}
                            {/*<p><strong>Route:</strong> {selectedFlight.route.destinations.join(', ')}</p>*/}
                            <p><strong>Terminal:</strong> {selectedFlight.terminal}</p>
                            <p><strong>Last Updated At:</strong> {new Date(selectedFlight.lastUpdatedAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <button onClick={handleFlightSubmit}>Uçuşu Kaydet</button>
                </div>
            )}

            {message && <p>{message}</p>}

        </div>
    );
};

export default FlightsSchiphol;
