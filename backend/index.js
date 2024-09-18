const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = require('node-fetch');

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

// Schiphol API'den uçuşları almak için yeni bir GET endpoint
app.get('/api/schiphol-flights', async (req, res) => {
    try {
        // Schiphol API'ye istek gönderiyoruz
        const response = await fetch('https://api.schiphol.nl/public-flights/flights', {
            headers: {
                'app_id': '938aaf8b', // Schiphol API App ID'nizi buraya ekleyin
                'app_key': '70bbf8a9ecbb19f14e1828981d511ea8', // Schiphol API Key'inizi buraya ekleyin
                'ResourceVersion': 'v4',
                'Accept': 'application/json'
            }
        });

        // Gelen yanıtı JSON olarak alıyoruz
        const data = await response.json();

        // API'den alınan uçuş verilerini frontend'e gönderiyoruz
        res.json(data);

    } catch (error) {
        console.error('Error fetching flights from Schiphol API:', error);
        res.status(500).send('Schiphol API ile veri çekme işlemi sırasında bir hata oluştu.');
    }
});

// Sunucuyu 5000 portunda çalıştırıyoruz
app.listen(5000, () => console.log('Server is running on port 5000'));
