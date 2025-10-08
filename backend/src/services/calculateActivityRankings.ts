import { ActivityRanking, ActivityType } from '../schema/types/activities';
import { WeatherData } from '../schema/types/weather';

/**
 * Configuration for activity scoring rules
 * Each activity has a set of factors that affect its score
 * Each factor has a condition function and a score function
 */
interface ActivityScoringRule {
    name: string;
    factors: {
        condition: (weather: WeatherData) => boolean;
        score: (weather: WeatherData) => number;
    }[];
}

/**
 * Scoring rules for each activity type
 * Each activity starts with a base score of 5 (neutral)
 * the score goes up or down based on weather conditions
 */
const activityScoringRules: Record<ActivityType, ActivityScoringRule> = {
    [ActivityType.SKIING]: {
        name: "Skiing",
        factors: [
            // Temperature factor
            {
                condition: (weather: WeatherData) => weather.temperature !== undefined,
                score: (weather: WeatherData) => {
                    const temp = weather.temperature!;
                    if (temp < -5) return 2;        // Very cold: +2 points
                    if (temp < 0) return 1.5;       // Cold: +1.5 points
                    if (temp < 5) return 1;         // Cool: +1 point
                    if (temp > 5) return -1;        // Slightly warm: -1 point
                    if (temp > 10) return -2;       // Too warm: -2 points
                    return 0;                       // Neutral: no adjustment
                }
            },
            // Snowfall factor
            {
                condition: (weather: WeatherData) => weather.snowfall !== undefined,
                score: (weather: WeatherData) => {
                    const snow = weather.snowfall!;
                    if (snow > 10) return 3;        // Heavy snow: +3 points
                    if (snow > 5) return 2;         // Moderate snow: +2 points
                    if (snow > 0) return 1;         // Light snow: +1 point
                    return -1;                      // No snow: -1 point
                }
            },
            // Wind factor
            {
                condition: (weather: WeatherData) => weather.wind !== undefined,
                score: (weather: WeatherData) => {
                    const wind = weather.wind!;
                    if (wind > 40) return -3;       // Very windy: -3 points
                    if (wind > 30) return -2;       // Quite windy: -2 points
                    if (wind > 20) return -1;       // Moderately windy: -1 point
                    return 0;                       // Low wind: no adjustment
                }
            }
        ]
    },
    [ActivityType.SURFING]: {
        name: "Surfing",
        factors: [
            // Temperature factor
            {
                condition: (weather: WeatherData) => weather.temperature !== undefined,
                score: (weather: WeatherData) => {
                    const temp = weather.temperature!;
                    if (temp > 25) return 2;        // Hot: +2 points
                    if (temp > 20) return 1.5;      // Warm: +1.5 points
                    if (temp > 15) return 1;        // Mild: +1 point
                    if (temp < 10) return -2;       // Cold: -2 points
                    if (temp < 15) return -1;       // Cool: -1 point
                    return 0;                       // Neutral: no adjustment
                }
            },
            // Wind factor
            {
                condition: (weather: WeatherData) => weather.wind !== undefined,
                score: (weather: WeatherData) => {
                    const wind = weather.wind!;
                    if (wind > 15 && wind < 30) return 2;  // Ideal wind: +2 points
                    if (wind > 10 && wind < 35) return 1;  // Good wind: +1 point
                    if (wind > 40) return -2;              // Too windy: -2 points
                    if (wind < 5) return -1;               // Too calm: -1 point
                    return 0;                              // Neutral: no adjustment
                }
            },
            // Precipitation factor
            {
                condition: (weather: WeatherData) => weather.precipitation !== undefined,
                score: (weather: WeatherData) => {
                    const precip = weather.precipitation!;
                    if (precip > 10) return -1.5;   // Heavy rain: -1.5 points
                    if (precip > 5) return -1;      // Moderate rain: -1 point
                    return 0;                       // Light/no rain: no adjustment
                }
            }
        ]
    },
    [ActivityType.OUTDOOR_SIGHTSEEING]: {
        name: "Outdoor Sightseeing",
        factors: [
            // Temperature factor
            {
                condition: (weather: WeatherData) => weather.temperature !== undefined,
                score: (weather: WeatherData) => {
                    const temp = weather.temperature!;
                    if (temp > 28) return -1;       // Too hot: -1 point
                    if (temp > 18 && temp < 26) return 2;  // Ideal temp: +2 points
                    if (temp > 15 && temp < 28) return 1;  // Good temp: +1 point
                    if (temp < 5) return -2;        // Too cold: -2 points
                    if (temp < 10) return -1;       // Cold: -1 point
                    return 0;                       // Neutral: no adjustment
                }
            },
            // Precipitation factor
            {
                condition: (weather: WeatherData) => weather.precipitation !== undefined,
                score: (weather: WeatherData) => {
                    const precip = weather.precipitation!;
                    if (precip > 5) return -3;      // Rainy: -3 points
                    if (precip > 2) return -2;      // Light rain: -2 points
                    if (precip > 0) return -1;      // Drizzle: -1 point
                    return 1;                       // No rain: +1 point
                }
            },
            // Cloud cover factor
            {
                condition: (weather: WeatherData) => weather.cloud_cover !== undefined,
                score: (weather: WeatherData) => {
                    const clouds = weather.cloud_cover!;
                    if (clouds > 80) return -1.5;   // Overcast: -1.5 points
                    if (clouds > 50) return -0.5;   // Partly cloudy: -0.5 points
                    if (clouds < 30) return 1.5;    // Mostly clear: +1.5 points
                    return 0;                       // Neutral: no adjustment
                }
            },
            // Wind factor
            {
                condition: (weather: WeatherData) => weather.wind !== undefined,
                score: (weather: WeatherData) => {
                    const wind = weather.wind!;
                    if (wind > 30) return -2;       // Very windy: -2 points
                    if (wind > 20) return -1;       // Windy: -1 point
                    return 0;                       // Low wind: no adjustment
                }
            }
        ]
    },
    [ActivityType.INDOOR_SIGHTSEEING]: {
        name: "Indoor Sightseeing",
        factors: [
            // Temperature factor - indoor is better when outdoor is uncomfortable
            {
                condition: (weather: WeatherData) => weather.temperature !== undefined,
                score: (weather: WeatherData) => {
                    const temp = weather.temperature!;
                    if (temp > 30 || temp < 5) return 2;  // Extreme temps: +2 points
                    if (temp > 28 || temp < 10) return 1; // Uncomfortable temps: +1 point
                    if (temp > 15 && temp < 25) return -1; // Pleasant temps: -1 point
                    return 0;                             // Neutral: no adjustment
                }
            },
            // Precipitation factor - indoor is better when it's raining
            {
                condition: (weather: WeatherData) => weather.precipitation !== undefined,
                score: (weather: WeatherData) => {
                    const precip = weather.precipitation!;
                    if (precip > 5) return 3;       // Heavy rain: +3 points
                    if (precip > 2) return 2;       // Moderate rain: +2 points
                    if (precip > 0) return 1;       // Light rain: +1 point
                    return -0.5;                    // No rain: -0.5 points
                }
            },
            // Cloud cover factor - indoor is better when it's gloomy
            {
                condition: (weather: WeatherData) => weather.cloud_cover !== undefined,
                score: (weather: WeatherData) => {
                    const clouds = weather.cloud_cover!;
                    if (clouds > 80) return 1;      // Overcast: +1 point
                    if (clouds < 30) return -1;     // Sunny: -1 point
                    return 0;                       // Neutral: no adjustment
                }
            }
        ]
    }
};

/**
 * Calculates activity rankings based on weather data
 * @param weatherData The weather data to use for calculations
 * @returns Array of activity rankings sorted by score (highest first)
 */
export function calculateActivityRankings(weatherData: WeatherData): ActivityRanking[] {
    const rankings: ActivityRanking[] = [];

    // For each activity type
    Object.entries(activityScoringRules).forEach(([activityType, rules]) => {
        const baseScore = 5; // Start with a neutral score
        let scoreAdjustment = 0;

        // For each factor that affects this activity
        for (const factor of rules.factors) {
            // Check if the weather data includes this measurement
            if (factor.condition(weatherData)) {
                // Calculate the score adjustment for this factor
                scoreAdjustment += factor.score(weatherData);
            }
        }

        // Calculate final score and ensure it's between 0 and 10
        const finalScore = Math.max(0, Math.min(10, baseScore + scoreAdjustment));

        // Add to rankings
        rankings.push({
            activity: activityType as ActivityType,
            score: Math.round(finalScore * 10) / 10 // Round to 1 decimal place
        });
    });

    // Sort rankings by score in descending order
    return rankings.sort((a, b) => b.score - a.score);
}

export default calculateActivityRankings;
