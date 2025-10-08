export interface Location {
    id: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}

export interface LocationSearchResult {
    locations: Location[];
}

export interface LocationSearchProps {
    onLocationSelect: (location: Location) => void;
}

export interface LocationDetailsProps {
    location: Location;
    onClear: () => void;
}