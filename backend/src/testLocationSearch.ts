import { LocationService } from './services/locationService';

const locationService = new LocationService();

async function testLocationSearch() {
    try {
        console.log('Starting location search test...');
        const searchTerm = 'London';
        console.log(`Searching for: ${searchTerm}`);

        const results = await locationService.searchLocations(searchTerm);

        if (results.locations.length > 0) {
            console.log('Search successful! Found locations:');
            console.log(JSON.stringify(results, null, 2));
        } else {
            console.log('No locations found');
        }
    } catch (error) {
        console.error('Test failed with error:', error);
    }
}

// Use this pattern to properly handle async execution
testLocationSearch().catch(console.error);