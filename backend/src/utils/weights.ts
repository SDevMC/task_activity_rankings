export const WEIGHTS = {
    SKIING: {
        snowfall: 0.5,
        temperature: 0.3,
        wind: 0.2
    },
    SURFING: {
        temperature: 0.4,
        wind: 0.4,
        precipitation: 0.2
    },
    OUTDOOR_SIGHTSEEING: {
        temperature: 0.4,
        precipitation: 0.3,
        wind: 0.2,
        cloud_cover: 0.1
    },
    INDOOR_SIGHTSEEING: {
        precipitation: 0.6,
        temperature: 0.4
    }
} as const;