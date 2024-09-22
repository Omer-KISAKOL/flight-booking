import React from "react";
import carImage from '../assets/car.jpeg';
import hotelImage from '../assets/hotel.jpeg';
import travelImage from '../assets/travel.jpeg';
import { FaCar, FaHotel, FaSuitcase } from 'react-icons/fa';

const Card = ({ image, icon, title }) => {
    return (
        <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                <div className="text-4xl mb-2">{icon}</div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </div>
    );
};

const Services = () => {
    return (
        <div className="flex flex-col gap-6 p-4">
            <Card
                image={carImage}
                icon={<FaCar />}
                title="CAR RENTALS"
            />
            <Card
                image={hotelImage}
                icon={<FaHotel />}
                title="HOTELS"
            />
            <Card
                image={travelImage}
                icon={<FaSuitcase />}
                title="TRAVEL PACKAGES"
            />
        </div>
    );
};

export default Services;
