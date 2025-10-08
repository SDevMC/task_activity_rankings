import { gql } from 'apollo-server-express';
import { locationTypeDefs } from './types/location';
import { weatherTypeDefs } from './types/weather';
import { activitiesTypeDefs } from './types/activities';

const baseTypeDefs = gql`
    type Query {
        _empty: String
    }
`;

//combine all typeDefs
export const typeDefs = [
    baseTypeDefs,
    locationTypeDefs,
    weatherTypeDefs,
    activitiesTypeDefs,
];

