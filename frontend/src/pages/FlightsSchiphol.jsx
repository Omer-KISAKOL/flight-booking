import React, {useEffect, useState} from 'react';
import "../index.css"
import Filter from "../components/Filter.jsx";
import Navbar from "../components/Navbar.jsx";
import Services from "../components/Services.jsx";
import { useSelector } from 'react-redux';
import { TbPlaneDeparture , TbPlaneArrival } from "react-icons/tb";
import {IoIosAirplane} from "react-icons/io";
import {convertToAmPm, FlightTimeDifference , extractTimeFromDateTime} from "../utils/timeUtils.jsx";
import turkish_airlines from "../assets/turkish-airlines.png";
import {Link} from "react-router-dom";

function FlightsSchiphol({GetRouteInfo}) {
    const [flight, setFlight] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [message, setMessage] = useState('');

    const filters = useSelector((state) => state.filters);


    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const query = new URLSearchParams({
            selectedDate: filters.selectedDate,
            flightNumber: filters.flightNumber,
            selectedAirport: filters.selectedAirport,
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
            <Navbar/>
            <div className="col-start-1 col-end-11">
                <Filter handleFilterSubmit={handleFilterSubmit}/>

                <div className="flex flex-col md:flex-row justify-between p-6">

                    <div className="flex flex-col w-full md:w-9/12">

                        {flight.length > 0 ? (
                            flight.map((flight, index) => {

                                // GetRouteInfo fonksiyonunu kullanarak varış lokasyonunu alıyoruz
                                const destinations = flight.route.destinations;
                                const {transferAirport, finalDestination} = GetRouteInfo(destinations);

                                return (
                                    <>
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <h3 className="text-sm font-bold">
                                                Amsterdam
                                                - {transferAirport ? `Transfer via ${transferAirport} >> ` : ''}{finalDestination}
                                            </h3>
                                            <div key={index} className="flex justify-between items-center">
                                                <div className="grid place-items-start">
                                                    <div className="flex gap-1 items-center">
                                                        <TbPlaneDeparture/>
                                                        <p>Departure</p>
                                                    </div>
                                                    <p>{convertToAmPm(flight.scheduleTime)}</p>
                                                    <p>Airport: AMS</p>
                                                </div>
                                                <div className="grid items-center place-items-center">
                                                    <img src={turkish_airlines} alt="turkish_airlines"
                                                         className="w-14"/>
                                                    <IoIosAirplane className="w-6 h-6 fill-purple-900"/>
                                                    <span>{FlightTimeDifference(flight.scheduleDateTime, flight.estimatedLandingTime)} {flight.route.destinations.length === 1 ? (
                                                        <span>(Nonstop)</span>) : (<span>(Via Transit)</span>)}</span>
                                                </div>
                                                <div className="grid place-items-start">
                                                    <div className="flex gap-1 items-center">
                                                        <TbPlaneArrival/>
                                                        <p>Arrival</p>
                                                    </div>
                                                    <p>{convertToAmPm(extractTimeFromDateTime(flight.estimatedLandingTime))}</p>
                                                    <p>Airport: {flight.route.destinations.join(', ')}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center relative mt-8">
                                                <p className="text-purple-500 text-lg font-bold">Price: $200</p>
                                                <button className="bg-purple-800 absolute -bottom-4 -right-4 text-white py-4 px-10 rounded-lg rounded-b-none rounded-e-none" onClick={() => setSelectedFlight(flight)}>
                                                    Book Flight
                                                </button>
                                            </div>
                                        </div>
                                        <Link to='/' className="text-purple-800 mb-6 underline w-44 h-10 bg-purple-200 text-center items-center rounded-b-lg">Check the details</Link>
                                    </>
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

                    <div className="w-full md:w-3/12  p-4 mt-6 ms-4 md:mt-0">
                        <div className="mb-4">
                            <label className="font-bold text-lg">Sort by:</label>
                            <select className="w-full border-gray-300 rounded-lg mt-2">
                                <option>Lowest Price</option>
                                <option>Highest Price</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-bold text-lg">Arrival Time</h4>
                            <div className="mt-2">
                                <label className="block">
                                    <input type="radio" name="arrivalTime"/>
                                    5:00 AM - 11:59 AM
                                </label>
                                <label className="block">
                                    <input type="radio" name="arrivalTime"/>
                                    12:00 PM - 5:59 PM
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-bold text-lg">Stops</h4>
                            <div className="mt-2">
                                <label className="block">
                                    <input type="radio" name="stops"/>
                                    Nonstop
                                </label>
                                <label className="block">
                                    <input type="radio" name="stops"/>
                                    1 Stop
                                </label>
                                <label className="block">
                                    <input type="radio" name="stops"/>
                                    2+ Stops
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-bold text-lg">Airlines Included</h4>
                            <div className="mt-2">
                                <label className="block">
                                    <input type="radio" name="airlines"/>
                                    Alitalia
                                </label>
                                <label className="block">
                                    <input type="radio" name="airlines"/>
                                    Lufthansa
                                </label>
                                <label className="block">
                                    <input type="radio" name="airlines"/>
                                    Air France
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-start-11 col-end-12">
                <Services/>
            </div>

        </div>
    );

}

export default FlightsSchiphol;
