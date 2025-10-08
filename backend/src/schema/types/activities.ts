import { gql } from 'apollo-server-express';


export const activitiesTypeDefs = gql`
enum ActivityType {
    SKIING
    SURFING
    OUTDOOR_SIGHTSEEING
    INDOOR_SIGHTSEEING
}
type ActivityRanking{
     activity:ActivityType!
     score: Float!
}

type ActivityRankings{
    rankings:[ActivityRanking!]!, 
    date:String!
    location:String!
}

extend type Query{
    activityRankings(location: String!, date: String): ActivityRankings!
}
`;
export enum ActivityType {
    SKIING = 'SKIING',
    SURFING = 'SURFING',
    OUTDOOR_SIGHTSEEING = 'OUTDOOR_SIGHTSEEING',
    INDOOR_SIGHTSEEING = 'INDOOR_SIGHTSEEING'
}

export interface ActivityRanking {
    activity: ActivityType;
    score: number;
}

export interface ActivityRankings {
    rankings: ActivityRanking[];
    date: string;
    location: string;
}