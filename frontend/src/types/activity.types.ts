export interface Activity {
    id: string;
    name: string;
    category: string;
    description: string;
    iconName: string;
}

export interface ActivityScore {
    activity: Activity;
    score: number;
}

export interface ActivityRankings {
    location: string;
    date: string;
    activities: ActivityScore[];
}

export interface ActivityRankingsProps {
    rankings: ActivityRankings;
}

export interface ActivityRanking {
    activity: string;
    score: number;
}

export interface ActivityRankingsData {
    activityRankings: {
        location: string;
        date: string;
        rankings: ActivityRanking[];
    };
}