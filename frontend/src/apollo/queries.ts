import { gql } from '@apollo/client';

export const SEARCH_LOCATIONS = gql`
  query SearchLocations($query: String!) {
    searchLocations(query: $query) {
      locations {
        id
        name
        country
        latitude
        longitude
      }
    }
  }
`;
export const GET_ACTIVITY_RANKINGS = gql`
  query GetActivityRankings($location: String!, $date: String) {
    activityRankings(location: $location, date: $date) {
      location
      date
      rankings {
        activity
        score
      }
    }
  }
`;
