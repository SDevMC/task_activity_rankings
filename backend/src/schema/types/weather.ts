import { gql } from 'apollo-server-express';
import { Location } from './location'; // Add this import


export const weatherTypeDefs = gql`
  type WeatherData {
    temperature: Float
    precipitation: Float
    snowfall: Float
    wind: Float
    cloud_cover: Float
    date: String!
  }

  type WeatherForecast {
    location: Location!
    current: WeatherData
    forecast: [WeatherData!]!
  }

  extend type Query {
    weatherForecast(locationId: ID!, locationName: String, country: String): WeatherForecast
    weatherByCoordinates(latitude: Float!, longitude: Float!, locationName: String, country: String): WeatherForecast
  }
`;

export interface WeatherData {
  temperature?: number;
  precipitation?: number;
  snowfall?: number;
  wind?: number;
  cloud_cover?: number;
  date: string;
}

export interface WeatherForecast {
  location: Location;
  current?: WeatherData;
  forecast: WeatherData[];
}