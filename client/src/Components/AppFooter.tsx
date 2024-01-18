import '../assets/css/AppFooter.css'
import {Link} from "react-router-dom";

function AppFooter(){
    return(
        <div className="footer-container">
            <div className="contact-us">
                <span><Link className="contact-us-anchor text" to="/">CONTACT US</Link></span>
                <span><i className="fa-solid fa-envelope text"></i>dbstore@dbs.com</span>
                <span><i className="fa-solid fa-phone text"></i> +1 571 777 7777</span>
            </div>

            <div className="copyrights">
                <span><i className="fa-solid fa-location-dot text"></i>Virginia, VA, 22180</span>
                <span><i className="fa-regular fa-copyright text"></i>2023, All rights reserved, DBS inc.</span>
            </div>

            <div className="social-profiles">
                <span>FOLLOW US </span>
                <span className="social-handles text">
                    <i className="fa-brands fa-facebook text"></i>
                    <i className="fa-brands fa-instagram text"></i>
                    <i className="fa-brands fa-twitter text"></i>
                 </span>
                <span className="text"> Privacy and Terms </span>
            </div>
        </div>
    )
}

export default AppFooter;