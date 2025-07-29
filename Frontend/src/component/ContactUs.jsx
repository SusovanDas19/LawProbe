import React, { useState,useEffect } from "react";
import "../Info.css";
import axios from "axios";

const ContactUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post("https://api.lawprobe.xyz/user/send-message", formData);
      if (response.data.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear the input fields
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <div className="about-contact-container">
      <section className="contact-section">
        <h1>Contact Us</h1>
        <p>
          Have any questions, feedback, or concerns? Feel free to reach out to
          us. We're here to help!
        </p>
        <div className="contact-details">
          <p>
            📧 <strong>Email:</strong> amesusovan@gmail.com
          </p>
          <p>
            📍 <strong>Address:</strong> WestBengal, India
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
