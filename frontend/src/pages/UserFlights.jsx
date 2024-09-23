import React, { useState, useEffect } from 'react';
import "../index.css"
import {TbPlaneArrival, TbPlaneDeparture} from "react-icons/tb";
import {convertToAmPm, extractTimeFromDateTime, FlightTimeDifference, formatDate} from "../utils/timeUtils.jsx";
import turkish_airlines from "../assets/turkish-airlines.png";
import {IoIosAirplane} from "react-icons/io";


function Flights({GetRouteInfo})  {
    const [pastFlights, setPastFlights] = useState([]);
    const [upcomingFlights, setUpcomingFlights] = useState([]);

    useEffect(() => {
        // GET isteği ile uçuş verilerini çekiyoruz
        fetch('http://localhost:5000/api/flights')
            .then(response => response.json())
            .then(data => {
                // Uçuşları ayırmak için bugünkü tarihi alıyoruz
                const today = new Date();

                // Bugünden önceki uçuşları filtreleme
                const pastFlights = data.filter(flight => new Date(flight.scheduleDate) < today);

                // Bugünden sonraki uçuşları filtreleme
                const upcomingFlights = data.filter(flight => new Date(flight.scheduleDate) >= today);

                //Uçuşları en yakından uzak tarihe doğru sıralama işlemi
                const sortedFlights = [...upcomingFlights].sort((a, b) => {
                    const dateA = new Date(a.scheduleDateTime).getTime();
                    const dateB = new Date(b.scheduleDateTime).getTime();
                    return dateB - dateA;
                });

                // State'e ayırdığımız uçuşları koyma
                setPastFlights(pastFlights);
                setUpcomingFlights(sortedFlights);// Sıralanmış uçuşları güncelle

            })
            .catch(error => console.error('Error:', error));
        // console.log(flight)
    }, [upcomingFlights]);

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

    // console.log(upcomingFlights, 'upcomingFlights');
    // console.log(pastFlights, 'pastFlights');

    return (
        <div className="min-h-lvh">
            <div className="flex flex-col items-center justify-center sticky top-0 z-50">
                <div className="bg-white p-4 rounded shadow-md w-full flex items-center justify-center">

                    {/* Filter Buttons */}
                    <div className="flex gap-2 mb-4">
                        {["Times", "Stops", "Airlines", "Airports", "Amenities"].map((filter) => (
                            <button
                                key={filter}
                                className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                {filter}
                            </button>
                        ))}
                        <button className="py-2 px-4 mr-8 bg-blue-500 text-white rounded hover:bg-blue-600"
                                // onClick={sortByTime}
                        >
                            Edit Search
                        </button>

                        {/* Star Rating */}
                        <div className="flex space-x-6">
                            {[2, 3, 4, 5].map((stars) => (
                                <div key={stars} className="flex items-center">
                                    {Array(stars)
                                        .fill(0)
                                        .map((_, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-yellow-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9.049 2.927a.813.813 0 011.902 0l2.337 4.73 5.225.759c.659.095.922.908.446 1.375l-3.777 3.677.891 5.186c.11.644-.568 1.13-1.138.829L10 15.347l-4.654 2.447c-.57.3-1.248-.184-1.138-.829l.891-5.186-3.777-3.677c-.476-.467-.213-1.28.446-1.375l5.225-.76 2.337-4.73z"/>
                                            </svg>
                                        ))}
                                    {Array(5 - stars)
                                        .fill(0)
                                        .map((_, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-300"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9.049 2.927a.813.813 0 011.902 0l2.337 4.73 5.225.759c.659.095.922.908.446 1.375l-3.777 3.677.891 5.186c.11.644-.568 1.13-1.138.829L10 15.347l-4.654 2.447c-.57.3-1.248-.184-1.138-.829l.891-5.186-3.777-3.677c-.476-.467-.213-1.28.446-1.375l5.225-.76 2.337-4.73z"/>
                                            </svg>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold">Upcoming Flights</h2>
            {upcomingFlights.length > 0 ? (
                <ul className="flex flex-col items-center">
                    {upcomingFlights.map((flight, index) => (
                        <li key={index} className="w-[80%]">

                            <div className="bg-white p-4 rounded-lg shadow-md  my-6">
                                <div className="flex justify-between items-center mr-10">
                                    <h3 className="text-sm font-bold mb-4">
                                        Amsterdam
                                        - {flight.route && (
                                        (() => {
                                            const destinations = flight.route.destinations;
                                            const {transferAirport, finalDestination} = GetRouteInfo(destinations);
                                            return (
                                                <>
                                                    {transferAirport ? `Transfer via ${transferAirport} -> ` : ''}
                                                    {finalDestination}
                                                </>
                                            );
                                        })()
                                    )}
                                    </h3>
                                    <p className="text-sm font-medium">{flight.flightNumber}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="grid place-items-start">
                                        <div className="flex gap-1 items-center">
                                            <TbPlaneDeparture/>
                                            <p>Departure</p>
                                        </div>
                                        <strong className="text-xl">{convertToAmPm(extractTimeFromDateTime(flight.scheduleDateTime))}</strong>
                                        <p>Airport: AMS</p>
                                    </div>
                                    <div className="grid items-center place-items-center">
                                        <img src={turkish_airlines} alt="turkish_airlines"
                                             className="w-14"/>
                                        <IoIosAirplane className="w-6 h-6 fill-purple-900"/>
                                        <span className="font-medium text-md">
                                            {FlightTimeDifference(flight.scheduleDateTime, flight.estimatedLandingTime)} {flight.route.destinations.length === 1 ? (
                                            <span>(Nonstop)</span>) : (<span>(Via Transit)</span>)}
                                        </span>
                                        <p className="text-lg font-medium mt-1.5">{formatDate(flight.scheduleDate)}</p>
                                    </div>
                                    <div className="grid place-items-start">
                                        <div className="flex gap-1 items-center">
                                            <TbPlaneArrival/>
                                            <p>Arrival</p>
                                        </div>
                                        <strong
                                            className="text-xl">{convertToAmPm(extractTimeFromDateTime(flight.estimatedLandingTime))}</strong>
                                        <p>Airport: {flight.route.destinations.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center relative mt-8">
                                    <p className="text-purple-500 text-lg font-bold">Price: $200</p>
                                    <button
                                        className="bg-purple-800 absolute -bottom-4 -right-4 text-white py-4 px-10 rounded-lg rounded-b-none rounded-e-none"
                                        onClick={() => deleteFlight(flight._id)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>None</p>
            )}

            <h2 className="text-2xl font-bold">Past Flights</h2>
            {pastFlights.length > 0 ? (
                <ul className="flex flex-col items-center">
                    {pastFlights.map((flight, index) => (
                        <li key={index} className="w-[80%]">

                            <div className="bg-white p-4 rounded-lg shadow-md  my-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-bold mb-4">
                                        Amsterdam
                                        - {flight.route && (
                                        (() => {
                                            const destinations = flight.route.destinations;
                                            const {transferAirport, finalDestination} = GetRouteInfo(destinations);
                                            return (
                                                <>
                                                    {transferAirport ? `Transfer via ${transferAirport} -> ` : ''}
                                                    {finalDestination}
                                                </>
                                            );
                                        })()
                                    )}
                                    </h3>
                                    <p className="text-sm font-medium">Flight Number: {flight.flightNumber}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="grid place-items-start">
                                        <div className="flex gap-1 items-center">
                                            <TbPlaneDeparture/>
                                            <p>Departure</p>
                                        </div>
                                        <strong className="text-xl">{convertToAmPm(extractTimeFromDateTime(flight.scheduleDateTime))}</strong>
                                        <p>Airport: AMS</p>
                                    </div>
                                    <div className="grid items-center place-items-center">
                                        <img src={turkish_airlines} alt="turkish_airlines"
                                             className="w-14"/>
                                        <IoIosAirplane className="w-6 h-6 fill-purple-900"/>
                                        <span className="font-medium text-md">
                                            {FlightTimeDifference(flight.scheduleDateTime, flight.estimatedLandingTime)} {flight.route.destinations.length === 1 ? (
                                            <span>(Nonstop)</span>) : (<span>(Via Transit)</span>)}
                                        </span>
                                        <p className="text-lg font-medium mt-1.5">{formatDate(flight.scheduleDate)}</p>
                                    </div>
                                    <div className="grid place-items-start">
                                    <div className="flex gap-1 items-center">
                                            <TbPlaneArrival/>
                                            <p>Arrival</p>
                                        </div>
                                        <strong
                                            className="text-xl">{convertToAmPm(extractTimeFromDateTime(flight.estimatedLandingTime))}</strong>
                                        <p>Airport: {flight.route.destinations.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center relative mt-8">
                                    <p className="text-purple-500 text-lg font-bold">Price: $200</p>
                                    <button
                                        className="bg-purple-800 absolute -bottom-4 -right-4 text-white py-4 px-10 rounded-lg rounded-b-none rounded-e-none"
                                        onClick={() => deleteFlight(flight._id)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>

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
