import ActivityRankings from "./ActivityRankings";
import type { LocationDetailsProps } from "../types";

const LocationDetails = ({ location, onClear }: LocationDetailsProps) => {
    return (
        <div className="location-details">
            <h2>Location Details</h2>
            <div className="details-card">
                <h3>{location.name}, {location.country}</h3>
                <ActivityRankings location={location.name} />
            </div>
            <button className="back-button" onClick={onClear}>Back to Search</button>
        </div>
    )
}

export default LocationDetails;