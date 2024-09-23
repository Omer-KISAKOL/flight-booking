import {IoAirplane} from "react-icons/io5";
import {IataData} from "../utils/IataData.jsx";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAirport, setSelectedDate, setReturnDate } from '../features/filterSlice.jsx';
import '../index.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Filter({handleFilterSubmit}) {

    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);

    const [tripType, setTripType] = useState('oneWay');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        dispatch(setSelectedDate(today))
    }, []);

    return(
        <div className="flex flex-col items-center w-full">
            <div className="bg-white border rounded-xl shadow-xl container w-[95%] grid justify-center">
                <div className="flex md:flex-row flex-col place-items-center justify-between px-6">
                    <h1 className="flex items-center text-xl font-medium my-10 gap-1"><IoAirplane
                        className="w-8 h-8 text-gray-700"/>BOOK YOUR FLIGHT</h1>
                    <div className="flex">
                        <button
                            type="button"
                            className={`px-6 py-2 rounded-l-full border-2 border-purple-800 ${
                                tripType === 'oneWay' ? 'bg-purple-800 text-white' : 'bg-white text-purple-800'
                            }`}
                            onClick={() => dispatch(setTripType('oneWay'))}
                        >
                            One Way
                        </button>

                        <button
                            type="button"
                            className={`px-6 py-2 rounded-r-full border-2 border-purple-800 ${
                                tripType === 'roundTrip' ? 'bg-purple-800 text-white' : 'bg-white text-purple-800'
                            }`}
                            onClick={() => dispatch(setTripType('roundTrip'))}
                        >
                            Round Trip
                        </button>
                    </div>
                </div>

                <form onSubmit={handleFilterSubmit} className="bg-white max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-between">

                        <div className="flex flex-col">
                            <label htmlFor="departingFrom" className="text-gray-700 font-semibold mb-2">Departing
                                from:</label>
                            <select
                                id="departingFrom"
                                name="departingFrom"
                                required={true}
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                <option value="">Select an airport</option>
                                <option value="AMS">Amsterdam (AMS)</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="airportCode" className="text-gray-700 font-semibold mb-2">Arriving
                                at:</label>
                            <select
                                id="airportCode"
                                name="airportCode"
                                value={filters.selectedAirport}
                                onChange={(e) => dispatch(setSelectedAirport(e.target.value))}
                                required={false}
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                <option value="">Select an airport</option>
                                {IataData.map((airport) => (
                                    <option key={airport.code} value={airport.code}>
                                        {airport.location} ({airport.code})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="scheduleDate" className="text-gray-700 font-semibold mb-2">Flight Date:</label>
                            <DatePicker
                                id="scheduleDate"
                                placeholderText="Flight Date"
                                selected={filters.selectedDate}
                                onChange={(date) => dispatch(setSelectedDate(date.toISOString().split('T')[0]))}
                                minDate={new Date()}
                                dateFormat="dd-MM-yyyy"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        {tripType === 'roundTrip' && (
                            <div className="flex flex-col">
                                <label htmlFor="returnDate" className="text-gray-700 font-semibold mb-2">Return
                                    Date:</label>
                                <DatePicker
                                    id="returnDate"
                                    placeholderText="Return Date"
                                    selected={filters.returnDate}
                                    onChange={(date) => dispatch(setReturnDate(date.toISOString().split('T')[0]))}
                                    minDate={new Date()}
                                    dateFormat="dd-MM-yyyy"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                        )}
                    </div>


                    <div className="my-6 flex justify-start">
                        <button type="submit"
                                className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-purple-700 transition-colors border-2 border-purple-600 hover:border-purple-700">
                            Show Flights
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Filter;