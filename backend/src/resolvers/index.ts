import { LocationSearchResult } from '../schema/types/location';
import { WeatherForecast } from '../schema/types/weather';
import { ActivityRankings } from '../schema/types/activities';
import { LocationService } from '../services/locationService';
import { WeatherService } from '../services/weatherService';
import calculateActivityRankings from '../services/calculateActivityRankings';

const locationService = new LocationService();
const weatherService = new WeatherService();

export const resolvers = {
    Query: {
        searchLocations: async (
            _parent: unknown,
            { query }: { query: string }
        ): Promise<LocationSearchResult> => {
            if (!query || query.trim().length < 2) {
                return {
                    locations: []
                };
            }
            return await locationService.searchLocations(query);
        },

        weatherForecast: async (
            _parent: unknown,
            { locationId, locationName, country }: { locationId: string; locationName?: string; country?: string }
        ): Promise<WeatherForecast | null> => {
            if (!locationId) return null;

            const [latStr, lonStr] = locationId.split(',');
            const latitude = parseFloat(latStr);
            const longitude = parseFloat(lonStr);

            if (isNaN(latitude) || isNaN(longitude)) {
                throw new Error('Invalid locationId format. Expected "latitude,longitude".');
            }

            const weatherForecast = await weatherService.getWeatherForecast(latitude, longitude);

            // Update location information if provided
            if (locationName) {
                weatherForecast.location.name = locationName;
            }

            if (country) {
                weatherForecast.location.country = country;
            }

            return weatherForecast;
        },

        weatherByCoordinates: async (
            _parent: unknown,
            {
                latitude,
                longitude,
                locationName,
                country
            }: {
                latitude: number;
                longitude: number;
                locationName?: string;
                country?: string
            }
        ): Promise<WeatherForecast | null> => {
            if (latitude === undefined || longitude === undefined) return null;

            const weatherForecast = await weatherService.getWeatherForecast(latitude, longitude);

            // Update location information if provided
            if (locationName) {
                weatherForecast.location.name = locationName;
            }

            if (country) {
                weatherForecast.location.country = country;
            }

            return weatherForecast;
        },

        activityRankings: async (
            _parent: unknown,
            { location, date }: { location: string; date?: string }
        ): Promise<ActivityRankings> => {
            if (!location) {
                throw new Error('Location is required');
            }

            // Format expected: "City, Country" or just "City"
            const locationParts = location.split(',').map(part => part.trim());
            const cityName = locationParts[0];
            const countryName = locationParts.length > 1 ? locationParts[1] : '';

            // Search for the location to get coordinates
            const searchResult = await locationService.searchLocations(cityName);
            if (!searchResult.locations || searchResult.locations.length === 0) {
                throw new Error(`Location "${location}" not found`);
            }

            // Find the best match from search results
            let bestMatch = searchResult.locations[0];
            if (countryName) {
                const countryMatch = searchResult.locations.find(
                    loc => loc.country.toLowerCase() === countryName.toLowerCase()
                );
                if (countryMatch) {
                    bestMatch = countryMatch;
                }
            }

            // Get weather forecast for the location
            const weatherForecast = await weatherService.getWeatherForecast(
                bestMatch.latitude,
                bestMatch.longitude
            );

            // Use today's date if not provided
            const targetDate = date || new Date().toISOString().split('T')[0];

            // Find weather data for the target date
            const weatherData = weatherForecast.forecast.find(
                day => day.date.split('T')[0] === targetDate
            ) || weatherForecast.current;

            if (!weatherData) {
                throw new Error(`Weather data not available for date: ${targetDate}`);
            }

            // Calculate activity rankings based on weather conditions
            const rankings = calculateActivityRankings(weatherData);

            return {
                location: `${bestMatch.name}, ${bestMatch.country}`,
                date: targetDate,
                rankings
            };
        },
        _empty: () => null
    }
};
