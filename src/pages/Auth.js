import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // গুগল লগইন ফাংশন - আপনার Vercel Link এখানে যুক্ত করা হয়েছে
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // গুগল লগইন সফল হওয়ার পর এই লিঙ্কে ফিরে আসবে
        redirectTo: 'https://love-multimedia-mw02v9he6-mdmilonislamashiks-projects.vercel.app'
      }
    });
    if (error) alert("Google Login Error: " + error.message);
  };

  // ইমেইল দিয়ে লগইন
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill in all fields");
    
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Login Error: " + error.message);
    setLoading(false);
  };

  // ইমেইল দিয়ে রেজিস্ট্রেশন
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill in all fields");

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert("Registration Error: " + error.message);
    } else {
      alert("Registration Successful! If you disabled email confirmation, you can login now.");
    }
    setLoading(false);
  };

  return (
    <div style={authStyles.container}>
      <div style={authStyles.card}>
        <h2 style={authStyles.title}>UNFINISHED LOVE MULTIMEDIA</h2>
        <p style={authStyles.subtitle}>Welcome back! Please login or register.</p>

        {/* গুগল লগইন বাটন */}
        <button onClick={handleGoogleLogin} style={authStyles.googleBtn}>
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            style={authStyles.gIcon} 
          />
          Continue with Google
        </button>

        <div style={authStyles.divider}>
          <span style={authStyles.dividerText}>OR</span>
        </div>

        {/* ইমেইল ও পাসওয়ার্ড ফর্ম */}
        <form style={authStyles.form}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={authStyles.input}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={authStyles.input}
            required
          />
          
          <div style={authStyles.buttonGroup}>
            <button 
              type="submit" 
              onClick={handleLogin} 
              disabled={loading} 
              style={authStyles.loginBtn}
            >
              {loading ? 'Wait...' : 'LOGIN'}
            </button>
            <button 
              type="button" 
              onClick={handleSignUp} 
              disabled={loading} 
              style={authStyles.signUpBtn}
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// স্টাইল অবজেক্ট
const authStyles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    background: '#0a0a0a',
    fontFamily: 'Arial, sans-serif'
  },
  card: { 
    background: '#161616', 
    padding: '40px', 
    borderRadius: '15px', 
    border: '1px solid #333', 
    textAlign: 'center', 
    width: '350px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  title: { color: '#61dafb', fontSize: '18px', marginBottom: '10px', fontWeight: '800' },
  subtitle: { color: '#888', fontSize: '12px', marginBottom: '25px' },
  googleBtn: { 
    width: '100%', 
    padding: '12px', 
    borderRadius: '8px', 
    border: 'none', 
    background: 'white', 
    color: '#000', 
    fontWeight: 'bold', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    cursor: 'pointer', 
    marginBottom: '20px',
    transition: '0.3s'
  },
  gIcon: { width: '18px', marginRight: '10px' },
  divider: { 
    margin: '20px 0', 
    borderBottom: '1px solid #333', 
    lineHeight: '0.1em', 
    textAlign: 'center' 
  },
  dividerText: { background: '#161616', padding: '0 10px', color: '#555', fontSize: '12px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #333', 
    background: '#0a0a0a', 
    color: 'white', 
    outline: 'none',
    fontSize: '14px'
  },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: '10px' },
  loginBtn: { 
    flex: 1, 
    padding: '12px', 
    borderRadius: '8px', 
    border: 'none', 
    background: '#61dafb', 
    color: 'black', 
    fontWeight: 'bold', 
    cursor: 'pointer' 
  },
  signUpBtn: { 
    flex: 1, 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #28a745', 
    background: 'transparent', 
    color: '#28a745', 
    fontWeight: 'bold', 
    cursor: 'pointer' 
  }
};

export default Auth;