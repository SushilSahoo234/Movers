import React from 'react'
import './Enterprise.css'
const Enterprise = () => {
  return (
    <div>
      <div className='hero-section'>
        <div className='text-section'>
          <div className='hero-text'>
            <h4>Mover's Experience</h4>
            <div className='hero-para'>
              <p>End-to-End Logistics, Simplified and Centralized</p>
            </div>
            <div className='hero-labels'>
              <p>Seamless Moving | Smooth Transitions | Stress-Free Logistics</p>
            </div>
          </div>
        </div>
        <div className='contact-form-container'>
          <h2>Fill Out For More Details</h2>
          <form action="" className='contact-form'>
            <div className='input-group'>
              <input type="text" placeholder='Enter your name*' required />
            </div>
            <div className='input-group'>
              <input type="text" placeholder='Enter your Company name*' required />
            </div>
            <div className='input-group'>
              <input type="text" placeholder='Enter your Phone number*' required />
            </div>
            <div className='input-group'>
              <input type="text" placeholder='Enter your Email ID' required />
            </div>
            <button type='submit'>Get in Touch</button>
          </form>
        </div>

      </div>
      <div className='feature-section'>
        <div className='feature-hero'>
          <h4>Features We Offer</h4>
        </div>
        <div className='feature-main'>
          <div className='feature-card1'>
            <h4>Unified Trip Details</h4>
            <p>Check all your goods transportations trip information in the city.</p>
            <div className='feature-details'>
              <img src="https://nest-platform-assets.porter.in/Trip_Details_Desktop_59a39bc6ea.png" alt="Trip Details" />
            </div>
          </div>
          <div className='feature-card2'>
            <h4>Payments through Prepaid Wallet</h4>
            <p>No cash reimbrusement hassless, as all trips are prepaid.</p>
            <div className='feature-details-booking'>
              <img src="https://nest-platform-assets.porter.in/Business_Wallet_Desktop_f0eb40b5b6.png" alt="Review Booking" />
            </div>
          </div>
        </div>

      </div>
      <div className='what-we-do'>
        <div className='purpose-hero'>
          <h4>Empowering Cities with Smarter Logistics.</h4>
          <p>Our business is growing by the minute! We are now present in many cities and have an extensive fleet of driver-partners! We have established ourselves as a trusted goods transportation service provider for big or small businesses, eCommerce merchants, supermarkets, Kirana store owners and many more for their business goods transportation services. Our loyal customers across many cities serve as a testament of our top notch service and ever expanding presence.</p>
          
        </div>
        <div className='what-we-do-img'>
          <div className='img-slot'>
            <div className='images' style={{backgroundImage: 'url("https://dom-website-prod-cdn-cms.porter.in/Ahmedabad_Icon_1494a280ec.webp")',}}></div>
            <p>Ahmedabad</p>
          </div>
          <div className='img-slot'>
            <div className='images' style={{backgroundImage:'url("https://dom-website-prod-cdn-cms.porter.in/Delhi_52d863d112_3d54a6121e.webp")',}}></div>
            <p>Delhi</p>
          </div>
          <div className='img-slot'>
            <div className='images' style={{backgroundImage: 'url("https://dom-website-prod-cdn-cms.porter.in/Hyderabad_6a3d9c3f43_5203dd00a8.webp")'}}></div>
            <p>Hyderabad</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Enterprise;
