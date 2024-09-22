import {IoAirplane} from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import user_profil from "../assets/user-profil.png"
import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

function Filter() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Dropdown açılıp kapansın
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        // Event listener to close dropdown if clicked outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <div className="sticky top-0 flex justify-center">
            <div className="flex justify-between items-center w-[97%]">
                <h1 className="flex items-center text-xl font-medium my-10 gap-1">
                    <IoAirplane className="w-8 h-8 text-white bg-purple-700 rounded-3xl"/>
                    PLANE SCAPE
                </h1>
                <div className="flex items-center gap-5 relative" ref={dropdownRef}>
                    <p className="flex items-center text-lg my-10 gap-1">
                        <MdDiscount className="fill-purple-800"/>
                        Deals
                    </p>
                    <p className="flex items-center text-lg my-10 gap-1">
                        <BiWorld className="fill-purple-800"/>
                        Discover
                    </p>
                    <button className="flex items-center text-lg my-10 gap-1 hover:bg-purple-100 py-2 px-4 rounded-2xl"  onClick={toggleDropdown}>
                        <img src={user_profil} alt="user icon" className="w-10 h-10 border-black rounded-full"/>
                        Joane Smith
                    </button>
                    {isOpen && (
                        <div className="absolute top-2/3 right-0 mt-2 w-44 bg-white border rounded-2xl shadow-lg">
                            <ul className="flex flex-col">
                                <li>
                                    <Link className="block px-4 py-2 rounded-2xl hover:bg-purple-100" to="/Flights">My Flights</Link>
                                </li>
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Filter;