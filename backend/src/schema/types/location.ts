import { gql } from 'apollo-server-express';


export const locationTypeDefs = gql` 
    type Location{
    id: ID!
    name: String!
    latitude: Float!
    longitude: Float!
    country: String!
    
}
    type LocationSearchResult{
        locations: [Location!]!
    }
    
    extend type Query{
        searchLocations(query: String!): LocationSearchResult!
    }

`;

export interface Location {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
}

export interface LocationSearchResult {
    locations: Location[];
}