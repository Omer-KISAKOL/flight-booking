import React, {useEffect, useState} from 'react';
import "../index.css"
import Filter from "../components/Filter.jsx";
import Navbar from "../components/Navbar.jsx";
import Services from "../components/Services.jsx";

function FlightsSchiphol({GetRouteInfo}) {
    const [flight, setFlight] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [selectedAirport, setSelectedAirport] = useState('')
    const [message, setMessage] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleReturnDateChange = (event) => {
        setReturnDate(event.target.value);
    };
    const handleFlightNumberChange = (event) => {
        setFlightNumber(event.target.value);
    };
    const handleAirportChange = (event) => {
        setSelectedAirport(event.target.value);
    };


    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today)
    }, []);

    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const query = new URLSearchParams({
            scheduleDate: selectedDate,
            flightNumber: flightNumber,
            selectedAirport: selectedAirport,
        }).toString();

        // Backend üzerinden Schiphol API'den uçuş verilerini çekiyoruz
        fetch(`http://localhost:5000/api/schiphol-flights?${query}`)
            .then(response => response.json())
            .then(data => {
                setFlight(data); // Schiphol API'den gelen uçuşları state'e koyuyoruz
                console.log(data)
            })
            .catch(error => console.error('Error fetching flights:', error));

    };

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
        <div className="grid row w-full">
            <div className="flex flex-col col-start-1 col-end-10">

                <Navbar/>
                <Filter flightNumber={flightNumber} handleFilterSubmit={handleFilterSubmit}
                        handleFlightNumberChange={handleFlightNumberChange} handleAirportChange={handleAirportChange}
                        handleDateChange={handleDateChange} handleReturnDateChange={handleReturnDateChange}
                        selectedAirport={selectedAirport} returnDate={returnDate} selectedDate={selectedDate}/>

                {flight.length > 0 ? (
                    flight.map((flight, index) => {

                        const destinations = flight.route.destinations;

                        // GetRouteInfo fonksiyonunu kullanarak varış şehir ve ülkesini alıyor
                        const {transferAirport, finalDestination} = GetRouteInfo(destinations);

                        return (
                            <div className="flight-list">
                                <div key={index} className="flight-card">
                                    <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                                    {/*<p><strong>Flight Name:</strong> {flight.flightName}</p>*/}
                                    {/*<p><strong>Airline Code:</strong> {flight.airlineCode}</p>*/}
                                    {/*<p><strong>Aircraft*/}
                                    {/*    Type:</strong> {flight.aircraftType.iataMain} ({flight.aircraftType.iataSub})*/}
                                    {/*</p>*/}
                                    {/*<p><strong>Is Operational*/}
                                    {/*    Flight:</strong> {flight.isOperationalFlight ? 'Yes' : 'No'}</p>*/}
                                    <p><strong>Flight
                                        Date:</strong> {new Date(flight.scheduleDateTime).toLocaleString()}
                                    </p>
                                    <p><strong>Estimated Landing
                                        Time:</strong> {new Date(flight.estimatedLandingTime).toLocaleString()}</p>
                                    <p><strong>Actual Landing
                                        Time:</strong> {new Date(flight.actualLandingTime).toLocaleString()}</p>
                                    {/*<p><strong>Baggage Claim:</strong> Belts: {flight.baggageClaim.belts.join(', ')}</p>*/}
                                    <p><strong>Public Flight
                                        State:</strong> {flight.publicFlightState.flightStates.join(', ')}</p>
                                    {/*<p><strong>Route:</strong> {flight.route.destinations.join(', ')}</p>*/}
                                    <p>
                                        <strong>Route:</strong>
                                        {transferAirport ? `Transfer via ${transferAirport} >> ` : ''}{finalDestination}
                                    </p>
                                    <p><strong>Terminal Section:</strong> {flight.terminal}</p>
                                    <p><strong>Last Updated
                                        At:</strong> {new Date(flight.lastUpdatedAt).toLocaleString()}</p>
                                </div>
                                <button onClick={() => setSelectedFlight(flight)}>Seç</button>
                            </div>
                        );
                    })
                ) : (
                    <p>No flights found.</p>
                )}


                {selectedFlight && (
                    <div className="selected-flight-card">
                        <h2>Seçilen Uçuş:</h2>
                        <div className="flight-list">
                            <div className="flight-card">
                                <p><strong>Flight Number:</strong> {selectedFlight.flightNumber}</p>
                                {/*<p><strong>Flight Name:</strong> {selectedFlight.flightName}</p>*/}
                                {/*<p><strong>Airline Code:</strong> {selectedFlight.airlineCode}</p>*/}
                                {/*<p><strong>Aircraft*/}
                                {/*    Type:</strong> {selectedFlight.aircraftType.iataMain} ({selectedFlight.aircraftType.iataSub})*/}
                                {/*</p>*/}
                                {/*<p><strong>Is Operational*/}
                                {/*    Flight:</strong> {selectedFlight.isOperationalFlight ? 'Yes' : 'No'}*/}
                                {/*</p>*/}
                                <p><strong>Flight
                                    Date:</strong> {new Date(selectedFlight.scheduleDateTime).toLocaleString()}
                                </p>
                                <p><strong>Estimated Landing
                                    Time:</strong> {new Date(selectedFlight.estimatedLandingTime).toLocaleString()}</p>
                                <p><strong>Actual Landing
                                    Time:</strong> {new Date(selectedFlight.actualLandingTime).toLocaleString()}
                                </p>
                                {/*<p><strong>Baggage Claim:</strong> Belts: {selectedFlight.baggageClaim.belts.join(', ')}</p>*/}
                                <p><strong>Public Flight
                                    State:</strong> {selectedFlight.publicFlightState.flightStates.join(', ')}</p>
                                {/*<p><strong>Route:</strong> {selectedFlight.route.destinations.join(', ')}</p>*/}
                                {selectedFlight.route && (
                                    <p><strong>Route:</strong>
                                        {(() => {
                                            const destinations = selectedFlight.route.destinations;
                                            const {transferAirport, finalDestination} = GetRouteInfo(destinations);
                                            return (
                                                <>
                                                    {transferAirport ? `Transfer via ${transferAirport} -> ` : ''}
                                                    {finalDestination}
                                                </>
                                            );
                                        })()}
                                    </p>
                                )}
                                <p><strong>Terminal Section:</strong> {selectedFlight.terminal}</p>
                                <p><strong>Last Updated
                                    At:</strong> {new Date(selectedFlight.lastUpdatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <button onClick={handleFlightSubmit}>Save Flight</button>
                    </div>
                )}

                {message && <p>{message}</p>}
            </div>
            <div className="col-start-11 col-end-12">
                <Services/>
            </div>
        </div>
    );

}

export default FlightsSchiphol;
