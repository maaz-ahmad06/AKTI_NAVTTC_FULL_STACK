import "./Footer.css";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import youtube from "../assets/youtube.png";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="social-media">
          <h1>
            Shop<span>Ease</span>
          </h1>
          <p>Your one-stop shop for quality prodects at the best prices.</p>
          <div>
            <img src={facebook} alt="" />
            <img src={twitter} alt="" />
            <img src={instagram} alt="" />
            <img src={youtube} alt="" />
          </div>
        </div>

        <div className="links">
          <h2>Quick Links</h2>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>About Us</li>
            <li>contact</li>
          </ul>
        </div>

        <div className="services">
          <h2>Customer Service</h2>
          <ul>
            <li>FAQS</li>
            <li>Shipping & Delivery</li>
            <li>Retturns & Refunds</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="news">
          <h2>Newsletter</h2>
          <p>Subscribe to get updates on new products and offers</p>
          <div>
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <div>&copy; 2026 EduZone. all rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
