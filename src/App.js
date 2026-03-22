import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import Profile from './pages/Profile';

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
function Navbar({ setIsLoading, session, dbUser }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error.message);
    setShowUserDropdown(false);
  };

  const handleNavLinkClick = () => {
    setIsLoading(true);
    setIsOpen(false);
    setShowUserDropdown(false);
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
    fontSize: '15px',
    fontWeight: 'bold',
    padding: '12px 20px',
    borderRadius: '8px',
    background: bgColor,
    borderBottom: `4px solid ${borderCol}`,
    margin: '8px 20px',
    display: 'block',
    transition: '0.3s'
  });

  // --- User Profile with Dropdown ---
  const UserProfileDropdown = () => {
    const userAvatar = dbUser?.avatar_url || session?.user?.user_metadata?.avatar_url || "https://ui-avatars.com/api/?background=61dafb&color=fff&name=" + session?.user?.email;
    const userName = dbUser?.full_name || session?.user?.user_metadata?.full_name || "User";
    const userEmail = session?.user?.email;

    return (
      <div style={styles.profileWrapper} ref={dropdownRef}>
        <div style={styles.avatarContainer} onClick={() => setShowUserDropdown(!showUserDropdown)}>
          <img src={userAvatar} alt="Profile" style={styles.profilePic} />
          <div style={styles.onlineBadge}></div>
        </div>

        {showUserDropdown && (
          <div style={styles.dropdownMenu}>
            <div style={styles.dropdownHeader}>
              <img src={userAvatar} alt="Profile Large" style={styles.largeAvatar} />
              <div style={styles.headerText}>
                <span style={styles.dropdownUserName}>{userName}</span>
                <span style={styles.dropdownUserEmail}>{userEmail}</span>
              </div>
            </div>
            <div style={styles.dropdownDivider}></div>
            <Link to="/profile" onClick={handleNavLinkClick} className="dropdown-item" style={styles.dropdownItem}>
              <span style={{marginRight: '10px'}}>⚙️</span> Edit Profile
            </Link>
            <button onClick={handleLogout} className="dropdown-item" style={{...styles.dropdownItem, ...styles.dropdownLogout}}>
              <span style={{marginRight: '10px'}}>🚪</span> Logout
            </button>
          </div>
        )}
      </div>
    );
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
          .animated-logo { 
            animation: colorShift 5s infinite linear; 
            font-size: clamp(14px, 4vw, 18px);
            font-weight: 800;
            text-transform: uppercase;
            white-space: nowrap;
          }
          .overlay-blur {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(5px);
            z-index: 1000;
          }
          .dropdown-item:hover {
            background-color: rgba(255, 255, 255, 0.1) !important;
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
          paddingTop: isMobile ? '70px' : '0',
          boxShadow: isMobile && isOpen ? '-5px 0 20px rgba(0,0,0,0.8)' : 'none',
          zIndex: 1001,
          display: 'flex',
          alignItems: isMobile ? 'stretch' : 'center',
          overflowY: isMobile ? 'auto' : 'visible'
        }}>

          {isMobile && session && (
            <div style={{ padding: '20px', borderBottom: '1px solid #222', marginBottom: '10px', textAlign: 'center' }}>
               <img src={dbUser?.avatar_url || session?.user?.user_metadata?.avatar_url} style={{width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #61dafb', marginBottom: '10px'}} alt="user" />
               <div style={{fontWeight: 'bold', fontSize: '14px'}}>{dbUser?.full_name || session?.user?.user_metadata?.full_name}</div>
               <div style={{color: '#888', fontSize: '11px', marginBottom: '15px'}}>{session?.user?.email}</div>
               <Link to="/profile" onClick={handleNavLinkClick} style={getMobileLinkStyle('#ffc107', '#ba8b00')}>Edit Profile</Link>
            </div>
          )}

          <Link to="/" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#333', '#111') : getActiveStyle('/', styles.homeBtn)}>Home</Link>
          <Link to="/about" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#6f42c1', '#4b2d86') : getActiveStyle('/about', styles.aboutBtn)}>About</Link>
          <Link to="/services" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#007bff', '#0056b3') : getActiveStyle('/services', styles.servicesBtn)}>Services</Link>
          <Link to="/projects" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#28a745', '#1e7e34') : getActiveStyle('/projects', styles.projectsBtn)}>My Projects</Link>
          <Link to="/multimedia" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#fd7e14', '#a04e0a') : getActiveStyle('/multimedia', styles.multimediaBtn)}>Multimedia</Link>
          <Link to="/world-film" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#ff3c3c', '#8b0000') : getActiveStyle('/world-film', styles.worldFilmBtn)}>World Film</Link>
          <Link to="/contact" onClick={handleNavLinkClick} style={isMobile ? getMobileLinkStyle('#17a2b8', '#116a7b') : getActiveStyle('/contact', styles.contactBtn)}>Contact</Link>

          {!isMobile && session && <UserProfileDropdown />}

          {isMobile && session && (
            <button onClick={handleLogout} style={getMobileLinkStyle('#ff4b2b', '#9e2a2a')}>Logout</button>
          )}
        </div>
      </nav>
    </>
  );
}

// --- App Content ---
function AppContent({ session }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dbUser, setDbUser] = useState(null);
  const location = useLocation();

  const fetchUserData = useCallback(async () => {
    if (session?.user) {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', session.user.id)
        .single();
      if (data) setDbUser(data);
    }
  }, [session]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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
      <Navbar setIsLoading={setIsLoading} session={session} dbUser={dbUser} />
      {isLoading && <LoadingScreen />}
      <main style={{ padding: '15px', opacity: isLoading ? 0 : 1, transition: 'all 0.4s ease', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: theme.card, width: '100%', maxWidth: '1100px', padding: '25px', borderRadius: '12px', borderLeft: `6px solid ${theme.border}`, boxShadow: '0px 10px 40px rgba(0,0,0,0.6)', marginTop: '10px', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile session={session} onProfileUpdate={fetchUserData} />} />
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

// --- CSS Styles Objects ---
const baseLinkStyle = { 
  color: 'white', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold', 
  padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s ease'
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', background: '#0a0a0a', borderBottom: '2px solid #222', position: 'sticky', top: 0, zIndex: 1100, height: '65px' },
  leftSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  threeDotMenu: { display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer', zIndex: 1200 },
  dot: { width: '5px', height: '5px', backgroundColor: '#61dafb', borderRadius: '50%' },
  navLinks: { gap: '5px', display: 'flex', alignItems: 'center' },
  loadingContainer: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  
  homeBtn: { ...baseLinkStyle, background: '#333' },
  aboutBtn: { ...baseLinkStyle, background: '#6f42c1' },
  servicesBtn: { ...baseLinkStyle, background: '#007bff' },
  projectsBtn: { ...baseLinkStyle, background: '#28a745' },
  multimediaBtn: { ...baseLinkStyle, background: '#fd7e14' },
  worldFilmBtn: { ...baseLinkStyle, background: '#ff3c3c' },
  contactBtn: { ...baseLinkStyle, background: '#17a2b8' },

  profileWrapper: { position: 'relative', marginLeft: '10px' },
  avatarContainer: { position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  profilePic: { width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #61dafb', objectFit: 'cover' },
  onlineBadge: { position: 'absolute', bottom: '2px', right: '0px', width: '10px', height: '10px', backgroundColor: '#24fe41', borderRadius: '50%', border: '2px solid #0a0a0a' },

  dropdownMenu: {
    position: 'absolute', top: '50px', right: '0', background: '#161616', border: '1px solid #333', 
    borderRadius: '12px', width: '240px', boxShadow: '0 10px 30px rgba(0,0,0,0.7)', zIndex: 1200, padding: '10px 0', overflow: 'hidden'
  },
  dropdownHeader: { display: 'flex', alignItems: 'center', padding: '15px', gap: '12px' },
  largeAvatar: { width: '45px', height: '45px', borderRadius: '50%', border: '1px solid #333' },
  headerText: { display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  dropdownUserName: { fontSize: '14px', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  dropdownUserEmail: { fontSize: '11px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  dropdownDivider: { height: '1px', background: '#222', margin: '5px 0' },
  dropdownItem: {
    display: 'flex', alignItems: 'center', padding: '12px 20px', color: '#ccc', textDecoration: 'none', 
    fontSize: '13px', transition: '0.2s', border: 'none', background: 'none', width: '100%', cursor: 'pointer', textAlign: 'left'
  },
  dropdownLogout: { color: '#ff4b2b', fontWeight: 'bold' }
};