import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send, ThumbsUp, AlertCircle, CheckCircle } from 'lucide-react';
import './Pages.css';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { value: 'general', label: 'General Feedback', icon: <MessageSquare size={18} /> },
    { value: 'bug', label: 'Bug Report', icon: <AlertCircle size={18} /> },
    { value: 'feature', label: 'Feature Request', icon: <ThumbsUp size={18} /> },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFeedback('');
      setCategory('general');
    }, 3000);
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <h1>Your Feedback Matters</h1>
        <p>Help us improve SafeHer for everyone</p>
      </div>

      {submitted ? (
        <motion.div 
          className="success-feedback"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle size={64} className="success-icon" />
          <h2>Thank You!</h2>
          <p>Your feedback helps us make SafeHer better for everyone.</p>
        </motion.div>
      ) : (
        <div className="feedback-form-container">
          <div className="rating-section">
            <h3>How would you rate your experience?</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="star-button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star 
                    size={32} 
                    fill={(hoverRating || rating) >= star ? '#f59e0b' : 'transparent'}
                    color={(hoverRating || rating) >= star ? '#f59e0b' : 'rgba(255,255,255,0.3)'}
                  />
                </button>
              ))}
            </div>
            <p className="rating-text">
              {rating === 5 && 'Excellent! 🌟'}
              {rating === 4 && 'Very Good! 😊'}
              {rating === 3 && 'Good 🙂'}
              {rating === 2 && 'Fair 😕'}
              {rating === 1 && 'Needs Improvement 😞'}
              {rating === 0 && 'Click a star to rate'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="category-section">
              <h3>What type of feedback is this?</h3>
              <div className="category-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    className={`category-button ${category === cat.value ? 'active' : ''}`}
                    onClick={() => setCategory(cat.value)}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="feedback">Tell us more</label>
              <textarea
                id="feedback"
                rows="5"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or report an issue..."
                required
              />
            </div>

            <button type="submit" className="submit-button">
              <Send size={20} />
              Submit Feedback
            </button>
          </form>
        </div>
      )}

      <div className="feedback-stats">
        <h3>Community Voice</h3>
        <div className="stats-row">
          <div className="stat-box">
            <strong>4.8</strong>
            <span>Average Rating</span>
          </div>
          <div className="stat-box">
            <strong>10K+</strong>
            <span>Feedback Received</span>
          </div>
          <div className="stat-box">
            <strong>95%</strong>
            <span>Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Feedback;
