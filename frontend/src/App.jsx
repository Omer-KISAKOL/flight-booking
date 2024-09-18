import React, { useState } from 'react';
import './App.css'

function App() {

    const [flightNumber, setFlightNumber] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [destination, setDestination] = useState('');

    fetch('http://localhost:5000/api/flights')
        .then(response => response.json())
        .then(data => console.log(data));

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form verilerini backend'e POST isteği ile gönderiyoruz
        const response = await fetch('http://localhost:5000/api/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                flightNumber,
                departureTime,
                destination,
            }),
        });

        // Yanıt olarak gelen mesajı alıyoruz
        const data = await response.text();
        console.log(data); // "Uçuş kaydedildi." mesajını görmek için
    };



  return (
      <>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Uçuş Numarası:</label>
                  <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                  />
              </div>

              <div>
                  <label>Uçuş Tarihi:</label>
                  <input
                      type="datetime-local"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                  />
              </div>

              <div>
                  <label>Varış Noktası:</label>
                  <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                  />
              </div>

              <button type="submit">Uçuşu Kaydet</button>
          </form>
      </>
  )
}

export default App
