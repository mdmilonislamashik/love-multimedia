import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// পেজ ইম্পোর্ট
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Multimedia from './multimedia'; 
import WorldFilm from './WorldFlim'; 
import Services from './Services'; 
import MyProjects from './MyProjects'; 

// --- Loading Component ---
const LoadingScreen = () => (
  <div style={styles.loadingContainer}>
    <div className="spinner"></div>
    <p style={{ marginTop: '15px', letterSpacing: '2px', color: '#fff' }}>LOADING...</p>
    <style>
      {`
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #333;
          border-top: 5px solid #61dafb;
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

function Navbar({ setIsLoading }) {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const handleNavLinkClick = () => {
    setIsLoading(true);
    setShowMenu(false);
  };

  const getActiveStyle = (path, baseStyle) => {
    if (location.pathname === path) {
      return { ...baseStyle, transform: 'translateY(-3px)', boxShadow: '0px 10px 20px rgba(255,255,255,0.2)', borderBottom: '1px solid white', opacity: 1 };
    }
    return { ...baseStyle, opacity: 0.8 };
  };

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
          .animated-logo { animation: colorShift 5s infinite linear; }
        `}
      </style>

      <nav style={styles.navbar}>
        <div style={styles.leftSection}>
          <div style={styles.threeDot} onClick={() => setShowMenu(!showMenu)}>
            ⋮
            {showMenu && (
              <div style={styles.dropdown}>
                {['/', '/about', '/services', '/projects', '/multimedia', '/world-film', '/contact'].map((path) => (
                  <Link key={path} to={path} onClick={handleNavLinkClick} style={styles.dropItem}>
                    {path === '/' ? 'Home' : path.replace('/', '').replace('-', ' ')}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="animated-logo" style={styles.logo3d}>Unfinished Love Multimedia</div>
        </div>
        
        <div style={styles.navLinks}>
          <Link to="/" onClick={handleNavLinkClick} style={getActiveStyle('/', styles.homeBtn)}>Home</Link>
          <Link to="/about" onClick={handleNavLinkClick} style={getActiveStyle('/about', styles.aboutBtn)}>About</Link>
          <Link to="/services" onClick={handleNavLinkClick} style={getActiveStyle('/services', styles.servicesBtn)}>Services</Link>
          <Link to="/projects" onClick={handleNavLinkClick} style={getActiveStyle('/projects', styles.projectsBtn)}>My Projects</Link>
          <Link to="/multimedia" onClick={handleNavLinkClick} style={getActiveStyle('/multimedia', styles.multimediaBtn)}>Multimedia</Link>
          <Link to="/world-film" onClick={handleNavLinkClick} style={getActiveStyle('/world-film', styles.worldFilmBtn)}>World Film</Link>
          <Link to="/contact" onClick={handleNavLinkClick} style={getActiveStyle('/contact', styles.contactBtn)}>Contact</Link>
        </div>
      </nav>
    </>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  // বর্তমান পেজ অনুযায়ী ব্যাকগ্রাউন্ড এবং ৩ডি কার্ড স্টাইল নির্ধারণ
  const getPageTheme = () => {
    switch (location.pathname) {
      case '/': return { bg: '#1a1a2e', card: '#16213e', border: '#61dafb' };
      case '/about': return { bg: '#2d142c', card: '#510a32', border: '#c72c41' };
      case '/services': return { bg: '#0f3443', card: '#34e89e', border: '#24fe41' };
      case '/projects': return { bg: '#1d1d1d', card: '#333333', border: '#28a745' };
      case '/multimedia': return { bg: '#432371', card: '#714674', border: '#faae7b' };
      case '/world-film': return { bg: '#600000', card: '#900c3f', border: '#ff3c3c' };
      case '/contact': return { bg: '#00416a', card: '#12b3eb', border: '#17a2b8' };
      default: return { bg: '#0a0a0a', card: '#161616', border: '#333' };
    }
  };

  const theme = getPageTheme();

  return (
    <div style={{ 
      backgroundColor: theme.bg, 
      minHeight: '100vh', 
      color: 'white', 
      transition: 'background-color 0.8s ease' 
    }}>
      <Navbar setIsLoading={setIsLoading} />
      
      {isLoading && <LoadingScreen />}

      <div style={{ 
        padding: '40px 20px', 
        opacity: isLoading ? 0 : 1, 
        transition: 'all 0.5s ease',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* 3D Page Wrapper Card */}
        <div style={{
          background: theme.card,
          width: '90%',
          maxWidth: '1200px',
          padding: '30px',
          borderRadius: '20px',
          borderLeft: `5px solid ${theme.border}`,
          boxShadow: '20px 20px 60px #050505, -5px -5px 20px rgba(255,255,255,0.05)',
          transform: 'perspective(1000px) rotateX(2deg)',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<MyProjects />} />
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/world-film" element={<WorldFilm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// --- Styles ---
const baseLinkStyle = { 
  color: 'white', 
  textDecoration: 'none', 
  fontSize: '13px', 
  fontWeight: 'bold', 
  padding: '8px 14px', 
  borderRadius: '8px', 
  transition: 'all 0.3s ease', 
  display: 'inline-block',
  boxShadow: '5px 5px 10px rgba(0,0,0,0.3)'
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: 'rgba(22, 22, 22, 0.95)', borderBottom: '2px solid #333', boxShadow: '0px 4px 15px rgba(0,0,0,0.7)', position: 'sticky', top: 0, zIndex: 100 },
  leftSection: { display: 'flex', alignItems: 'center', gap: '10px' },
  threeDot: { fontSize: '32px', color: 'white', cursor: 'pointer', position: 'relative', userSelect: 'none', marginRight: '10px' },
  dropdown: { position: 'absolute', top: '45px', left: '0', background: '#1a1a1a', border: '1px solid #444', borderRadius: '8px', width: '180px', boxShadow: '0px 10px 20px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', zIndex: 1000 },
  dropItem: { padding: '12px 16px', color: 'white', textDecoration: 'none', fontSize: '14px', borderBottom: '1px solid #333', transition: 'background 0.2s', textTransform: 'capitalize' },
  logo3d: { fontWeight: '900', fontSize: '28px', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'Impact', sans-serif", textShadow: '2px 2px 0px #000, 4px 4px 8px rgba(0,0,0,0.5)' },
  navLinks: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  
  loadingContainer: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.9)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },

  homeBtn: { ...baseLinkStyle, background: '#444', borderBottom: '4px solid #222' },
  aboutBtn: { ...baseLinkStyle, background: '#6f42c1', borderBottom: '4px solid #4b2c85' },
  servicesBtn: { ...baseLinkStyle, background: '#007bff', borderBottom: '4px solid #0056b3' },
  projectsBtn: { ...baseLinkStyle, background: '#28a745', borderBottom: '4px solid #1e7e34' },
  multimediaBtn: { ...baseLinkStyle, background: '#fd7e14', borderBottom: '4px solid #ba5d0f' },
  worldFilmBtn: { ...baseLinkStyle, background: '#ff3c3c', borderBottom: '4px solid #8b0000' },
  contactBtn: { ...baseLinkStyle, background: '#17a2b8', borderBottom: '4px solid #117a8b' },
};