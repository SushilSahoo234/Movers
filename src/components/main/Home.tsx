import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';
import bike from '../../assets/images/bike.png';
import truck from '../../assets/images/truck.png';
import movers from '../../assets/images/packers.png';
import service from '../../assets/images/service.png';

const Home = () => {
  const [city, setCity] = useState('Select your city');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [userType, setUserType] = useState<'personal' | 'business'| null>(null);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({ pickup: '', drop: '', phone: '', name: '', userType: '' });

  const navigate = useNavigate();
  const location = useLocation();

  const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata', 'Bhubneshwar'];

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleCitySelect = (selectedCity: string): void => {
    setCity(selectedCity);
    setShowDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {
      pickup: pickup ? '' : 'Pickup address is required',
      drop: drop ? '' : 'Drop address is required',
      phone: phone ? '' : 'Valid Phone number is required',
      name: name ? '' : 'Name is required',
      userType: userType ? '' : 'User type is required',
    };
    setError(newErrors);
    return !Object.values(newErrors).some((e) => e !== '');
  };

  const handleEstimateClick = async () => {
    if (!validateForm()) return;

    const formData = {
      name,
      phone,
      pickup,
      drop,
      userType,
      service: selectedService,
      city,
    };

    try {
      const res = await fetch('http://localhost:5000/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        navigate('/result', { state: formData });
        setShowModal(false);
        setSelectedService(null);
        setUserType(null);
      } else {
        console.warn('Error:', result.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    if (location.state?.openEstimate) {
      setShowModal(true);
    }
  }, [location.state]);

  return (
    <div className="home-page">
      <div className="hero-banner">
        <div className="overlay">
          <div className="hero-text">
            <h2>Delivery hai?</h2>
            <h1>#HoJayega!</h1>
          </div>
        </div>
      </div>

      <div className="service-panel">
        <div className="location" onClick={toggleDropdown}>
          <span>📍 City: <strong>{city === 'select your city' ? '--' : city}</strong> ▼</span>
          {showDropdown && (
            <ul className="dropdown-menu">
              {cities.map((c) => (
                <li key={c} onClick={() => handleCitySelect(c)}>{c}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="services">
          {[
            { label: "Two Wheelers", icon: bike },
            { label: "Trucks", icon: truck },
            { label: "Packers & Movers", icon: movers },
            { label: "Intercity Courier Service", icon: service },
            { highlight: true },
          ].map((item, index) => {
            if (item.highlight) {
              return (
                <div
                  key={index}
                  className="estimate-card"
                  onClick={() => setShowModal(true)}
                >
                  <h3 className="estimate-title">Get an estimate</h3>
                  <p className="estimate-subtext">(takes ~2 mins)</p>
                  <div className="arrow">→</div>
                </div>
              );
            }

            return (
              <div key={index} className="service-card">
                <div className="icon">
                  <img src={item.icon} alt={item.label} />
                </div>
                <div className="label">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            {!selectedService ? (
              <div className="modal-content horizontal">
                <div className="modal-left">
                  <h2>Get an Estimate</h2>
                  <p className="modal-subtext">Please select a service.</p>
                  <span className='red'><p>Please ensure to select the city first*</p></span>
                  <div className="modal-service-options">
                    {[
                      { label: "Two Wheelers", icon: bike },
                      { label: "Trucks", icon: truck },
                      { label: "Packers & Movers", icon: movers },
                      { label: "Intercity Courier Service", icon: service },
                    ].map((service) => (
                      <div
                        key={service.label}
                        className="modal-option"
                        onClick={() => setSelectedService(service.label)}
                      >
                        <div className="option-left">
                          <img src={service.icon} alt={service.label} />
                          <span>{service.label}</span>
                        </div>
                        <span className="chevron">➔</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="modal-close"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedService(null);
                      setUserType(null);
                    }}
                  >Close</button>
                </div>
              </div>
            ) : (
              <div className="modal-content horizontal">
                <div className="modal-left">
                  <h2>{selectedService}</h2>
                  <input placeholder="Pickup Address *" value={pickup} onChange={(e) => setPickup(e.target.value)} className="modal-input" />
                  {error.pickup && <p className='error-text'>{error.pickup}</p>}

                  <input placeholder="Drop Address *" value={drop} onChange={(e) => setDrop(e.target.value)} className="modal-input" />
                  {error.drop && <p className='error-text'>{error.drop}</p>}

                  <input placeholder="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} className="modal-input" />
                  {error.phone && <p className='error-text'>{error.phone}</p>}

                  <input placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} className="modal-input" />
                  {error.name && <p className='error-text'>{error.name}</p>}

                  <div className="modal-user-type">
                    <p>What describes you best?</p>
                    <div className="user-buttons">
                      <button className={userType === 'personal' ? 'active' : ''} onClick={() => setUserType('personal')}>Personal</button>
                      <button className={userType === 'business' ? 'active' : ''} onClick={() => setUserType('business')}>Business</button>
                    </div>
                    {error.userType && <p className='error-text'>{error.userType}</p>}
                  </div>

                  <button className="estimate-submit" onClick={handleEstimateClick}>Get Estimate ➔</button>
                  <button className="modal-back" onClick={() => {
                    setSelectedService(null);
                    setUserType(null);
                  }}>← Back</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
