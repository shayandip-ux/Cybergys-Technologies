import { useEffect, useState } from "react";

import Achievement from "../../components/achievement-section/achievement-section.jsx";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.jsx";
import Footer from "../../components/footer/footer.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import callIcon from "../../assets/orange-call.png";
import emailIcon from "../../assets/orange-email.png";
import locationIcon from "../../assets/orange-maps-and-flags.png";
import personIcon from "../../assets/person.png";
import formEmailIcon from "../../assets/black-email.png";
import phoneIcon from "../../assets/telephone.png";
import messageIcon from "../../assets/chatting.png";

import "./contact-us-page.css";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [contactDetails, setContactDetails] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Could not load contact details")))
      .then(({ data }) => setContactDetails(data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Could not send your message.");
      setSubmissionStatus(payload.message);
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmissionStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
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
                      <img src={callIcon} alt="" />
                    </div>

                    <div className="contact-info-text">
                      <h4>Call Us</h4>
                      <a href={`tel:${contactDetails?.phone ?? "+91 9007753459"}`}>{contactDetails?.phone ?? "+91 9007753459"}</a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <img src={emailIcon} alt="" />
                    </div>

                    <div className="contact-info-text">
                      <h4>Email Us</h4>
                      <a href={`mailto:${contactDetails?.email ?? "info@cybergys.com"}`}>{contactDetails?.email ?? "info@cybergys.com"}</a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <img src={locationIcon} alt="" />
                    </div>

                    <div className="contact-info-text">
                      <h4>Our Office</h4>
                      <p>{contactDetails?.address ?? "15th Floor, Module 18, Bengal Eco Intelligent Park, EM-3, Sector V, Salt Lake, Kolkata – 700091"}</p>
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
                        <img src={personIcon} className="w-[20px]" alt="" />

                        <input type="text" id="contact-fullname" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="contact-field">
                      <label htmlFor="contact-email">
                        Email Address <span>*</span>
                      </label>

                      <div className="contact-input-wrapper">
                        <img src={formEmailIcon} className="w-[20px]" alt="" />

                        <input type="email" id="contact-email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="contact-field">
                      <label htmlFor="contact-phone">
                        Phone Number <span>*</span>
                      </label>

                      <div className="contact-input-wrapper">
                        <img src={phoneIcon} className="w-[20px]" alt="" />

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

                          {(contactDetails?.subjects ?? ["Web Designing", "Web Development", "App Development", "Digital Marketing", "Other"]).map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="contact-field contact-message-field">
                      <label htmlFor="contact-message">
                        Message <span>*</span>
                      </label>

                      <div className="contact-input-wrapper">
                        <img src={messageIcon} className="w-[20px]" alt="" />

                        <textarea id="contact-message" name="message" placeholder="Write your message here..." value={formData.message} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" disabled={isSubmitting} className="contact-submit-btn">
                    <span>{isSubmitting ? "Sending…" : "Send Message"}</span>

                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </button>
                  {submissionStatus && <p role="status" className="mt-3 text-sm text-[#f27d2f]">{submissionStatus}</p>}
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
