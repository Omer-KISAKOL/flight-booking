export const convertToAmPm = (time) => {
    const [hour, minute] = time.split(':');
    let hours = parseInt(hour);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // 12 saat formatına çevir
    if (time === 'Unclear'){
        return ('Unclear')
    }
    return `${hours}:${minute} ${ampm}`;
};

export const FlightTimeDifference = (scheduleDateTime,estimatedLandingTime) => {
    // Uçağın kalkış ve tahmini varış zamanlarını belirleyelim
    const scheduleDateTimes = new Date(scheduleDateTime); // Kalkış zamanı
    const estimatedLandingTimes = new Date(estimatedLandingTime); // Tahmini varış zamanı

    // İki zaman arasındaki farkı milisaniye cinsinden hesaplayalım
    const timeDifference = estimatedLandingTimes.getTime() - scheduleDateTimes.getTime();

    // Bu farkı saat ve dakikaya çevirelim
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    // Saat 0 ise sadece dakikaları gösterelim
    if (hours === 0) {
        return `${minutes}m`;
    }else if (estimatedLandingTime === undefined){
        return ('Unclear')
    }

    return (`${hours}h ${minutes}m`);
};

export const extractTimeFromDateTime = (dateTimeString) => {
    // Date objesi olarak parse edelim
    const date = new Date(dateTimeString);

    // Saat, dakika ve saniyeyi alalım
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    if (dateTimeString === undefined){
        return ('Unclear')
    }
    // Saat formatında geri döndürelim
    return `${hours}:${minutes}:${seconds}`;
};