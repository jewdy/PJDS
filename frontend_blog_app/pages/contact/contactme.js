import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaDiscord, FaEnvelope, FaWhatsapp, FaTelegram, FaLinkedin } from 'react-icons/fa';
import Popup from '../contact/Popup'; // Import the Popup component

const ContactMe = () => {
  const form = useRef();
  const [popupVisible, setPopupVisible] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_a281i38', 'template_f4a3kxo', form.current, 'mynRihxrgzx8Su1w-')
      .then((result) => {
          console.log(result.text);
          setPopupVisible(true); // Show the popup on successful email send
          form.current.reset(); // Clear the form fields
      }, (error) => {
          console.log(error.text);
          alert('Failed to send the message.');
      });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pjoedesantos@gmail.com')
      .then(() => alert('Email copied to clipboard!'))
      .catch(err => console.error('Failed to copy email:', err));
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="contact-container">
      <div className="left-section" data-aos="fade-down">
        <h2>Hi! Let's have a quick chat <span role="img" aria-label="chat">💬</span></h2>
        <button className="copy-email-btn" onClick={handleCopyEmail}>Copy Email</button>
        <div className="illustration">
            <img src="/img/techh.png" alt="illustration" />
        </div>
      </div>
      <div className="right-section" data-aos="fade-up">
        <h2>Contact <span>Me</span></h2>
        <form ref={form} className="contact-form" onSubmit={sendEmail}>
          <input type="text" placeholder="Your Name" name="from_name" required />
          <input type="email" placeholder="Your Email" name="from_email" required />
          <textarea placeholder="Your Message Here" name="message" required></textarea>
          <button type="submit">Submit</button>
        </form>
        <div className="social-icons">
          <a href="mailto:pjoedesantos@gmail.com"><FaEnvelope/></a>
          <a href="https://wa.me/+639120286598?text=Hello%20Prince!%20I%20found%20you%20via%20your%20website." 
            aria-label="WhatsApp" 
            target="_blank" 
            rel="noopener noreferrer">
            <FaWhatsapp/>
          </a>
          <a href="https://t.me/Joejooo" 
            aria-label="Telegram" 
            target="_blank" 
            rel="noopener noreferrer">
            <FaTelegram/>
          </a>
          <a href="https://www.linkedin.com/in/prince-joedy-delos-santos-313a32254" 
            aria-label="LinkedIn" 
            target="_blank" 
            rel="noopener noreferrer">
            <FaLinkedin/>
          </a>
        </div>
      </div>
      {popupVisible && <Popup message="Message sent! We’ll be in touch shortly." onClose={handleClosePopup} />}
    </div>
  )
};

export default ContactMe;
