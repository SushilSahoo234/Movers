import React from 'react';
import './Support.css';

// Image imports
import call from '../../assets/images/call.png';
import delivery from '../../assets/images/delivery.png';
import parcel from '../../assets/images/parcel.png';
import driver from '../../assets/images/driver.png';

const supportCards = [
  {
    title: "CUSTOMER SUPPORT",
    content: (
      <>
        <p><a href="/delivery">Click here</a> to read our FAQs</p>
        <p>
          For support with your bookings and other queries, email us at
          <a href="mailto:help@movers.in"> help@movers.in</a> or call us on
          <a href="tel:8114740189"> 022 4410 4410</a>
        </p>
      </>
    ),
    icon: call,
  },
  {
    title: "PACKERS AND MOVERS",
    content: (
      <p>
        For queries and support regarding your house shifting booking, email us at
        <a href="mailto:packermover@movers.in"> packermover@movers.in</a> or call us on
        <a href="tel:02244104444"> 022 4410 4444</a> or
        <a href="tel:02262684444"> 022 6268 4444</a>
      </p>
    ),
    icon: delivery,
  },
  {
    title: "ENTERPRISE SERVICES",
    content: (
      <p>
        If you are an enterprise and are looking for goods transportation services for your business,
        <a href="/"> Click here</a> or email us at
        <a href="mailto:help@movers.in"> help@movers.in</a>
      </p>
    ),
    icon: parcel,
  },
  {
    title: "DRIVE WITH PORTER",
    content: (
      <p>
        Have a mini truck or bike? Earn money by fulfilling transportation orders assigned by Movers.
        <a href="/delivery">Click here</a> or reach us out on
        <a href="tel:8114740189"> 022 4410 4410</a> (add your city code)
      </p>
    ),
    icon: driver,
  },
];

const Support = () => {
  return (
    <div className='support-container'>
      <div className='support-header'>
        <h3>HELP CENTER</h3>
        <p>Need assistance? We're happy to help, reach us out through the appropriate channels below.</p>
      </div>

      <div className='support-card-container'>
        {supportCards.map((card, index) => (
          <div className='support-card' key={index}>
            <div className='support-card-icon'>
              <img src={card.icon} alt={card.title} />
            </div>
            <div className='support-card-text'>
              <h3>{card.title}</h3>
              {card.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
