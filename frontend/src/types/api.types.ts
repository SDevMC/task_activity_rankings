import type { LocationSearchResult } from './location.types';
import type { WeatherForecast } from './weather.types';
import type { ActivityRankings } from './activity.types';

export interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
}

export interface SearchLocationsVariables {
    query: string;
}

export interface SearchLocationsResponse {
    searchLocations: LocationSearchResult;
}

export interface WeatherForecastVariables {
    locationId: string;
    locationName?: string;
    country?: string;
}

export interface WeatherForecastResponse {
    weatherForecast: WeatherForecast;
}

export interface WeatherByCoordinatesVariables {
    latitude: number;
    longitude: number;
    locationName?: string;
    country?: string;
}

export interface WeatherByCoordinatesResponse {
    weatherByCoordinates: WeatherForecast;
}

export interface ActivityRankingsVariables {
    location: string;
    date?: string;
}

export interface ActivityRankingsResponse {
    activityRankings: ActivityRankings;
}
