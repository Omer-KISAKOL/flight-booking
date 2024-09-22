import {IoAirplane} from "react-icons/io5";
import {IataData} from "../utils/IataData.jsx";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setFlightNumber, setSelectedAirport, setSelectedDate, setReturnDate } from '../features/filterSlice.jsx';


function Filter({handleFilterSubmit}) {

    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);

    const [tripType, setTripType] = useState('oneWay');

    const handleTripChange = (event) => {
        setTripType(event.target.value);
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        dispatch(setSelectedDate(today))
    }, []);

    return(
        <div className="flex flex-col items-center">
            <div className="bg-white border rounded-xl shadow-xl container w-[95%]">
                <div className="flex place-items-center justify-between px-6">
                    <h1 className="flex items-center text-xl font-medium my-10 gap-1"><IoAirplane
                        className="w-8 h-8 text-gray-700"/>BOOK YOUR FLIGHT</h1>
                    <div>
                        <label className="p-6">
                            <input
                                type="radio"
                                value="oneWay"
                                checked={tripType === 'oneWay'}
                                onChange={handleTripChange}
                            />
                            One Way
                        </label>
                        <label className="p-6">
                            <input
                                className="p-20"
                                type="radio"
                                value="roundTrip"
                                checked={tripType === 'roundTrip'}
                                onChange={(e) => dispatch(setTripType(e.target.value))}
                            />
                            Round Trip
                        </label>
                    </div>
                </div>

                <form onSubmit={handleFilterSubmit} className="flight-filter">

                    <div>
                        <label htmlFor="scheduleDate"><strong>Flight Date:</strong></label>
                        <input
                            type="date"
                            id="scheduleDate"
                            name="scheduleDate"
                            value={filters.selectedDate}
                            onChange={(e) => dispatch(setSelectedDate(e.target.value))}
                            min={new Date().toISOString().split("T")[0]}
                            required={true}
                        />
                    </div>

                    {tripType === 'roundTrip' && (
                        <div>
                            <label htmlFor="returnDate"><strong>Return Date:</strong></label>
                            <input
                                type="date"
                                id="returnDate"
                                name="returnDate"
                                value={filters.returnDate}
                                onChange={(e) => dispatch(setReturnDate(e.target.value))}
                                min={new Date().toISOString().split("T")[0]} // Geçmiş tarihler seçilemez
                                required={true}
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="flightNumber" className="text-xs">Flight Number:</label>
                        <input
                            className="w-32 py-1 px-2 border-2 border-black rounded-lg"
                            placeholder="Flight Number:"
                            type="text"
                            maxLength="4"
                            id="flightNumber"
                            name="flightNumber"
                            value={filters.flightNumber}
                            onChange={(e) => dispatch(setFlightNumber(e.target.value))}
                        />
                    </div>

                    <div>
                        <label htmlFor="departingFrom"><strong>Departing from:</strong></label>
                        <select
                            id="departingFrom"
                            name="departingFrom"
                            required={true}
                        >
                            <option value="">Select an airport</option>
                            <option value="AMS">Amsterdam (AMS)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="airportCode"><strong>Arriving at:</strong></label>
                        <select
                            id="airportCode"
                            name="airportCode"
                            value={filters.selectedAirport}
                            onChange={(e) => dispatch(setSelectedAirport(e.target.value))}
                            required={false}
                        >
                            <option value="">Select an airport</option>
                            {IataData.map((airport) => (
                                <option key={airport.code} value={airport.code}>
                                    {airport.location} ({airport.code})
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit"
                            className="bg-purple-600 px-4 py-2 border-2 border-black hover:bg-white">Search
                        Flights
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Filter;