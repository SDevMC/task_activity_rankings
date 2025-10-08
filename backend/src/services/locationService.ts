import { Location, LocationSearchResult } from '../schema/types/location';

export class LocationService {
    private readonly baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';

    async searchLocations(query: string): Promise<LocationSearchResult> {
        try {
            const url = new URL(this.baseUrl);
            url.searchParams.append('name', query);
            url.searchParams.append('count', '2');
            url.searchParams.append('format', 'json');

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.results) {
                return {
                    locations: []
                };
            }

            const locations: Location[] = data.results.map((result: any) => ({
                id: String(result.id),
                name: result.name,
                country: result.country,
                latitude: result.latitude,
                longitude: result.longitude
            }));

            return {
                locations
            };
        } catch (error) {
            console.error('Failed to search locations:', error);
            throw new Error('Location search failed');
        }
    }

}
export default new LocationService();
