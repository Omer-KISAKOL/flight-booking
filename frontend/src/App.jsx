import React from 'react';
import './App.css'
import UserFlights from "./components/UserFlights.jsx";
import FlightsSchiphol from "./components/FlightsSchiphol.jsx";
import {Route, Routes} from "react-router-dom";

function App() {



  return (
      <>
          <Routes>
              <Route path="/" element={<FlightsSchiphol/>} />
              <Route path="/Flights" element={<UserFlights/>} />
          </Routes>
      </>
  )
}

export default App
