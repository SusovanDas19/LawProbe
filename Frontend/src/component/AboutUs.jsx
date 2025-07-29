import React, { useEffect } from "react";
import "../Info.css";
import { HiMiniRectangleStack } from "react-icons/hi2";
import '../Responsive/Rinfo.css'
function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mainInfo">
      <div className="subdivInfo">
        <h1>About Us </h1>
        <p>
          Welcome to LawProbe, where we combine cutting-edge technology with
          expert legal knowledge to bring justice closer to everyone.
        </p>
      </div>
      <div className="subdivInfo">
        <h1>Our Vision</h1>
        <p>
          We envision a world where everyone, regardless of their background,
          can navigate the complexities of the legal system with confidence and
          ease. By leveraging advanced technology, we aim to bridge the gap
          between law and the people it serves.
        </p>
      </div>
      <div className="whatWeDo">
        <h1>What We Do</h1>
        <div>
        <p>Our platform allows users to:</p>
        <li><HiMiniRectangleStack/> Write incident details for instant guidance.</li>
        <li><HiMiniRectangleStack/> Receive accurate legal references and insights in real time.</li>
        <li><HiMiniRectangleStack/> Access a user-friendly interface designed to simplify the legal journey.</li>
        </div>
        <p>By combining AI MODEL we ensure that every detail is processed and matched with the most relevant laws, sections, and actionable solutions.</p>
      </div>
    </div>
  );
}

export default AboutUs;
