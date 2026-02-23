import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';

// পেজ ইম্পোর্ট
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Multimedia from './pages/multimedia'; 
import WorldFilm from './pages/WorldFlim'; 
import Services from './pages/Services'; 
import MyProjects from './pages/MyProjects'; 
import ULMPersonal from './pages/ULMPersonal'; 
import Auth from './pages/Auth'; 

// --- Loading Component ---
const LoadingScreen = () => (
  <div style={styles.loadingContainer}>
    <div className="spinner"></div>
    <p style={{ marginTop: '15px', letterSpacing: '2px', color: '#fff', fontSize: '14px' }}>LOADING...</p>
    <style>
      {`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #333;
          border-top: 4px solid #61dafb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// --- Navbar Component ---
function Navbar({ setIsLoading }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- LOGOUT FUNCTION ---
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
  };

  const handleNavLinkClick = () => {
    setIsLoading(true);
    setIsOpen(false);
  };

  const getActiveStyle = (path, baseStyle) => {
    if (location.pathname === path) {
      return { ...baseStyle, borderBottom: '3px solid white', opacity: 1, transform: 'scale(1.05)' };
    }
    return { ...baseStyle, opacity: 0.8 };
  };

  const getMobileLinkStyle = (bgColor, borderCol) => ({
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '15px 20px',
    borderRadius: '8px',
    background: bgColor,
    borderBottom: `4px solid ${borderCol}`,
    margin: '10px 20px',
    display: 'block',
    transition: '0.3s'
  });

  return (
    <>
      <style>
        {`
          @keyframes colorShift {
            0% { color: #ff3c3c; }
            33% { color: #61dafb; }
            66% { color: #28a745; }
            100% { color: #ff3c3c; }
          }
          .animated-logo { 
            animation: colorShift 5s infinite linear; 
            font-size: clamp(14px, 4vw, 18px);
            font-weight: 800;
            text-transform: uppercase;
          }
          .overlay-blur {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(5px);
            z-index: 1000;
            transition: 0.3s;
          }
        `}
      </style>

      {isMobile && isOpen && <div className="overlay-blur" onClick={() => setIsOpen(false)} />}

      <nav style={styles.navbar}>
        <div style={styles.leftSection}>
          {isMobile && (
            <div style={styles.threeDotMenu} onClick={() => setIsOpen(!isOpen)}>
              <div style={styles.dot}></div>
              <div style={styles.dot}></div>
              <div style={styles.dot}></div>
            </div>
          )}
          <div className="animated-logo">UNFINISHED LOVE MULTIMEDIA</div>
        </div>
        
        <div style={{
          ...styles.navLinks,
          transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(100%)') : 'none',
          position: isMobile ? 'fixed' : 'static',
          flexDirection: isMobile ? 'column' : 'row',
          background: isMobile ? '#0a0a0a' : 'transparent',
          height: isMobile ? '100vh' : 'auto',
          width: isMobile ? '280px' : 'auto',
          top: 0, right: 0,
          paddingTop: isMobile ? '80px' : '0',
          boxShadow: isMobile && isOpen ? '-5px 0 20px rgba(0,0,0,0.8)' : 'none',
          zIndex: 1001,
          display: 'flex',
          overflowY: isMobile ? 'auto' : 'visible'
        }}>
          {isMobile ? (
            <>
              <Link to="/" onClick={handleNavLinkClick} style={getMobileLinkStyle('#333', '#111')}>Home</Link>
              <Link to="/about" onClick={handleNavLinkClick} style={getMobileLinkStyle('#6f42c1', '#4b2d86')}>About</Link>
              <Link to="/services" onClick={handleNavLinkClick} style={getMobileLinkStyle('#007bff', '#0056b3')}>Services</Link>
              <Link to="/projects" onClick={handleNavLinkClick} style={getMobileLinkStyle('#28a745', '#1e7e34')}>Projects</Link>
              <Link to="/multimedia" onClick={handleNavLinkClick} style={getMobileLinkStyle('#fd7e14', '#a04e0a')}>Multimedia</Link>
              <Link to="/world-film" onClick={handleNavLinkClick} style={getMobileLinkStyle('#ff3c3c', '#8b0000')}>World Film</Link>
              <Link to="/contact" onClick={handleNavLinkClick} style={getMobileLinkStyle('#17a2b8', '#116a7b')}>Contact</Link>
              <button onClick={handleLogout} style={{...getMobileLinkStyle('#ff4b2b', '#9e2a2a'), border: 'none', textAlign: 'left', cursor: 'pointer', width: 'calc(100% - 40px)'}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/" onClick={handleNavLinkClick} style={getActiveStyle('/', styles.homeBtn)}>Home</Link>
              <Link to="/about" onClick={handleNavLinkClick} style={getActiveStyle('/about', styles.aboutBtn)}>About</Link>
              <Link to="/services" onClick={handleNavLinkClick} style={getActiveStyle('/services', styles.servicesBtn)}>Services</Link>
              <Link to="/projects" onClick={handleNavLinkClick} style={getActiveStyle('/projects', styles.projectsBtn)}>My Projects</Link>
              <Link to="/multimedia" onClick={handleNavLinkClick} style={getActiveStyle('/multimedia', styles.multimediaBtn)}>Multimedia</Link>
              <Link to="/world-film" onClick={handleNavLinkClick} style={getActiveStyle('/world-film', styles.worldFilmBtn)}>World Film</Link>
              <Link to="/contact" onClick={handleNavLinkClick} style={getActiveStyle('/contact', styles.contactBtn)}>Contact</Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

// --- App Content (Protected Area) ---
function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location]);

  const getPageTheme = () => {
    switch (location.pathname) {
      case '/': return { bg: '#1a1a2e', card: '#16213e', border: '#61dafb' };
      case '/personal': return { bg: '#250025', card: '#3d003d', border: '#e83e8c' };
      case '/about': return { bg: '#2d142c', card: '#510a32', border: '#c72c41' };
      case '/services': return { bg: '#0f3443', card: '#112d32', border: '#24fe41' };
      case '/projects': return { bg: '#1d1d1d', card: '#333333', border: '#28a745' };
      case '/multimedia': return { bg: '#432371', card: '#2e1a47', border: '#faae7b' };
      case '/world-film': return { bg: '#300000', card: '#600000', border: '#ff3c3c' };
      case '/contact': return { bg: '#00416a', card: '#002a45', border: '#17a2b8' };
      default: return { bg: '#0a0a0a', card: '#161616', border: '#333' };
    }
  };

  const theme = getPageTheme();

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', color: 'white', transition: 'background-color 0.8s ease' }}>
      <Navbar setIsLoading={setIsLoading} />
      
      {isLoading && <LoadingScreen />}

      <main style={{ 
        padding: '15px', 
        opacity: isLoading ? 0 : 1, 
        transition: 'all 0.4s ease',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          background: theme.card,
          width: '100%',
          maxWidth: '1100px',
          padding: '25px',
          borderRadius: '12px',
          borderLeft: `6px solid ${theme.border}`,
          boxShadow: '0px 10px 40px rgba(0,0,0,0.6)',
          marginTop: '10px',
          boxSizing: 'border-box'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal" element={<ULMPersonal />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<MyProjects />} />
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/world-film" element={<WorldFilm />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

// --- Main App Entry (Auth Handling) ---
export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // বর্তমান সেশন চেক
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // সেশন পরিবর্তন শুনুন (Login/Logout/Register)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      {!session ? <Auth /> : <AppContent />}
    </Router>
  );
}

// --- Styles ---
const baseLinkStyle = { 
  color: 'white', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold', 
  padding: '8px 10px', borderRadius: '6px', transition: 'all 0.3s ease'
};

const styles = {
  navbar: { 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    padding: '10px 20px', background: '#0a0a0a', borderBottom: '2px solid #222', 
    position: 'sticky', top: 0, zIndex: 1100, height: '65px'
  },
  leftSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  threeDotMenu: { display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer', zIndex: 1200 },
  dot: { width: '5px', height: '5px', backgroundColor: '#61dafb', borderRadius: '50%' },
  navLinks: { gap: '5px', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' },
  loadingContainer: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  homeBtn: { ...baseLinkStyle, background: '#333' },
  aboutBtn: { ...baseLinkStyle, background: '#6f42c1' },
  servicesBtn: { ...baseLinkStyle, background: '#007bff' },
  projectsBtn: { ...baseLinkStyle, background: '#28a745' },
  multimediaBtn: { ...baseLinkStyle, background: '#fd7e14' },
  worldFilmBtn: { ...baseLinkStyle, background: '#ff3c3c' },
  contactBtn: { ...baseLinkStyle, background: '#17a2b8' }, 
  logoutBtn: { 
    ...baseLinkStyle, 
    background: '#ff4b2b', 
    border: 'none', 
    cursor: 'pointer', 
    marginLeft: '5px' 
  },
};