import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, MapPin, Phone, Users, MessageCircle, Activity, 
  Battery, Wifi, Bell, Settings, AlertTriangle, Heart,
  Clock, Navigation, Eye, Lock, Camera, Mic, Volume2,
  Zap, User, Home, ChevronRight, Star, TrendingUp,
  Calendar, Mail, Globe, ShieldCheck, Radio, HelpCircle
} from 'lucide-react';
import './Dashboard.css';

function Dashboard({ user, userProfile, onLogout }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.2090 });
  const [notifications, setNotifications] = useState(3);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({
          lat: position.coords.latitude.toFixed(4),
          lng: position.coords.longitude.toFixed(4)
        })
      );
    }
  }, []);

  const emergencyActions = [
    { 
      id: 'sos',
      icon: <Phone size={32} />, 
      title: "Emergency SOS", 
      desc: "Call emergency services immediately",
      color: "#ef4444",
      action: () => window.location.href = "tel:911"
    },
    { 
      id: 'location',
      icon: <MapPin size={32} />, 
      title: "Share Location", 
      desc: "Send live location to contacts",
      color: "#3b82f6",
      action: () => alert('Location shared with emergency contacts!')
    },
    { 
      id: 'siren',
      icon: <Volume2 size={32} />, 
      title: "Panic Siren", 
      desc: "Activate loud alarm",
      color: "#f59e0b",
      action: () => alert('Panic siren activated!')
    },
    { 
      id: 'record',
      icon: <Camera size={32} />, 
      title: "Record Evidence", 
      desc: "Start video recording",
      color: "#8b5cf6",
      action: () => alert('Video recording started!')
    }
  ];

  const safetyTools = [
    { 
      icon: <Navigation size={24} />, 
      title: "Safe Route", 
      desc: "Find safest path to destination",
      status: "active",
      progress: 85
    },
    { 
      icon: <Eye size={24} />, 
      title: "Crowd Detect", 
      desc: "Analyze crowd safety levels",
      status: "monitoring",
      progress: 100
    },
    { 
      icon: <Lock size={24} />, 
      title: "Safe Words", 
      desc: "Emergency code phrases",
      status: "ready",
      progress: 100
    },
    { 
      icon: <Radio size={24} />, 
      title: "Live Guardian", 
      desc: "24/7 AI monitoring",
      status: "active",
      progress: 92
    },
    { 
      icon: <Heart size={24} />, 
      title: "Health Monitor", 
      desc: "Track vital signs",
      status: "ready",
      progress: 78
    },
    { 
      icon: <ShieldCheck size={24} />, 
      title: "Digital Shield", 
      desc: "Privacy protection",
      status: "active",
      progress: 100
    }
  ];

  const quickStats = [
    { label: "Safety Score", value: "94%", icon: <Shield size={16} />, color: "#10b981", trend: "+2%" },
    { label: "Active Guardians", value: "12", icon: <Users size={16} />, color: "#3b82f6", trend: "+3" },
    { label: "Safe Zones", value: "8", icon: <MapPin size={16} />, color: "#8b5cf6", trend: "+1" },
    { label: "Alerts Today", value: "0", icon: <Bell size={16} />, color: "#f59e0b", trend: "-2" }
  ];

  const recentActivity = [
    { icon: <MapPin size={16} />, text: "Location shared with family", time: "2 min ago", color: "#3b82f6" },
    { icon: <ShieldCheck size={16} />, text: "Safety route completed", time: "1 hour ago", color: "#10b981" },
    { icon: <Users size={16} />, text: "Guardian circle updated", time: "3 hours ago", color: "#8b5cf6" },
    { icon: <Heart size={16} />, text: "Health check normal", time: "6 hours ago", color: "#ef4444" }
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="user-info">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div>
              <h1>Welcome back, {userProfile?.name || 'User'}!</h1>
              <p>Your safety is our priority</p>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <div className="time-display">
            <Clock size={16} />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="date-display">
            <Calendar size={16} />
            <span>{currentTime.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="header-right">
          <div className="status-indicators">
            <div className="indicator">
              <Battery size={16} />
              <span>{batteryLevel}%</span>
            </div>
            <div className="indicator">
              <Wifi size={16} />
              <span>Online</span>
            </div>
            <div className="indicator">
              <MapPin size={16} />
              <span>Active</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={20} />
              {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            </button>
            <button className="settings-btn">
              <Settings size={20} />
            </button>
            <button onClick={onLogout} className="logout-btn">
              <Shield size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Quick Stats */}
        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-trend" style={{ color: stat.color }}>
                  {stat.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Actions */}
        <div className="emergency-section">
          <h2>Emergency Actions</h2>
          <div className="emergency-grid">
            {emergencyActions.map((action) => (
              <motion.button
                key={action.id}
                className="emergency-card"
                style={{ '--card-color': action.color }}
                onClick={action.action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="emergency-icon" style={{ background: action.color }}>
                  {action.icon}
                </div>
                <h3>{action.title}</h3>
                <p>{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="main-grid">
          {/* Safety Tools */}
          <div className="safety-tools">
            <h2>Safety Tools</h2>
            <div className="tools-list">
              {safetyTools.map((tool, index) => (
                <motion.div
                  key={index}
                  className="tool-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveFeature(tool.title)}
                >
                  <div className="tool-icon">{tool.icon}</div>
                  <div className="tool-content">
                    <h4>{tool.title}</h4>
                    <p>{tool.desc}</p>
                    <div className="tool-status">
                      <span className={`status-dot ${tool.status}`}></span>
                      <span>{tool.status}</span>
                    </div>
                  </div>
                  <div className="tool-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${tool.progress}%` }}
                      ></div>
                    </div>
                    <span>{tool.progress}%</span>
                  </div>
                  <ChevronRight size={20} className="tool-arrow" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="activity-feed">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="activity-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="activity-icon" style={{ color: activity.color }}>
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <p>{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Guardian Circle */}
        <div className="guardian-section">
          <h2>Guardian Circle</h2>
          <div className="guardian-grid">
            <div className="guardian-card primary">
              <div className="guardian-avatar">
                <Users size={24} />
              </div>
              <div className="guardian-info">
                <h4>Family Circle</h4>
                <p>5 members • Always active</p>
              </div>
              <div className="guardian-status online">
                <span>Online</span>
              </div>
            </div>
            
            <div className="guardian-card">
              <div className="guardian-avatar">
                <Shield size={24} />
              </div>
              <div className="guardian-info">
                <h4>Emergency Contacts</h4>
                <p>3 contacts • Ready</p>
              </div>
              <div className="guardian-status ready">
                <span>Ready</span>
              </div>
            </div>
            
            <div className="guardian-card">
              <div className="guardian-avatar">
                <HelpCircle size={24} />
              </div>
              <div className="guardian-info">
                <h4>Support Team</h4>
                <p>24/7 Available</p>
              </div>
              <div className="guardian-status active">
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div
            className="feature-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveFeature(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{activeFeature}</h3>
              <p>Feature details and settings would appear here.</p>
              <button onClick={() => setActiveFeature(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
