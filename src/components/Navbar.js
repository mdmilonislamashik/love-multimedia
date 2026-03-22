import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী পাথ ঠিক আছে

const Navbar = ({ setIsLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // ১. ইউজার প্রোফাইল ডাটা ফেচ করার ফাংশন
  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.warn("Profile not found in database. Please update from Profile page.");
          return;
        }

        if (data) {
          let finalImageUrl = null;
          if (data.avatar_url) {
            const { data: imageData } = supabase.storage
              .from('avatars')
              .getPublicUrl(data.avatar_url);
            finalImageUrl = imageData.publicUrl;
          }

          setProfile({ 
            full_name: data.full_name || 'User', 
            avatar_url: finalImageUrl 
          });
        }
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    getProfile();

    // প্রোফাইল বা লগইন অবস্থা পরিবর্তন হলে অটো আপডেট হবে
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        getProfile();
      }
      if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    navigate('/login');
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
    border: 'none',
    cursor: 'pointer'
  });

  return (
    <>
      {isMobile && isOpen && (
        <div onClick={() => setIsOpen(false)} style={styles.overlay} />
      )}

      <nav style={styles.navbar}>
        <div style={styles.logo}>
          UNFINISHED <span style={{ color: '#61dafb' }}>LOVE</span>
          {!isMobile && <span style={{ fontSize: '12px', marginLeft: '5px', opacity: 0.8 }}>MULTIMEDIA</span>}
        </div>

        {isMobile && (
          <div style={styles.threeDotMenu} onClick={() => setIsOpen(!isOpen)}>
            <div style={styles.dot}></div>
            <div style={styles.dot}></div>
            <div style={styles.dot}></div>
          </div>
        )}

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
          display: 'flex',
          alignItems: isMobile ? 'stretch' : 'center',
          zIndex: 1001
        }}>
          <Link to="/" style={getLinkStyle('#333', '#111')}>Home</Link>
          <Link to="/about" style={getLinkStyle('#222', '#000')}>About</Link>
          <Link to="/services" style={getLinkStyle('#007bff', '#0056b3')}>Services</Link>
          <Link to="/projects" style={getLinkStyle('#28a745', '#1e7e34')}>Projects</Link>
          <Link to="/multimedia" style={getLinkStyle('#fd7e14', '#a04e0a')}>Multimedia</Link>
          <Link to="/world-film" style={getLinkStyle('#ff3c3c', '#8b0000')}>World Film</Link>
          <Link to="/contact" style={getLinkStyle('#17a2b8', '#0e6675')}>Contact</Link>
          
          {/* প্রোফাইল সেকশন: লগআউট বাটনের ঠিক আগে */}
          {profile && (
            <Link to="/profile" style={{...styles.profileContainer, margin: isMobile ? '15px 20px' : '0 10px', textDecoration: 'none'}}>
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" style={styles.avatar} />
              ) : (
                <div style={styles.avatarPlaceholder}>{profile.full_name?.charAt(0)}</div>
              )}
              <span style={styles.userName}>{profile.full_name}</span>
            </Link>
          )}

          <button onClick={handleLogout} style={getLinkStyle('#e74c3c', '#c0392b')}>Logout</button>
        </div>
      </nav>
    </>
  );
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px', background: '#0a0a0a', borderBottom: '2px solid #222', position: 'sticky', top: 0, zIndex: 1001, height: '70px' },
  logo: { color: 'white', fontWeight: 'bold', fontSize: '18px', zIndex: 1002 },
  threeDotMenu: { display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer', zIndex: 1002 },
  dot: { width: '5px', height: '5px', backgroundColor: '#61dafb', borderRadius: '50%' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.75)', zIndex: 1000 },
  navLinks: { transition: 'transform 0.4s ease' },
  profileContainer: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  avatar: { width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #61dafb', objectFit: 'cover' },
  avatarPlaceholder: { width: '35px', height: '35px', borderRadius: '50%', background: '#61dafb', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  userName: { color: '#61dafb', fontSize: '14px', fontWeight: 'bold' }
};

export default Navbar;