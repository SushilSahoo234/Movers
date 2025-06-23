import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">movers</div>

        <div className="footer-column">
          <a href="/support">Support</a>
          <a href="/enterprise">For Enterprise</a>
          <a href="/delivery">Delivery Partners</a>
        </div>
        <div className="footer-column">
          <a href="/">Packers & Movers</a>
          <a href="/">Two Wheellers</a>
        </div>
        <div className="footer-column">
          <a href="#">Jobs</a>
          <a href="#">Market</a>
        </div>
      </div>

      <div className="footer-bottom footer-container">
        <div>
          <a href="#">Cookies Policy</a> | <a href="#">Legal</a> | <a href="#">Privacy</a>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/sushillll_1/?hl=en">Instagram</a>
          <a href="https://www.linkedin.com/in/sushil-sahoo-550ba4261/">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="https://github.com/SushilSahoo234">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
