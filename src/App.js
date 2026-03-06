import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, TorusKnot } from '@react-three/drei';
import { 
  Phone, MapPin, Shield, AlertTriangle, Siren, MessageCircle,
  Video, Mic, Users, Info, Activity, Zap, Volume2, Crosshair,
  Eye, Lock, Cpu, Heart, Home as HomeIcon, User, Mail, MessageSquare
} from 'lucide-react';
import { supabase } from './supabaseClient';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import Feedback from './components/Feedback';

function Shield3D() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef}>
        <mesh>
          <cylinderGeometry args={[1.5, 1.2, 2.5, 6]} />
          <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.3]}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} />
        </mesh>
        <TorusKnot args={[2.2, 0.3, 100, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} transparent opacity={0.5} />
        </TorusKnot>
      </group>
    </Float>
  );
}

function Home({ emergencyMode, setEmergencyMode, location, batteryLevel, isRecording, setIsRecording, user }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeFeature, setActiveFeature] = useState(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const emergencyFeatures = [
    { icon: <Phone size={28} />, title: "Emergency SOS", desc: "Call 911 instantly", action: () => window.location.href = "tel:911", color: "#ef4444", type: "danger" },
    { icon: <MapPin size={28} />, title: "Live Location", desc: "Share GPS coordinates", action: () => alert(`📍 Location shared!\nLat: ${location?.lat || "Loading..."}\nLng: ${location?.lng || "Loading..."}`), color: "#3b82f6", type: "info" },
    { icon: <Siren size={28} />, title: "Panic Alarm", desc: "Activate loud siren", action: () => setEmergencyMode(true), color: "#f59e0b", type: "warning" },
    { icon: <MessageCircle size={28} />, title: "Alert Guardians", desc: "Notify trusted contacts", action: () => alert("📢 Guardians notified!"), color: "#10b981", type: "success" },
    { icon: <Video size={28} />, title: "Record Video", desc: "Capture evidence", action: () => setIsRecording(!isRecording), color: "#8b5cf6", type: "info", active: isRecording },
    { icon: <Mic size={28} />, title: "Voice Record", desc: "Record audio evidence", action: () => alert("🎤 Recording started"), color: "#ec4899", type: "info" }
  ];

  const safetyTools = [
    { icon: <Crosshair size={24} />, title: "Safe Route", desc: "AI-powered safe path finder", gradient: "linear-gradient(135deg, #60a5fa, #a855f7)" },
    { icon: <Eye size={24} />, title: "Crowd Detection", desc: "Real-time safety analysis", gradient: "linear-gradient(135deg, #4ade80, #3b82f6)" },
    { icon: <Volume2 size={24} />, title: "Fake Call", desc: "Simulate incoming call", gradient: "linear-gradient(135deg, #fb923c, #ef4444)" },
    { icon: <Lock size={24} />, title: "Safe Words", desc: "Emergency code system", gradient: "linear-gradient(135deg, #f472b6, #a855f7)" },
    { icon: <Activity size={24} />, title: "Health Monitor", desc: "Track vitals in emergency", gradient: "linear-gradient(135deg, #f87171, #ec4899)" },
    { icon: <Cpu size={24} />, title: "AI Guardian", desc: "24/7 AI monitoring", gradient: "linear-gradient(135deg, #c084fc, #6366f1)" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-3d">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#60a5fa" />
            <Shield3D />
            <Stars radius={60} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>
        </div>
        
        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="time-widget" variants={itemVariants}>
            <div className="time-display">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="date-display">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </motion.div>
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="gradient-text">Raksha</span>
          </motion.h1>
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Professional Safety & Security Platform
          </motion.p>
          <motion.div className="hero-cta" variants={itemVariants}>
            {user ? (
              <Link to="/dashboard" className="hero-button primary">
                <Shield size={20} />
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/login" className="hero-button primary">
                <Shield size={20} />
                Get Started
              </Link>
            )}
            <Link to="/about" className="hero-button secondary">
              <Info size={20} />
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Emergency Actions */}
      <section className="section">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <AlertTriangle size={32} className="section-icon danger" />
          <h2>Emergency Actions</h2>
          <p>One-tap access to life-saving features</p>
        </motion.div>

        <motion.div className="emergency-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {emergencyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className={`emergency-card ${feature.active ? 'active' : ''} ${feature.type}`}
              onClick={feature.action}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setActiveFeature(index)}
              onHoverEnd={() => setActiveFeature(null)}
            >
              <motion.div 
                className="emergency-icon" 
                style={{ background: feature.color }}
                animate={activeFeature === index ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              {activeFeature === index && (
                <motion.div 
                  className="feature-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Safety Tools */}
      <section className="section tools-section">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Shield size={32} className="section-icon" />
          <h2>Safety Tools</h2>
          <p>Advanced AI-powered protection features</p>
        </motion.div>

        <motion.div className="tools-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {safetyTools.map((tool, index) => (
            <motion.div
              key={index}
              className="tool-card"
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="tool-icon" style={{ background: tool.gradient }}>
                {tool.icon}
              </div>
              <h4>{tool.title}</h4>
              <p>{tool.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Community Section */}
      <section className="section">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Users size={32} className="section-icon" />
          <h2>Community Support</h2>
          <p>Connect with trusted guardians and resources</p>
        </motion.div>

        <motion.div className="community-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="community-card">
            <div className="community-icon"><Users size={28} /></div>
            <h4>Trusted Guardians</h4>
            <p>Add family and friends who can be notified instantly in emergencies</p>
            <button className="btn-primary">Manage Contacts</button>
          </div>
          <div className="community-card">
            <div className="community-icon"><Info size={28} /></div>
            <h4>Safety Resources</h4>
            <p>Access local helplines, shelters, and support organizations</p>
            <button className="btn-primary">View Resources</button>
          </div>
          <div className="community-card">
            <div className="community-icon"><MessageCircle size={28} /></div>
            <h4>Anonymous Chat</h4>
            <p>Connect with trained volunteers for immediate emotional support</p>
            <button className="btn-primary">Start Chat</button>
          </div>
        </motion.div>
      </section>
    </>
  );
}

function App() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [location, setLocation] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isRecording, setIsRecording] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => setLocation({
          lat: position.coords.latitude.toFixed(4),
          lng: position.coords.longitude.toFixed(4)
        }),
        (error) => console.log("Location error:", error)
      );
    }
  }, []);

  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }
  }, []);

  // Fetch user profile data
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Profile fetch error:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return null;
    }
  };

  const handleLogin = async (userData) => {
    setUser(userData);
    const profile = await fetchUserProfile(userData.id);
    setUserProfile(profile);
  };

  const handleLogout = () => {
    setUser(null);
    setUserProfile(null);
  };

  const quickStats = [
    { label: "Battery", value: batteryLevel + "%", icon: <Zap size={14} />, color: batteryLevel > 20 ? "#10b981" : "#ef4444" },
    { label: "Network", value: "Online", icon: <Activity size={14} />, color: "#10b981" },
    { label: "Location", value: location ? "Active" : "Loading", icon: <MapPin size={14} />, color: location ? "#3b82f6" : "#f59e0b" },
    { label: "Status", value: "Protected", icon: <Shield size={14} />, color: "#6366f1" }
  ];

  return (
    <Router>
      <div className={`app ${emergencyMode ? 'emergency-mode' : ''}`}>
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/" className="nav-logo-link">
              <Shield size={32} className="nav-logo" />
              <span className="nav-title">Raksha</span>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link"><HomeIcon size={18} /> Home</Link>
            {user && (
              <Link to="/dashboard" className="nav-link"><Shield size={18} /> Dashboard</Link>
            )}
            <Link to="/about" className="nav-link"><User size={18} /> About</Link>
            <Link to="/contact" className="nav-link"><Mail size={18} /> Contact</Link>
            <Link to="/feedback" className="nav-link"><MessageSquare size={18} /> Feedback</Link>
            {user ? (
              <>
                <span className="nav-link user-welcome">
                  Welcome, {userProfile?.name || 'User'}
                </span>
                <button onClick={handleLogout} className="nav-link logout">Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-link login">Login</Link>
            )}
          </div>
          <div className="nav-stats">
            {quickStats.map((stat, index) => (
              <div key={index} className="stat-badge">
                <span style={{ color: stat.color }}>{stat.icon}</span>
                <span>{stat.value}</span>
              </div>
            ))}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home emergencyMode={emergencyMode} setEmergencyMode={setEmergencyMode} location={location} batteryLevel={batteryLevel} isRecording={isRecording} setIsRecording={setIsRecording} user={user} />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} userProfile={userProfile} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-sections">
              <div className="footer-brand-section">
                <div className="footer-brand">
                  <Shield size={24} />
                  <span>Raksha</span>
                </div>
                <p>Professional security platform providing comprehensive safety solutions for everyone.</p>
                <div className="footer-social">
                  <a href="#" className="social-link"><Mail size={18} /></a>
                  <a href="#" className="social-link"><MessageSquare size={18} /></a>
                  <a href="#" className="social-link"><Phone size={18} /></a>
                </div>
              </div>
              
              <div className="footer-links-section">
                <h4>Quick Links</h4>
                <div className="footer-links">
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              </div>
              
              <div className="footer-services-section">
                <h4>Services</h4>
                <div className="footer-links">
                  <Link to="/emergency">Emergency SOS</Link>
                  <Link to="/location">Location Sharing</Link>
                  <Link to="/guardians">Guardian Network</Link>
                  <Link to="/tools">Safety Tools</Link>
                </div>
              </div>
              
              <div className="footer-legal-section">
                <h4>Legal</h4>
                <div className="footer-links">
                  <Link to="/privacy">Privacy Policy</Link>
                  <Link to="/terms">Terms of Service</Link>
                  <Link to="/cookies">Cookie Policy</Link>
                  <Link to="/compliance">Compliance</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-disclaimer">
              <AlertTriangle size={14} />
              <span>In immediate danger? Call emergency services first</span>
            </div>
            <div className="footer-copyright">
              <p>&copy; 2024 Raksha. All rights reserved. | Professional Security Platform</p>
            </div>
          </div>
        </footer>

        {/* Emergency Overlay */}
        <AnimatePresence>
          {emergencyMode && (
            <motion.div
              className="emergency-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="emergency-content">
                <motion.div className="pulse-ring" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.div className="siren-icon" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
                  <Siren size={80} />
                </motion.div>
                <h2>EMERGENCY MODE</h2>
                <p>Your location and details have been sent to guardians</p>
                <div className="emergency-actions">
                  <button className="btn-emergency-call" onClick={() => window.location.href = "tel:911"}>
                    <Phone size={20} /> Call 911
                  </button>
                  <button className="btn-cancel" onClick={() => setEmergencyMode(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
