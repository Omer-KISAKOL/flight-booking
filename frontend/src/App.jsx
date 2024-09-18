import React, { useState } from 'react';
import './App.css'
import UserFlights from "./components/UserFlights.jsx";
import FlightsSchiphol from "./components/FlightsSchiphol.jsx";

function App() {



  return (
      <>
          <FlightsSchiphol/>
          <UserFlights/>
      </>
  )
}

export default App
