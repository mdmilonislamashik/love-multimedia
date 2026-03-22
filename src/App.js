import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// পেজগুলো ইমপোর্ট করুন
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // সেশন চেক করা
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ইউজার প্রোফাইল ডাটাবেস থেকে নিয়ে আসা
  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', userId)
      .single();
    if (data) setProfile(data);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    navigate('/');
  };

  return (
    <div style={{ background: '#0a0a0b', minHeight: '100vh', color: 'white' }}>
      {/* --- ন্যাভিবার সেকশন --- */}
      <nav style={navStyles.navbar}>
        <div style={navStyles.logo}>UNFINISHED LOVE MULTIMEDIA</div>
        
        <div style={navStyles.navLinks}>
          <Link title="Home" style={navStyles.link} to="/">Home</Link>
          <Link title="About" style={navStyles.link} to="/about">About</Link>
          
          {session ? (
            <div style={navStyles.authGroup}>
              {/* প্রোফাইল কার্ড - এখানে ক্লিক করলে প্রোফাইল পেজে যাবে */}
              <Link to="/profile" style={navStyles.profileCard}>
                <img 
                  src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${session.user.email}`} 
                  alt="User" 
                  style={navStyles.avatar} 
                />
                <span style={navStyles.userName}>
                  {profile?.full_name || 'ইউজার'}
                </span>
              </Link>
              
              <button onClick={handleLogout} style={navStyles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <Link style={navStyles.loginBtn} to="/auth">Login</Link>
          )}
        </div>
      </nav>

      {/* --- রাউটিং সেকশন --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={session ? <Profile session={session} /> : <Auth />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

// ন্যাভিবার স্টাইল
const navStyles = {
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '15px 40px', background: '#111', borderBottom: '1px solid #333',
    position: 'sticky', top: 0, zIndex: 1000
  },
  logo: { fontSize: '20px', fontWeight: 'bold', color: '#fff', letterSpacing: '1px' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: '#ccc', textDecoration: 'none', fontSize: '14px', transition: '0.3s' },
  authGroup: { display: 'flex', alignItems: 'center', gap: '15px' },
  profileCard: {
    display: 'flex', alignItems: 'center', gap: '10px', background: '#222',
    padding: '5px 12px', borderRadius: '30px', textDecoration: 'none',
    border: '1px solid #444', transition: '0.3s'
  },
  avatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #61dafb' },
  userName: { color: '#fff', fontSize: '13px', fontWeight: '500' },
  logoutBtn: { 
    background: '#e74c3c', color: '#fff', border: 'none', padding: '8px 15px', 
    borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
  },
  loginBtn: { background: '#61dafb', color: '#000', padding: '8px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }
};

export default App;