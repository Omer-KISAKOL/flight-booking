const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Express sunucusunu başlatıyoruz.
const app = express();

// Middleware - Gelen veriyi JSON formatında alabilmemizi sağlar.
app.use(express.json());

// CORS middleware'i, farklı domainlerden gelen isteklere izin verir.
app.use(cors());

// MongoDB'ye bağlanma. Burada MongoDB bağlantı URL'ini kendi Atlas URL'in ile değiştir.
mongoose.connect('mongodb+srv://okisakol:YvzccLo6kEGRG4gP@flight-booking.nrna4.mongodb.net/?retryWrites=true&w=majority&appName=Flight-Booking')
    .then(() => console.log('MongoDB connection successful.'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Uçuşlar için MongoDB şeması ve modeli
const flightSchema = new mongoose.Schema({
    flightNumber: String,
    departureTime: Date,
    destination: String,
});

const Flight = mongoose.model('Flight', flightSchema);

// Yeni bir uçuş kaydetmek için POST isteği
app.post('/api/flights', async (req, res) => {
    try {
        // İstekle gelen uçuş bilgilerini kullanarak yeni bir uçuş kaydediyoruz
        const flight = new Flight(req.body);

        // Uçuşu MongoDB veritabanına kaydediyoruz
        await flight.save();

        // Başarılı olursa, başarı mesajı gönderiyoruz
        res.send('Flight save.');
    } catch (err) {
        // Bir hata oluşursa, 400 durumu ve hata mesajı döndürüyoruz
        res.status(400).send('An ERROR has occurred.');
    }
});

// Uçuşları listelemek için GET isteği
app.get('/api/flights', async (req, res) => {
    const flights = await Flight.find();
    res.json(flights);
});

// Sunucuyu 5000 portunda çalıştırıyoruz
app.listen(5000, () => console.log('Server is running on port 5000'));
