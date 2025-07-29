import React,{useEffect} from "react";
import "../Info.css";
import "../Responsive/Rinfo.css"

const TermsOfService = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms of Service</h1>
      <p className="last-updated">Last Updated: [07/02/2025]</p>

      <section className="intro">
        <p>
          Welcome to <strong>LawProbe</strong>! These Terms of Service ("Terms") govern your use of the LawProbe
          application and website. By accessing or using our services, you agree to comply with and be bound by these Terms.  
          If you do not agree, please do not use LawProbe.
        </p>
      </section>

      <section className="terms-section">
        <h2>Definitions</h2>
        <ul>
          <li><strong>"LawProbe"</strong> refers to our website, application, and services.</li>
          <li><strong>"User"</strong> refers to any individual who accesses or uses LawProbe.</li>
          <li><strong>"Content"</strong> includes legal information, text, graphics, and other materials provided by LawProbe.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>Services Provided</h2>
        <p id="imp">
          LawProbe is an AI-powered legal information tool that provides general guidance based on user-inputted incidents.  
          It does <strong>not provide legal representation, advice, or guarantees of accuracy.</strong>  
          Always consult a licensed attorney for legal matters.
        </p>
      </section>

      <section className="terms-section">
        <h2>No Legal Advice Disclaimer</h2>
        <p id="imp">
          LawProbe provides <strong>general legal information</strong>, not legal advice. Using our platform  
          <strong> does not create an attorney-client relationship</strong>.  
          We are not liable for any decisions or actions taken based on the information provided.
        </p>
      </section>

      <section className="terms-section">
        <h2>Limitation of Liability</h2>
        <p id="imp">
          LawProbe is provided on an <strong>"as-is"</strong> basis. We do not guarantee the accuracy, reliability,  
          or completeness of any legal information provided.  
          We are not responsible for any direct, indirect, incidental, or consequential damages resulting from your use of the platform.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
