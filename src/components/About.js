import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Users, Globe, Award, Phone } from 'lucide-react';
import './Pages.css';

function About() {
  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '100+', label: 'Cities Covered' },
    { number: '24/7', label: 'Support Available' },
    { number: '99.9%', label: 'Uptime' },
  ];

  const values = [
    {
      icon: <Shield size={32} />,
      title: 'Safety First',
      description: 'Your security is our top priority. We use advanced technology to keep you protected.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Compassionate Care',
      description: 'We understand the importance of emotional support during difficult times.'
    },
    {
      icon: <Users size={32} />,
      title: 'Community Driven',
      description: 'Built by and for women, with features designed based on real user feedback.'
    },
    {
      icon: <Globe size={32} />,
      title: 'Global Reach',
      description: 'Available worldwide with localized emergency contacts and resources.'
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
        <h1>About SafeHer</h1>
        <p>Empowering women through technology and community</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="content-section">
        <h2>Our Mission</h2>
        <p className="mission-text">
          SafeHer was founded with a singular vision: to create a world where every woman feels 
          safe, empowered, and connected. We believe that technology can be a powerful force for 
          good, providing immediate assistance when it matters most.
        </p>
        <p className="mission-text">
          Our platform combines cutting-edge AI technology with a compassionate community approach, 
          ensuring that help is always just one tap away. Whether you're walking home late at night 
          or facing an emergency situation, SafeHer is your digital guardian.
        </p>
      </div>

      <div className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <motion.div 
              key={index}
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="team-section">
        <h2>Recognitions</h2>
        <div className="awards-grid">
          <div className="award-item">
            <Award size={24} />
            <span>Women in Tech Innovation Award 2024</span>
          </div>
          <div className="award-item">
            <Award size={24} />
            <span>Best Safety App - App Store</span>
          </div>
          <div className="award-item">
            <Award size={24} />
            <span>UN Women Empowerment Partner</span>
          </div>
        </div>
      </div>

      <div className="emergency-contact-banner">
        <Phone size={24} />
        <div>
          <strong>Emergency?</strong>
          <span>Call 911 or your local emergency number immediately</span>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
