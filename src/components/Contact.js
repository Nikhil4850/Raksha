import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import './Pages.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      icon: <Phone size={24} />,
      title: 'Emergency Helpline',
      value: '1-800-SAFE-HER',
      available: '24/7 Available'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Support',
      value: 'support@safeher.com',
      available: 'Response within 24h'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Headquarters',
      value: 'San Francisco, CA',
      available: 'Mon-Fri 9AM-6PM'
    }
  ];

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any questions</p>
      </div>

      <div className="contact-methods">
        {contactMethods.map((method, index) => (
          <motion.div 
            key={index}
            className="contact-method-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="contact-icon">{method.icon}</div>
            <h3>{method.title}</h3>
            <p className="contact-value">{method.value}</p>
            <span className="contact-availability">
              <Clock size={14} />
              {method.available}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="contact-form-section">
        <h2>Send us a Message</h2>
        {submitted ? (
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <MessageCircle size={48} />
            <h3>Message Sent!</h3>
            <p>We'll get back to you as soon as possible.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="What's this about?"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tell us how we can help..."
                required
              />
            </div>
            <button type="submit" className="submit-button">
              <Send size={20} />
              Send Message
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

export default Contact;
