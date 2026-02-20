import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setIsLoading }) => {
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

  // মেনু ওপেন থাকলে ব্যাকগ্রাউন্ড স্ক্রল বন্ধ রাখা
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, isMobile]);

  const handleLinkClick = () => {
    if (setIsLoading) setIsLoading(true);
    setIsOpen(false);
  };

  const getLinkStyle = (bgColor, borderCol) => ({
    color: 'white',
    textDecoration: 'none',
    fontSize: isMobile ? '16px' : '13px',
    fontWeight: '600',
    padding: isMobile ? '15px 20px' : '10px 15px',
    borderRadius: '8px',
    background: bgColor || '#222',
    borderBottom: `4px solid ${borderCol || '#000'}`,
    textAlign: isMobile ? 'left' : 'center',
    display: 'block',
    margin: isMobile ? '12px 20px' : '0 5px',
    transition: '0.3s',
    whiteSpace: 'nowrap',
    boxShadow: isMobile ? '0 4px 6px rgba(0,0,0,0.3)' : 'none'
  });

  return (
    <>
      {/* ১. Overlay: মেনু ওপেন হলে মেইন পেজ ঝাপসা এবং ডার্ক হবে */}
      {isMobile && isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          style={styles.overlay}
        />
      )}

      <nav style={styles.navbar}>
        <div style={styles.logo}>
          UNFINISHED <span style={{ color: '#61dafb' }}>LOVE</span>
          {!isMobile && <span style={{ fontSize: '12px', marginLeft: '5px', opacity: 0.8 }}>MULTIMEDIA</span>}
        </div>

        {/* ২. থ্রি-ডট মেনু বাটন (শুধুমাত্র মোবাইলে) */}
        {isMobile && (
          <div style={styles.threeDotMenu} onClick={() => setIsOpen(!isOpen)}>
            <div style={styles.dot}></div>
            <div style={styles.dot}></div>
            <div style={styles.dot}></div>
          </div>
        )}

        {/* ৩. নেভিগেশন ড্রয়ার লিঙ্কসমূহ */}
        <div style={{
          ...styles.navLinks,
          transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(100%)') : 'none',
          flexDirection: isMobile ? 'column' : 'row',
          position: isMobile ? 'fixed' : 'static',
          top: 0,
          right: 0,
          height: isMobile ? '100vh' : 'auto',
          width: isMobile ? '280px' : 'auto',
          background: isMobile ? '#111' : 'transparent',
          paddingTop: isMobile ? '80px' : '0',
          boxShadow: isMobile && isOpen ? '-10px 0 20px rgba(0,0,0,0.8)' : 'none',
          display: isMobile ? 'flex' : 'flex'
        }}>
          <Link to="/" style={getLinkStyle('#333', '#111')} onClick={handleLinkClick}>Home</Link>
          <Link to="/about" style={getLinkStyle('#222', '#000')} onClick={handleLinkClick}>About</Link>
          <Link to="/services" style={getLinkStyle('#007bff', '#0056b3')} onClick={handleLinkClick}>Services</Link>
          <Link to="/projects" style={getLinkStyle('#28a745', '#1e7e34')} onClick={handleLinkClick}>Projects</Link>
          <Link to="/multimedia" style={getLinkStyle('#fd7e14', '#a04e0a')} onClick={handleLinkClick}>Multimedia</Link>
          <Link to="/world-film" style={getLinkStyle('#ff3c3c', '#8b0000')} onClick={handleLinkClick}>World Film</Link>
          <Link to="/contact" style={getLinkStyle('#17a2b8', '#0e6675')} onClick={handleLinkClick}>Contact</Link>
        </div>
      </nav>
    </>
  );
};

const styles = {
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '0 25px', 
    background: '#0a0a0a', 
    borderBottom: '2px solid #222', 
    position: 'sticky', 
    top: 0, 
    zIndex: 1001,
    height: '70px'
  },
  logo: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: '18px', 
    fontFamily: 'sans-serif',
    zIndex: 1002,
    letterSpacing: '1px'
  },
  threeDotMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 1002
  },
  dot: {
    width: '5px',
    height: '5px',
    backgroundColor: '#61dafb',
    borderRadius: '50%'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
    transition: '0.3s'
  },
  navLinks: { 
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
    zIndex: 1001,
    alignItems: 'stretch'
  }
};

export default Navbar;