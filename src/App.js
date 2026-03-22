import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
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
import Profile from './pages/Profile'; // প্রোফাইল পেজ ইম্পোর্ট

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
function Navbar({ setIsLoading, session }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dbUser, setDbUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // ডাটাবেস থেকে ইউজারের আসল প্রোফাইল ডাটা নিয়ে আসা
  useEffect(() => {
    const getProfile = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', session.user.id)
          .single();
        
        if (data) setDbUser(data);
      }
    };
    getProfile();

    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [session]);

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

  // --- ডাইনামিক প্রোফাইল সেকশন ---
  const UserProfile = () => (
    <Link to="/profile" onClick={handleNavLinkClick} style={{ textDecoration: 'none' }}>
      <div style={styles.profileWrapper} title="View Profile">
        <div style={styles.profileInfo}>
          <span style={styles.userName}>{dbUser?.full_name || session?.user?.user_metadata?.full_name || "User"}</span>
          <span style={styles.userStatus}>Online</span>
        </div>
        <div style={styles.avatarContainer}>
          <img 
            src={dbUser?.avatar_url || session?.user?.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=" + session?.user?.email} 
            alt="Profile" 
            style={styles.profilePic} 
          />
          <div style={styles.onlineBadge}></div>
        </div>
      </div>
    </Link>
  );

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
          alignItems: isMobile ? 'stretch' : 'center',
          overflowY: isMobile ? 'auto' : 'visible'
        }}>
          
          {isMobile && session && (
            <div style={{ padding: '0 20px 20px 20px', borderBottom: '1px solid #222', marginBottom: '10px' }}>
               <UserProfile />
            </div>
          )}

          <Link to="/" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#333', '#111') : getActiveStyle('/', styles.homeBtn)}>Home</Link>
          <Link to="/about" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#6f42c1', '#4b2d86') : getActiveStyle('/about', styles.aboutBtn)}>About</Link>
          <Link to="/services" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#007bff', '#0056b3') : getActiveStyle('/services', styles.servicesBtn)}>Services</Link>
          <Link to="/projects" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#28a745', '#1e7e34') : getActiveStyle('/projects', styles.projectsBtn)}>My Projects</Link>
          <Link to="/multimedia" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#fd7e14', '#a04e0a') : getActiveStyle('/multimedia', styles.multimediaBtn)}>Multimedia</Link>
          <Link to="/world-film" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#ff3c3c', '#8b0000') : getActiveStyle('/world-film', styles.worldFilmBtn)}>World Film</Link>
          <Link to="/contact" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#17a2b8', '#116a7b') : getActiveStyle('/contact', styles.contactBtn)}>Contact</Link>
          
          {!isMobile && session && <UserProfile />}

          <button onClick={handleLogout} style={isMobile ? getMobileLinkStyle('#ff4b2b', '#9e2a2a') : styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

// --- App Content ---
function AppContent({ session }) {
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
      case '/profile': return { bg: '#121212', card: '#1e1e1e', border: '#ffc107' };
      case '/about': return { bg: '#2d142c', card: '#510a32', border: '#c72c41' };
      case '/services': return { bg: '#0f3443', card: '#112d32', border: '#24fe41' };
      case '/projects': return { bg: '#1d1d1d', card: '#333333', border: '#28a745' };
      default: return { bg: '#0a0a0a', card: '#161616', border: '#333' };
    }
  };

  const theme = getPageTheme();

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', color: 'white', transition: 'background-color 0.8s ease' }}>
      <Navbar setIsLoading={setIsLoading} session={session} />
      {isLoading && <LoadingScreen />}
      <main style={{ padding: '15px', opacity: isLoading ? 0 : 1, transition: 'all 0.4s ease', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: theme.card, width: '100%', maxWidth: '1100px', padding: '25px', borderRadius: '12px', borderLeft: `6px solid ${theme.border}`, boxShadow: '0px 10px 40px rgba(0,0,0,0.6)', marginTop: '10px', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile session={session} />} />
            <Route path="/personal" element={<ULMPersonal />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<MyProjects />} />
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/world-film" element={<WorldFilm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      {!session ? <Auth /> : <AppContent session={session} />}
    </Router>
  );
}

// Styles remain the same as your provided code...
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
  navLinks: { gap: '8px', display: 'flex', alignItems: 'center' },
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
    background: 'linear-gradient(45deg, #ff4b2b, #ff3c3c)', 
    border: 'none', cursor: 'pointer', marginLeft: '10px',
    boxShadow: '0 4px 12px rgba(255, 75, 43, 0.2)'
  },

  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '4px 15px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginRight: '5px',
    marginLeft: '10px',
    cursor: 'pointer'
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    lineHeight: '1.1'
  },
  userName: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '0.3px'
  },
  userStatus: {
    fontSize: '9px',
    color: '#24fe41',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  avatarContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  profilePic: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #61dafb',
    objectFit: 'cover'
  },
  onlineBadge: {
    position: 'absolute',
    bottom: '1px',
    right: '0px',
    width: '9px',
    height: '9px',
    backgroundColor: '#24fe41',
    borderRadius: '50%',
    border: '1px solid #0a0a0a'
  }
};