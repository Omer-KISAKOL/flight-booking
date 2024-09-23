export const convertToAmPm = (time) => {
    const [hour, minute] = time.split(':');
    let hours = parseInt(hour);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // 12 saat formatına çevir
    if (time === 'Unclear' || time === ''){
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
    const date = new Date(dateTimeString);

    // Saat, dakika ve saniyeyi alalım
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    if (dateTimeString === undefined){
        return ('Unclear')
    }
    // Saat formatında geri döndürelim
    return `${hours}:${minutes}`;
};

export function formatDate(isoDate) {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');   // Gün
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ay (0-11 aralığında olduğu için 1 ekliyoruz)
    const year = date.getFullYear(); // Yıl

    return `${day}.${month}.${year}`;
}