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
  const [surgeMultiplier, setSurgeMultiplier] = useState(1);

  // Peak hours for surge
  const peakHours = [
    { start: 7, end: 10 },
    { start: 18, end: 21 },
  ];

  const getSurgeMultiplier = () => {
    const now = new Date();
    const currentHour = now.getHours();

    for (let slot of peakHours) {
      if (currentHour >= slot.start && currentHour < slot.end) return 1.5;
    }
    if (Math.random() < 0.1) return 1.3; // occasional high-demand surge

    return 1;
  };

  // Fetch vehicles in the city
  const fetchVehiclesInCity = async (city: string) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/delivery-partners/by-city`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city }),
        }
      );
      const data = await res.json();
      if (data.partners) setVehiclesInCity(data.partners);
    } catch (error) {
      console.error('Failed to fetch delivery partners:', error);
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
      if (state.city) fetchVehiclesInCity(state.city);
    }
  }, [state, navigate]);

  // Fetch fare estimate whenever pickup/drop changes
  useEffect(() => {
    if (pickup && drop && state?.service) fetchEstimate();
    else setEstimate(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickup, drop]);

  const fetchEstimate = async () => {
    try {
      const geoUrl = 'https://api.openrouteservice.org/geocode/search';
      const routeUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
      const apiKey = 'YOUR_OPENROUTESERVICE_API_KEY';

      const fetchCoordinates = async (address: string) => {
        const res = await fetch(
          `${geoUrl}?api_key=${apiKey}&text=${encodeURIComponent(address)}`
        );
        const data = await res.json();
        return data.features[0]?.geometry.coordinates;
      };

      const startCoords = await fetchCoordinates(pickup);
      const endCoords = await fetchCoordinates(drop);

      if (!startCoords || !endCoords) {
        setEstimate(null);
        return;
      }

      if (startCoords[0] === endCoords[0] && startCoords[1] === endCoords[1]) {
        setEstimate(0);
        setSurgeMultiplier(1);
        return;
      }

      // Get route distance + duration
      const routeRes = await fetch(routeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey,
        },
        body: JSON.stringify({ coordinates: [startCoords, endCoords] }),
      });

      const routeData = await routeRes.json();
      const summary = routeData.routes[0].summary;
      const distanceKm = summary.distance / 1000;
      const durationMin = summary.duration / 60;

      // Uber-style fare formula
      const baseFare = 30;
      const perKmRate = 10;
      const perMinRate = 2;
      const bookingFee = 10;
      const minimumFare = 80;

      const surge = getSurgeMultiplier();
      setSurgeMultiplier(surge);

      let fare =
        baseFare + distanceKm * perKmRate + durationMin * perMinRate + bookingFee;
      fare = fare * surge;
      fare = Math.max(fare, minimumFare);

      setEstimate(Math.round(fare));
    } catch (error) {
      console.error('Error fetching estimate:', error);
      setEstimate(null);
    }
  };

  return (
    <div className="result">
      <h2>Estimate for {state?.service}</h2>

      <div className="input-group">
        <label>Pickup Address</label>
        <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Drop Address</label>
        <input type="text" value={drop} onChange={(e) => setDrop(e.target.value)} />
      </div>

      <div className="result-content">
        {/* Vehicle List */}
        {vehiclesInCity.length > 0 && (
          <div className="vehicle-list">
            <h3>Available Vehicles in {state?.city}</h3>
            <ul>
              {vehiclesInCity.map((v, idx) => (
                <li key={idx}>
                  <strong>{v.name}</strong> — {v.vehicle}
                  <br />
                  ☎️ <a href={`tel:${v.phone}`}>{v.phone}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Estimate container */}
        <div className="estimate-container">
          {estimate !== null ? (
            <>
              <p className="estimate-display">
                💰 Estimated Cost: <strong>₹{estimate}</strong>
              </p>
              {surgeMultiplier > 1 && (
                <p className="surge-info">
                  ⚡ Surge pricing active! Fare increased by{' '}
                  {Math.round((surgeMultiplier - 1) * 100)}%
                </p>
              )}
            </>
          ) : (
            <p className="estimate-display">Loading estimate or invalid input...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
