import React from "react";
import {useSelector} from "react-redux";
import {TbPlaneArrival, TbPlaneDeparture} from "react-icons/tb";
import {convertToAmPm, extractTimeFromDateTime, FlightTimeDifference, formatDate} from "../utils/timeUtils.jsx";
import turkish_airlines from "../assets/turkish-airlines.png";
import {IoIosAirplane} from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {Link} from "react-router-dom";

export const BookFlight = ({ flight, onClose , handleFlightSubmit , transferAirport, finalDestination}) => {
    const filters = useSelector((state) => state.filters);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-[95%] sm:w-[65%] shadow-lg relative">

                <button className="bg-transparent my-2 mx-4 rounded hover:text-red-800 absolute top-3 right-4"
                        onClick={onClose}>
                    <IoClose className="w-6 h-6"/>
                </button>

                <h2 className="text-xl font-bold mb-4">Book Flight</h2>

                <div className="text-sm font-bold mb-4">
                    Amsterdam - {transferAirport ? ` Transfer via ${transferAirport} -> ` : ' '}{finalDestination}
                </div>

                <div className="flex justify-between items-center">

                    <div className="grid place-items-start">
                        <div className="flex gap-1 items-center">
                            <TbPlaneDeparture/>
                            <p>Departure</p>
                        </div>
                        <strong
                            className="text-xl">{convertToAmPm(extractTimeFromDateTime(flight.scheduleDateTime))}</strong>
                        <p>Airport: AMS</p>
                    </div>

                    <div className="hidden sm:grid items-center place-items-center">
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

                <div className="flex justify-between sm:hidden items-center">
                    <img src={turkish_airlines} alt="turkish_airlines"
                         className="w-20 h-8"/>
                    <span className="grid font-medium text-md">
                                            <p>{FlightTimeDifference(flight.scheduleDateTime, flight.estimatedLandingTime)}</p>
                                        <p>{flight.route.destinations.length === 1 ? (<span>(Nonstop)</span>) : (
                                            <span>(Via Transit)</span>)}</p>
                                        </span>
                    <p className="text-lg font-medium mt-1.5">{formatDate(flight.scheduleDate)}</p>
                </div>

                {/* Seat Selection */}
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Select Seat:</label>
                    <select
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 w-52">
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex relative">
                    <button
                        className="bg-purple-800 absolute -bottom-14 -right-8 text-white py-6 px-12 text-xl rounded-book"
                        onClick={handleFlightSubmit}>
                        Confirm
                    </button>
                    {filters.message ? (
                        <div
                            className="text-xl font-bold text-white bg-blue-600 absolute bottom-0 left-1/2 transition-opacity -ml-20 px-6 py-4 shadow-xl border-2 border-blue-600 rounded-2xl">
                            {filters.message && <p>{filters.message}</p>}
                        </div>
                    ) : (<></>)}

                </div>
                <div>
                    <Link
                        className="px-4 py-2 rounded-book border-2 border-purple-800 hover:bg-purple-800 hover:text-white"
                        to="/Flights">My Flights</Link>
                </div>
            </div>
        </div>
    );
};