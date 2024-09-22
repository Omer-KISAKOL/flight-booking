import React from 'react';
import './App.css'
import UserFlights from "./pages/UserFlights.jsx";
import FlightsSchiphol from "./pages/FlightsSchiphol.jsx";
import {Route, Routes} from "react-router-dom";
import {IataData} from "./utils/IataData.jsx";

function App() {

    function GetLocationFromCode (code) {
        const entry = IataData.find(item => item.code === code);
        return entry ? entry.location : code; // Eğer eşleşme bulunmazsa, kodu olduğu gibi yazdır
    }

    // IATA koduna göre varış şehir ve ülkesini döndüren fonksiyon
    function GetRouteInfo(destinations){

        const transferAirport = destinations.length > 1 ? GetLocationFromCode(destinations[0]) : null;

        const finalDestinationCode = destinations[destinations.length - 1];
        const finalDestination = GetLocationFromCode(finalDestinationCode);

        return { transferAirport, finalDestination };
    }

  return (
      <>
          <Routes>
              <Route path="/" element={<FlightsSchiphol GetRouteInfo={GetRouteInfo}/>} />
              <Route path="/Flights" element={<UserFlights GetRouteInfo={GetRouteInfo}/>} />
          </Routes>
      </>
  )
}

export default App
