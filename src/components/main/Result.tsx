import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Result.css';

interface LocationState {
  pickup: string;
  drop: string;
  userType: string;
  service: string;
  city: string;
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [estimate, setEstimate] = useState<number | null>(null);
  const [vehiclesInCity, setVehiclesInCity] = useState<any[]>([]);
  const [isValidState, setIsValidState] = useState(true);

  // Fetch vehicles in the same city
  const fetchVehiclesInCity = async (city: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/delivery-partners/by-city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city })
      });

      const data = await res.json();
      console.log("Response from /by-city", data)
      
      if (data.partners) {
        setVehiclesInCity(data.partners);
      }
    } catch (error) {
      console.error("Failed to fetch delivery partners:", error);
    }
  };

  // Validate navigation state & fetch vehicles
  useEffect(() => {
    if (!state || !state.pickup || !state.drop || !state.service) {
      setIsValidState(false);
      navigate('/', { replace: true });
    } else {
      setPickup(state.pickup);
      setDrop(state.drop);
      if (state.city) {
        fetchVehiclesInCity(state.city);
        console.log('City sent to backend', state.city);
      }
    }
  }, [state, navigate]);

  // Fetch fare estimate
  useEffect(() => {
    if (pickup && drop && state?.service) {
      fetchEstimate();
    } else {
      setEstimate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickup, drop]);

  const fetchEstimate = async () => {
    try {
      const geoUrl = "https://api.openrouteservice.org/geocode/search";
      const apiKey = "5b3ce3597851110001cf6248f7083ef817574bfb8873e3d62e82c831";

      const fetchCoordinates = async (address: string) => {
        const res = await fetch(`${geoUrl}?api_key=${apiKey}&text=${encodeURIComponent(address)}`);
        const data = await res.json();
        return data.features[0]?.geometry.coordinates;
      };

      const startCoords = await fetchCoordinates(pickup);
      const endCoords = await fetchCoordinates(drop);

      if (!startCoords || !endCoords) {
        console.error("Invalid address or no coordinates found.");
        setEstimate(null);
        return;
      }

      if (startCoords[0] === endCoords[0] && startCoords[1] === endCoords[1]) {
        console.warn("Pickup and drop are at the same location");
        setEstimate(0);
        return;
      }

      const response = await fetch("http://localhost:5000/api/estimate/fare/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: startCoords.join(','),
          end: endCoords.join(',')
        })
      });

      if (!response.ok) {
        throw new Error("Backend estimate API failed");
      }

      const data = await response.json();
      console.log("Backend response:", data);

      const distance = Number(data.distanceKm); // distanceKm must match backend key
      if (!Number.isFinite(distance)) {
        console.error("Invalid distance value from backend:", data.distanceKm);
        setEstimate(null);
        return;
      }

      const fare = 20 + distance * 8;
      setEstimate(Math.round(fare));
    } catch (error) {
      console.error("Error fetching estimate:", error);
      setEstimate(null);
    }
  };

  return (
  <div className="result">
    <h2>Estimate for {state?.service}</h2>

    <div className="input-group">
      <label>Pickup Address</label>
      <input
        type="text"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />
    </div>

    <div className="input-group">
      <label>Drop Address</label>
      <input
        type="text"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
      />
    </div>

  <div className="result-content">
  {/* Vehicle List */}
  {vehiclesInCity.length > 0 && (
    <div className="vehicle-list">
      <h3>Available Vehicles in {state?.city}</h3>
      <ul>
        {vehiclesInCity.map((v, idx) => (
          <li key={idx}>
            <strong>{v.name}</strong> — {v.vehicle}<br />
            ☎️ <a href={`tel:${v.phone}`}>{v.phone}</a>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Estimate container */}
  <div className="estimate-container">
    {estimate !== null ? (
      <p className="estimate-display">
        💰 Estimated Cost: <strong>₹{estimate}</strong>
      </p>
    ) : (
      <p className="estimate-display">Loading estimate or invalid input...</p>
    )}
  </div>
</div>

  </div>
);
}
export default Result;
