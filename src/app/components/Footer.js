import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />V92V+3HQ, Phuentsholing, Chhukha</p>
              <p><FontAwesomeIcon icon={faPhone} className="me-2" />(+975) 17160538</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="me-2" />Email: info(dot)cst@rub(dot)edu(dot)bt</p>
            </address>
          </div>
          <div className="col-md-4">
            <h5>Connect With Us</h5>
            <a href="https://www.facebook.com/CSTfootballArena" className="social-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookSquare} className="me-2" />College Football Facebook Page
            </a>
            <br />
            <a href="https://www.facebook.com/profile.php?id=61552378951280" className="social-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookSquare} className="me-2" />College Volleyball Facebook Page
            </a>
            <br />
            <a href="https://www.facebook.com/CSTBASKETBALL" className="social-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookSquare} className="me-2" />College Basketball Facebook Page
            </a>
          </div>
          <div className="col-md-4">
            <h5>Sports Office Hours</h5>
            <p>Monday - Friday: 4:00 PM - 10:00 PM</p>
            <p>Saturday - Sunday: 6:00 AM - 10:00 PM</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; 2025 College Sports Team. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}