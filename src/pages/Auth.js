import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom'; // রিডাইরেক্টের জন্য যোগ করা হয়েছে

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // রিডাইরেক্ট ফাংশন

  // ইউজার আগে থেকেই লগইন করা থাকলে তাকে ড্যাশবোর্ডে পাঠিয়ে দেবে
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard'); // যদি সেশন থাকে তবে ড্যাশবোর্ডে যাবে
      }
    };
    checkUser();
  }, [navigate]);

  // গুগল লগইন ফাংশন
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // লগইন শেষে আপনার বর্তমান ডোমেইনে ফিরে আসবে
        redirectTo: window.location.origin 
      }
    });
    if (error) alert("Google Login Error: " + error.message);
  };

  // ইমেইল দিয়ে লগইন
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please fill in all fields before login!");
    }
    
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert("Login Error: " + error.message);
    } else if (data.user) {
      alert("Login Successful!");
      navigate('/dashboard'); // সফল লগইনে ড্যাশবোর্ডে রিডাইরেক্ট
    }
    setLoading(false);
  };

  // ইমেইল দিয়ে রেজিস্ট্রেশন
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return alert("Please fill in all fields to register!");
    }

    if (password.length < 6) {
      return alert("Password should be at least 6 characters long!");
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("Registration Error: " + error.message);
    } else if (data.user) {
      // যদি Supabase-এ ইমেইল ভেরিফিকেশন অফ থাকে, তবে সরাসরি রিডাইরেক্ট হবে
      alert("Registration Successful! Please check your email for confirmation.");
      // ইমেইল ভেরিফিকেশন না থাকলে নিচের লাইনটি কমেন্ট আউট থেকে সরিয়ে দিন
      // navigate('/dashboard'); 
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
        <form style={authStyles.form} onSubmit={(e) => e.preventDefault()}>
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
              type="button" 
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

const authStyles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    background: '#0a0a0a',
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  },
  card: { 
    background: '#111', 
    padding: '40px', 
    borderRadius: '20px', 
    border: '1px solid #222', 
    textAlign: 'center', 
    width: '360px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
  },
  title: { color: '#61dafb', fontSize: '18px', marginBottom: '10px', fontWeight: '800', letterSpacing: '1px' },
  subtitle: { color: '#666', fontSize: '12px', marginBottom: '25px' },
  googleBtn: { 
    width: '100%', 
    padding: '12px', 
    borderRadius: '10px', 
    border: '1px solid #333', 
    background: '#fff', 
    color: '#000', 
    fontWeight: '700', 
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
    borderBottom: '1px solid #222', 
    lineHeight: '0.1em', 
    textAlign: 'center' 
  },
  dividerText: { background: '#111', padding: '0 10px', color: '#444', fontSize: '12px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { 
    padding: '14px', 
    borderRadius: '10px', 
    border: '1px solid #222', 
    background: '#0a0a0a', 
    color: 'white', 
    outline: 'none',
    fontSize: '14px'
  },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: '10px' },
  loginBtn: { 
    flex: 1, 
    padding: '12px', 
    borderRadius: '10px', 
    border: 'none', 
    background: '#61dafb', 
    color: 'black', 
    fontWeight: '800', 
    cursor: 'pointer'
  },
  signUpBtn: { 
    flex: 1, 
    padding: '12px', 
    borderRadius: '10px', 
    border: '1px solid #28a745', 
    background: 'transparent', 
    color: '#28a745', 
    fontWeight: '800', 
    cursor: 'pointer'
  }
};

export default Auth;