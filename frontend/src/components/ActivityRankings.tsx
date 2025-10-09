import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_ACTIVITY_RANKINGS } from '../apollo/queries';

// Define types for the query response
interface ActivityRanking {
    activity: string;
    score: number;
}

interface ActivityRankingsData {
    activityRankings: {
        location: string;
        date: string;
        rankings: ActivityRanking[];
    };
}

// Map backend enum values to user-friendly display names
const activityDisplayNames: Record<string, string> = {
    SKIING: 'Skiing',
    SURFING: 'Surfing',
    OUTDOOR_SIGHTSEEING: 'Outdoor Sightseeing',
    INDOOR_SIGHTSEEING: 'Indoor Sightseeing'
};

const activityIcons: Record<string, string> = {
    SKIING: '⛷️',
    SURFING: '🏄',
    OUTDOOR_SIGHTSEEING: '🏞️',
    INDOOR_SIGHTSEEING: '🏛️'
};

interface ActivityRankingsProps {
    location: string;
    date?: string;
}

const ActivityRankings = ({ location, date }: ActivityRankingsProps) => {
    const { loading, error, data } = useQuery<ActivityRankingsData>(GET_ACTIVITY_RANKINGS, {
        variables: { location, date }
    });

    if (loading) return <p>Loading activity recommendations...</p>;
    if (error) return <p>Error loading activities: {error.message}</p>;
    if (!data || !data.activityRankings) return null;

    const { rankings } = data.activityRankings;

    return (
        <div className="activity-rankings">
            <h3>Recommended Activities</h3>
            <p>Based on weather conditions for {data.activityRankings.date}</p>

            <div className="rankings-list">
                {rankings.map((ranking) => (
                    <div key={ranking.activity} className="activity-item">
                        <div className="activity-icon">{activityIcons[ranking.activity] || '🏆'}</div>
                        <div className="activity-details">
                            <span className="activity-name">{activityDisplayNames[ranking.activity] || ranking.activity}</span>
                            <div className="score-bar">
                                <div
                                    className="score-fill"
                                    style={{ width: `${ranking.score * 10}%` }}
                                    title={`Score: ${ranking.score}/10`}
                                ></div>
                            </div>
                            <span className="score-value">{ranking.score.toFixed(1)}/10</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityRankings;
