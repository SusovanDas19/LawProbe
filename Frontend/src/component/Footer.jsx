import whiteLogo from "../assets/logoWhite.png";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { motion } from "framer-motion";
import "../Responsive/Rheader.css"

function Footer() {
  return (
    <div className="footer2">
      <div className="footerLogo">
        <Link to="/">
          <div id="logo">
            <img src={whiteLogo} alt="" />
          </div>
        </Link>
        <p>Know more and Maintain more</p>
      </div>

      <div className="info">
        <Link to="/aboutUs" className="infoLink">
          <p>About us</p>
        </Link>
        <Link to="/termsOfService" className="infoLink">
          <p>Terms of Service</p>
        </Link>
        <Link to="/contactUs" className="lInfoLink">
          <p>Contact us</p>
        </Link>
      </div>
      <div className="socialLink">
        <motion.div
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 100, damping: 5 }}
        >
          <Link to="https://github.com/SusovanDas19/LawProbe"  target="_blank">
            <FaGithub className="socialIcon" />
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 100, damping: 5 }}
        >
         
         <Link to="https://twitter.com/Susovan06893679" target="_blank"><RiTwitterXLine className="socialIcon" /></Link> 
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 100, damping: 5 }}
        >
          <Link to="https://www.linkedin.com/in/susovan-das-b927b7254/" target="_blank">
            <FaLinkedin className="socialIcon" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Footer;
