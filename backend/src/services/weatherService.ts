import { WeatherForecast, WeatherData } from "../schema/types/weather";
import { Location } from "../schema/types/location";

export class WeatherService {
    private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

    async getWeatherForecast(latitude: number, longitude: number): Promise<WeatherForecast> {
        try {
            // Construct the URL with query parameters
            const url = new URL(this.baseUrl);
            url.searchParams.append('latitude', latitude.toFixed(6));
            url.searchParams.append('longitude', longitude.toFixed(6));

            // Request current weather parameters
            url.searchParams.append('current', 'temperature_2m,precipitation,snowfall,windspeed_10m,cloud_cover');

            // Request daily forecast parameters
            url.searchParams.append('daily', 'temperature_2m_max,precipitation_sum,snowfall_sum,windspeed_10m_max,cloud_cover_max');

            url.searchParams.append('timezone', 'auto');
            url.searchParams.append('forecast_days', '7');

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Create a location object with the provided coordinates
            const location: Location = {
                id: `${latitude.toFixed(6)},${longitude.toFixed(6)}`,
                name: "Weather Location", // This will be replaced in the resolver -> Not provided by this service. 
                country: "", // This will be replaced in the resolver -> Not provided by this service.
                latitude,
                longitude
            };

            // Extract current weather data
            const current: WeatherData = {
                date: data.current.time,
                temperature: data.current.temperature_2m,
                precipitation: data.current.precipitation || 0,
                snowfall: data.current.snowfall || 0,
                wind: data.current.windspeed_10m || 0,
                cloud_cover: data.current.cloud_cover || 0
            };

            // Extract forecast data for each day
            const forecast: WeatherData[] = [];

            for (let i = 0; i < data.daily.time.length; i++) {
                forecast.push({
                    date: data.daily.time[i],
                    temperature: data.daily.temperature_2m_max[i],
                    precipitation: data.daily.precipitation_sum[i] || 0,
                    snowfall: data.daily.snowfall_sum[i] || 0,
                    wind: data.daily.windspeed_10m_max[i] || 0,
                    cloud_cover: data.daily.cloud_cover_max[i] || 0
                });
            }

            return {
                location,
                current,
                forecast
            };
        } catch (error) {
            console.error('Failed to fetch weather forecast:', error);
            throw new Error('Weather forecast fetch failed');
        }
    }
}

export default new WeatherService();
