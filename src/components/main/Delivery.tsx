import "./Delivery.css";
import { useState } from "react";
import banner from '../../assets/images/Bg.jpg';
import loadingGif from '../../assets/images/mainvideo.gif';
import ownerGif from '../../assets/images/ownermain.gif';
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [source, setSource] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState<"register" | "book" | null>(null);
  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      phone,
      city,
      vehicle,
      source,
    };
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/delivery`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();
      if(res.ok){
        // alert('Registration Sucessful');
        setIsFlipped(true);
        setName('');
        setPhone('');
        setCity('');
        setVehicle('');
        setSource('');
      }else{
        alert(result.error || 'Failed to register');
      }
    } catch (err) {
        console.error(err);
        alert('Something went wrong');
    }
  };
   const handleNeedHelpClick = () => {
      navigate('/', {state: {openEstimate: true}});
    }
  return (
    <div className='delivery'>
      <div className="option-selector">
        <button onClick={handleNeedHelpClick}>I need help moving</button>
        <button onClick={() => setActiveOption('register')}>I have a vehicle</button>
      </div>
     <div id='register-section' className='delivery-container' style={{ backgroundImage: `url(${banner})` }}>
  <div className='hero-wrapper'>
    
    <div className='header-text'>
      <h3>Have a mini truck or bike?</h3>
      <p>Earn money by fulfilling transportation orders assigned by Movers.</p>
    </div>
{activeOption === "register" && (
<div className="flip-container">
  <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
    {/* Front: Register Form */}
    <div className="flip-card-front">
      <div className="register-form">
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="form-row">
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="" disabled>City</option>
            <option value="BANGALORE">BANGALORE</option>
            <option value="MUMBAI">MUMBAI</option>
            <option value="DELHI">DELHI</option>
            <option value="AHEMADABAD">AHEMADABAD</option>
            <option value="BHUBNESHWAR">BHUBNESHWAR</option>

            </select>
            <select className="vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
              <option value="" disabled>Vehicle</option>
            <option value="Bike">Bike</option>
            <option value="Truck">Truck</option>
            <option value="Tata">Tata 407</option>
            <option value="Pickup">Pickup</option>
            <option value="Ace">Tata Ace</option>
            <option value="Loader">E Loader</option>
            <option value="3-Wheeler">3 wheeler</option>
            <option value="Others">Others</option>

            </select>
          </div>
          <select value={source} onChange={(e) => setSource(e.target.value)}>
             <option value="" disabled >Source</option>
          <option value="Facebook">Facebook</option>
          <option value="Google Ads">Google Ads</option>
          <option value="Newpaper Ads">Newpaper Ads</option>
          <option value="Channel Partner">Channel Partner</option>
          <option value="Driver Referral">Driver Referral</option>
          <option value="Others">Others</option>

          </select>
          <button type="submit">REGISTER</button>
        </form>
      </div>
    </div>

    {/* Back: Thank You Card */}
    <div className="flip-card-back">
      <button className="close-btn" onClick={() => setIsFlipped(false)}>×</button>
      <h3>Thank you for registering!</h3>
      <p>We’ll get back to you soon.</p>
      <p>Want to register more vehicle?</p>
    </div>
  </div>
</div>
)}
  </div>
</div>


      <div className='about'>
        <h4>Mover's Advantages</h4>
        <div className='about-img'>
          {[{
            img: "https://dom-website-prod-cdn-cms.porter.in/feature_1_f7b50fede5.png",
            title: "Regular Trips",
            desc: "With our growing presence across multiple cities, we always have our hands full! This means you will never run out of trips."
          }, {
            img: "https://dom-website-prod-cdn-cms.porter.in/feature_2_adc812619d.png",
            title: "Better Earning",
            desc: "Earn more by partnering with the best! Regular trips and efficient service can grow your earnings!"
          }, {
            img: "https://dom-website-prod-cdn-cms.porter.in/feature_3_e6d1e49e25.png",
            title: "On-Time Payment",
            desc: "Be assured to receive all payments on time & get the best in class support, by renting/ hiring your vehicle along with the operator to Mover."
          }].map((item, index) => (
            <div className='about-img-indi' key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='motive'>
        <h3>Making Your Life Easy Day by Day</h3>
        <div className='motive-container'>
          <div className='motive-banner'>
            <img src={loadingGif} alt="Loading" />
          </div>
          <div className='motive-text'>
            <div className='motive-text-main'>
              <h3>Provide your two wheeler or commercial vehicle on rent/hire along with the operator. If you got a 2 wheeler, or a tata ace commercial vehicle, you are good to go! With Movers, no more waiting on the stand - Offer your tata ace along with operator on rent/ hire to Movers to have a steady stream of trips with an agreed fee on every order you undertake and added incentives based on your performance, so that there is no waiting and idle time at the stand! No more bargaining. Standard Rates - The rates and calculation methods are standardized and completely transparent. No more wasting time in fixing the rates for every trip. Hassle Free Navigation with our GPS-based navigation you can drive anywhere across your city without worrying about the directions. Get real-time navigation assistance on the go!</h3>
            </div>
          </div>
        </div>
      </div>

      <div className='about'>
        <h3>Additional Benefits</h3>
        <div className='about-img'>
          {[{
            img: "https://dom-website-prod-cdn-cms.porter.in/benefits_1_bc50a88fc4.png",
            title: "Health Care Assistance",
            desc: "Get healthcare benefits for you and your family for a mini truck."
          }, {
            img: "https://dom-website-prod-cdn-cms.porter.in/benefits_2_9b224ae237.png",
            title: "Insurance",
            desc: "Insurance Save money with reduced annual maintenance and insurance costs on your vehicle."
          }, {
            img: "https://dom-website-prod-cdn-cms.porter.in/benefits_4_e0e6a4209c.png",
            title: "Discount on Vehicle Purchase",
            desc: "Get major discounts on purchase of new vehicles. Add to your fleet and grow your business!"
          }, {
            img: "https://dom-website-prod-cdn-cms.porter.in/benefits_3_b470056793.png",
            title: "Fuel card for savings",
            desc: "Save big on fuel costs with our smart fuel card and increase your profit margins!"
          }].map((item, index) => (
            <div className='benefit' key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='owner'>
        <h3>Own Multiple Vehicles?</h3>
        <div className='motive-container'>
          <div className='motive-banner'>
            <img src={ownerGif} alt="Owner" />
          </div>
          <div className='motive-text'>
            <div className='motive-text-main'>
              <span className='owner-h'><h3>If you are a fleet owner and own multiple vehicles</h3></span>
              <span className='owner-p'><p>Keeping track of your vehicle fleet and optimising their efficiency can be a huge challenge. Partner with Movers to boost your earnings and manage your vehicles easily.</p></span>
              <a href="#register-section" className='owner-button'>CONTACT US</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
