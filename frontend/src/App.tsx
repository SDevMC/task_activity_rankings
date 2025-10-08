import { useState } from 'react';
import LocationSearch from './components/LocationSearch';
import LocationDetails from './components/LocationDetails';
import './App.css';
import type { Location } from './types';


function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const clearSelectedLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Weather Desirability App</h1>
      </header>

      <main>
        {!selectedLocation ? (
          <LocationSearch onLocationSelect={handleLocationSelect} />
        ) : (
          <LocationDetails
            location={selectedLocation}
            onClear={clearSelectedLocation}
          />
        )}
      </main>
    </div>
  );
}

export default App;
