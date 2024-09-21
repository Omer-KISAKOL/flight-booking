# Flight Booking Application

This project is a simple web application that lists flights using the Schiphol airport API and allows users to make flight reservations. The frontend is developed with React, and the backend is built with Node.js and MongoDB.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Minimum Requirements](#minimum-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Developer Notes](#developer-notes)

---

## About the Project
This application allows users to view flight information, filter flights by date and direction, make reservations, and list their past flights. The project aims to provide a clean and modern design. The design strictly adheres to the provided mockups, and consistency between pages is ensured.

### Technologies Used:
- **React** (Frontend)
- **Node.js** (Backend)
- **MongoDB** (Database)
- **CSS**: Styling has been done using simple and modern CSS. No external libraries were used. (Optionally, **CSS frameworks** or **Styled Components** can be used.)

---

## Features
1. Flights are listed using the Schiphol API.
2. Flights can be filtered by date and direction.
3. Users can make flight reservations and view their saved flights.
4. Reservations cannot be made for past flights (with a validation check).

---

## Minimum Requirements
- **Node.js**: Version 14.x or above
- **MongoDB**: A working MongoDB instance is required.
- **npm**: For package management (Yarn can be used as an alternative).

---

## Installation

Follow these steps to set up the project:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/username/flight-reservation-app.git
    cd flight-reservation-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Add API keys**: Create an account at Schiphol Flight API and get your `Application Id` and `Application Key`. Then, create a `.env` file in the project root and add your API keys like this:
    ```bash
    REACT_APP_API_ID=yourApplicationId
    REACT_APP_API_KEY=yourApplicationKey
    ```

4. **Start MongoDB**:
   Make sure your MongoDB instance is running. For a local MongoDB setup:
    ```bash
    mongod --dbpath /your/local/dbpath
    ```

5. **Start the project**:
    ```bash
    npm start
    ```

---

## Usage

1. **Flight List**: The homepage displays a list of flights fetched from the API.
2. **Flight Filtering**: Flights can be filtered by date and direction.
3. **Making Reservations**: Users can select a flight and make a reservation, which will be saved in MongoDB.
4. **My Flights**: Displays a list of the user's past flights.

---

## Screenshots

### Homepage
![Homepage Screenshot](screenshots/homepage.png)

### My Flights Page
![My Flights Screenshot](screenshots/myflights.png)

---

## Developer Notes

### Styling:
- **CSS**: The style files are created using plain and modern CSS. No external CSS libraries were used.
- **Responsive Design**: The design is responsive and mobile-friendly.

### Future Enhancements:
- **Additional flight filters** could be added for more advanced search options.
- **User authentication** could be implemented for a personalized experience.
- **Animations and visual enhancements** could be added for better user interaction.

---

---

# Uçuş Rezervasyon Uygulaması

Bu proje, Schiphol havalimanı API'sini kullanarak uçuşların listelendiği ve kullanıcıların uçuş rezervasyonu yapabileceği basit bir web uygulamasıdır. Proje React ile frontend, Node.js ve MongoDB ile backend geliştirilmiştir.

## İçindekiler
- [Proje Hakkında](#proje-hakkında)
- [Özellikler](#özellikler)
- [Minimum Gereksinimler](#minimum-gereksinimler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Ekran Görüntüleri](#ekran-görüntüleri)
- [Geliştirici Notları](#geliştirici-notları)

---

## Proje Hakkında
Bu uygulama, uçuş bilgilerini görüntülemek, tarih ve yönlere göre filtrelemek, rezervasyon yapmak ve kullanıcıların önceki uçuşlarını listelemek için tasarlanmıştır. Proje, sade ve modern bir tasarım sunmayı hedeflemiştir. Verilen görsellere birebir uyum sağlanmıştır ve sayfalar arasında stil tutarlılığı korunmuştur.

### Kullanılan Teknolojiler:
- **React** (Frontend)
- **Node.js** (Backend)
- **MongoDB** (Veritabanı)
- **CSS**: Stil düzenlemeleri sade, modern bir yapı kullanılarak yapılmıştır. Harici bir kütüphane kullanılmamıştır. (Opsiyonel: **CSS framework** ya da **Styled Components** gibi kütüphaneler kullanılabilir.)

---

## Özellikler
1. Schiphol API'si kullanılarak uçuşlar listelenir.
2. Uçuşlar tarih ve yönlere göre filtrelenebilir.
3. Kullanıcı uçuş rezervasyonu yapabilir ve uçuşlarını görüntüleyebilir.
4. Geçmiş tarihli uçuşlar için rezervasyon kısıtlaması bulunur.

---

## Minimum Gereksinimler
- **Node.js**: 14.x ve üzeri
- **MongoDB**: Veritabanı için kurulmuş olması gerekli.
- **npm**: Paket yönetimi için gerekli (alternatif olarak Yarn kullanılabilir).

---

## Kurulum

Projeyi çalıştırmak için aşağıdaki adımları takip edin:

1. **Depoyu klonlayın**:
    ```bash
    git clone https://github.com/kullaniciAdi/ucus-rezervasyon-uygulamasi.git
    cd ucus-rezervasyon-uygulamasi
    ```

2. **Gerekli bağımlılıkları yükleyin**:
    ```bash
    npm install
    ```

3. **API anahtarlarını ekleyin**: Schiphol Flight API için bir hesap oluşturup `Application Id` ve `Application Key` bilgilerinizi alın. Ardından, projenin kök dizininde `.env` dosyasını oluşturup şu şekilde API anahtarlarını ekleyin:
    ```bash
    REACT_APP_API_ID=yourApplicationId
    REACT_APP_API_KEY=yourApplicationKey
    ```

4. **Veritabanını başlatın**:
   MongoDB'inizin çalıştığından emin olun. Geliştirme ortamında lokal MongoDB kullanıyorsanız:
    ```bash
    mongod --dbpath /your/local/dbpath
    ```

5. **Proje'yi başlatın**:
    ```bash
    npm start
    ```

---

## Kullanım

1. **Uçuş Listesi**: Anasayfada API'den çekilen uçuş bilgileri listelenir.
2. **Uçuş Filtreleme**: Tarih ve hareket yönüne göre uçuşları filtreleyebilirsiniz.
3. **Rezervasyon Yapma**: Uçuş seçerek rezervasyon yapabilir ve MongoDB'ye kaydedebilirsiniz.
4. **Uçuşlarım**: Kullanıcıya ait geçmiş uçuşlar görüntülenir.

---

## Ekran Görüntüleri

### Anasayfa
![Anasayfa Ekranı](screenshots/homepage.png)

### Uçuşlarım Sayfası
![Uçuşlarım Ekranı](screenshots/myflights.png)

---

## Geliştirici Notları

### Stil Yönetimi:
- **CSS**: Stil dosyaları sade, modern bir yapıya sahip olacak şekilde düzenlenmiştir. Harici bir CSS kütüphanesi kullanılmamış, standart **CSS** ile stil düzenlemeleri yapılmıştır.
- **Responsive Tasarım**: Sayfa mobil uyumlu olacak şekilde esnek yapıda geliştirilmiştir.

### Gelecekteki Geliştirmeler:
- **Uçuş bilgileri için ek filtreleme seçenekleri** eklenebilir.
- **Kullanıcı giriş/çıkış** sistemi eklenebilir.
- **Animasyonlar ve görsel iyileştirmeler** uygulanabilir.