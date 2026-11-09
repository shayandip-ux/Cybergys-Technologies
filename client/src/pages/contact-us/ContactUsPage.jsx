import { useState } from "react";

import Achievement from "../../components/achievement-section/achievement-section.jsx";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.jsx";
import Footer from "../../components/footer/footer.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";

import "./contact-us-page.css";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form Data:", formData);

    // Connect your API or backend submission endpoint here.
  };

  return (
    <>
      <Navbar />

      <main className="contact-us-page">
        <Breadcrumb title="Contact Us" />

        {/* Contact Form Section */}
        <section className="contact-main-section">
          <div className="contact-main-container">
            <div className="contact-main-card">
              {/* Left Contact Information */}
              <div className="contact-info-panel">
                <div className="contact-info-content">
                  <h2>
                    Get in Touch
                    <br />
                    With Us
                  </h2>

                  <p className="contact-info-description">Have a question, idea, or a project in mind? We'd love to hear from you.</p>

                  {/* Phone */}
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <img src="/src/assets/orange-call.png"></img>
                    </div>

                    <div className="contact-info-text">
                      <h4>Call Us</h4>
                      <a href="tel:+91 9007753459">+91 9007753459</a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <img src="/src/assets/orange-email.png"></img>
                    </div>

                    <div className="contact-info-text">
                      <h4>Email Us</h4>
                      <a href="mailto:info@cybergys.com">info@cybergys.com</a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <img src="/src/assets/orange-maps-and-flags.png"></img>
                    </div>

                    <div className="contact-info-text">
                      <h4>Our Office</h4>
                      <p>15th Floor, Module 18, Bengal Eco Intelligent Park, EM-3, Sector V, Salt Lake, Kolkata – 700091</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Contact Form */}
              <div className="contact-form-panel">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-grid">
                    {/* Full Name */}
                    <div className="contact-field">
                      <label htmlFor="contact-fullname">
                        Full Name <span>*</span>
                      </label>

                      <div className="contact-input-wrapper">
                        <img src="/src/assets/person.png" className="w-[20px]"></img>

                        <input type="text" id="contact-fullname" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="contact-field">
                      <label htmlFor="contact-email">
                        Email Address <span>*</span>
                      </label>

                      <div className="contact-input-wrapper">
                        <img src="/src/assets/black-email.png" className="w-[20px]"></img>

                        <input type="email" id="contact-email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="contact-field">
                      <label htmlFor="contact-phone">
                        Phone Number <span>*</span>
                      </label>

                      <div className="contact-input-wrapper">
                        <img src="/src/assets/telephone.png" className="w-[20px]"></img>

                        <input type="tel" id="contact-phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="contact-field">
                      <label htmlFor="contact-subject">
                        Subject <span>*</span>
                      </label>

                      <div className="contact-input-wrapper">
                        <select id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} required>
                          <option value="" disabled>
                            Select a subject
                          </option>

                          <option value="Web Designing">Web Designing</option>

                          <option value="Web Development">Web Development</option>

                          <option value="App Development">App Development</option>

                          <option value="Digital Marketing">Digital Marketing</option>

                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="contact-field contact-message-field">
                      <label htmlFor="contact-message">
                        Message <span>*</span>
                      </label>

                      <div className="contact-input-wrapper">
                        <img src="/src/assets/chatting.png" className="w-[20px]"></img>

                        <textarea id="contact-message" name="message" placeholder="Write your message here..." value={formData.message} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="contact-submit-btn">
                    <span>Send Message</span>

                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
