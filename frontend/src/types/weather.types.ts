import type { Location } from './location.types'
export interface WeatherCondition {
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    description: string;
    icon: string;
}

export interface DailyForecast {
    date: string;
    dayOfWeek: string;
    high: number;
    low: number;
    condition: WeatherCondition;
}

export interface WeatherForecast {
    location: Location;
    current: WeatherCondition;
    daily: DailyForecast[];
}

export interface WeatherWidgetProps {
    forecast: WeatherForecast;
}
