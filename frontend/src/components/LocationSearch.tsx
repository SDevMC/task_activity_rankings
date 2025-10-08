import { useState } from "react";
import { SEARCH_LOCATIONS } from "../apollo/queries";
import type { Location, LocationSearchProps } from "../types";
import { useLazyQuery } from "@apollo/client/react";
type SearchLocationsData = {
    searchLocations: {
        locations: Location[];
    };
};

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLocations, { loading, error, data }] = useLazyQuery<SearchLocationsData>(SEARCH_LOCATIONS);
    const handleSearch = () => {
        //TODO: add debounce and limit to 5 results
        // Only search if the search term is at least 2 characters long
        if (searchTerm.trim().length >= 2) {
            searchLocations({ variables: { query: searchTerm } });
        }
    }
    return (
        <div className="location-search">
            <h2>Search for a Location</h2>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter location name (min 2 characters)"
                />
                <button
                    onClick={handleSearch}
                    disabled={searchTerm.trim().length < 2}
                >
                    Search
                </button>
                {data?.searchLocations?.locations && data.searchLocations.locations.length === 0 && (
                    <p>No locations found. Try a different search term.</p>
                )}
            </div>
            {loading && <p>Searching...</p>}
            {error && <p className="error">Error: {error.message}</p>}
            {data && data.searchLocations.locations.length === 0 && (
                <p>No locations found. Try a different search term.</p>
            )}
            {data && data.searchLocations.locations.length > 0 && (
                <div className="location-results">
                    <h3>Search Results</h3>
                    <ul>
                        {data.searchLocations.locations.map((location: Location) => (
                            <li key={location.id} onClick={() => onLocationSelect(location)}>
                                <div className="location-item">
                                    <span className="location-name">{location.name}</span>
                                    <span className="location-country">{location.country}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default LocationSearch;