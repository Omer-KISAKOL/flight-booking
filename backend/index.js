const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = require('node-fetch');

// Express sunucusunu atıyoruz.
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
    flightNumber: String,                // Uçuş numarası
    flightName: String,                  // Uçuş adı
    actualLandingTime: Date,
    aircraftType: {                      // Uçak tipi
        iataMain: String,                // IATA ana kodu
        iataSub: String                  // IATA alt kodu
    },
    airlineCode: Number,                 // Havayolu kodu
    estimatedLandingTime: Date,          // Tahmini iniş zamanı
    flightDirection: String,             // Uçuş yönü (A veya B)
    isOperationalFlight: Boolean,        // Uçuş operasyonel mi?
    lastUpdatedAt: Date,                 // Son güncelleme zamanı
    mainFlight: String,                  // Ana uçuş
    prefixIATA: String,                  // IATA öneki
    prefixICAO: String,                  // ICAO öneki
    route: {                             // Uçuş rotası
        destinations: [String],          // Varış noktaları listesi
        eu: String,                      // AB durumu
        visa: String                     // Vize durumu
    },
    scheduleDate: String,                // Programlanmış uçuş tarihi
    scheduleDateTime: Date,              // Programlanmış kalkış zamanı
    scheduleTime: String,                // Programlanmış saat
    serviceType: String,                  // Hizmet tipi
    terminal: Number,
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
    try {
        // Tüm uçuşları veritabanından al
        const flights = await Flight.find();
        res.json(flights); // Uçuşları JSON formatında geri döndür
    } catch (err) {
        res.status(500).json({ error: 'Uçuşları çekerken bir hata oluştu.' });
    }
});

// Uçuşu silmek için DELETE isteği
app.delete('/api/flights/:id', async (req, res) => {
    try {
        const flightId = req.params.id;

        // Uçuşu id ile bul ve sil
        const flight = await Flight.findByIdAndDelete(flightId);

        if (!flight) {
            return res.status(404).json({ error: 'Uçuş bulunamadı.' });
        }

        res.json({ message: 'Uçuş başarıyla silindi.' });
    } catch (err) {
        res.status(500).json({ error: 'Uçuş silinirken bir hata oluştu.' });
    }
});


app.get('/api/schiphol-flights', async (req, res) => {
    const { scheduleDate, flightNumber } = req.query; // URL'deki parametreleri alıyoruz

    // API isteği için URL oluşturma
    let url = `https://api.schiphol.nl/public-flights/flights?scheduleDate=${scheduleDate}`;

    if (flightNumber) {
        url += `&flightNumber=${flightNumber}`;
    }

    try {
        const apiResponse = await fetch(url, {
            headers: {
                'app_id': '938aaf8b', // Schiphol API App ID'nizi buraya ekleyin
                'app_key': '70bbf8a9ecbb19f14e1828981d511ea8', // Schiphol API Key'inizi buraya ekleyin
                'ResourceVersion': 'v4',
                'Accept': 'application/json'
            }
        });
        const data = await apiResponse.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Veri çekilirken bir hata oluştu.' });
    }
});






// Sunucuyu 5000 portunda çalıştırıyoruz
app.listen(5000, () => console.log('Server is running on port 5000'));
