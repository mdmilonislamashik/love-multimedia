import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export default function Profile({ session, onProfileUpdate }) {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const user = session?.user;

  // ডাটাবেস থেকে প্রোফাইল তথ্য নিয়ে আসা
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) throw error;
      if (data) {
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      console.log('Error loading user data:', error.message);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    getProfile();
  }, [session, getProfile]);

  // ইমেজ আপলোড ফাংশন
  async function uploadAvatar(event) {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('আপনাকে একটি ছবি সিলেক্ট করতে হবে।');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
      
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  // প্রোফাইল তথ্য আপডেট
  async function updateProfile(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const updates = {
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      
      // Navbar-এ তথ্য আপডেট করার জন্য callback কল করা
      if (onProfileUpdate) onProfileUpdate();
      
      alert('✅ প্রোফাইল সফলভাবে আপডেট হয়েছে!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h1 style={styles.title}>👤 My Profile</h1>
        <p style={styles.subtitle}>আপনার প্রোফাইল কাস্টমাইজ করুন এবং ব্যক্তিগত তথ্য আপডেট রাখুন।</p>
      </div>

      <div style={styles.card}>
        <form onSubmit={updateProfile} style={styles.form}>
          
          {/* প্রোফাইল পিকচার সেকশন */}
          <div style={styles.avatarContainer}>
            <div style={styles.imageWrapper}>
              <img 
                src={avatarUrl || "https://ui-avatars.com/api/?background=111&color=61dafb&bold=true&name=" + user?.email} 
                alt="Profile" 
                style={styles.avatarPreview} 
              />
              {uploading && (
                <div style={styles.imageOverlay}>
                   <div className="loader-mini"></div>
                </div>
              )}
              <label style={styles.editIconBtn} title="Change Photo">
                📷
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={uploadAvatar} 
                  disabled={uploading} 
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div style={{marginTop: '10px'}}>
               <p style={{fontSize: '12px', color: '#61dafb', fontWeight: '600'}}>Profile Picture</p>
            </div>
          </div>

          <div style={styles.formContent}>
            {/* ইমেইল (Read Only) */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>📧 Email Address</label>
              <input type="text" value={user?.email} disabled style={styles.disabledInput} />
            </div>

            {/* নাম ইনপুট */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>✍️ Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                style={styles.input}
                className="profile-input"
                required
              />
            </div>

            {/* সেভ বাটন */}
            <button type="submit" disabled={loading} style={styles.saveBtn} className="save-button">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .profile-input:focus {
            border-color: #61dafb !important;
            box-shadow: 0 0 10px rgba(97, 218, 251, 0.2);
          }
          .save-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(97, 218, 251, 0.3);
            filter: brightness(1.1);
          }
          .save-button:active {
            transform: translateY(0);
          }
          .loader-mini {
            width: 20px; height: 20px;
            border: 2px solid #fff;
            border-top: 2px solid #61dafb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
}

// আধুনিক ডিজাইন স্টাইলস
const styles = {
  container: { 
    padding: '20px', 
    maxWidth: '800px', 
    margin: '0 auto',
    animation: 'fadeIn 0.5s ease'
  },
  headerSection: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '32px', color: '#fff', marginBottom: '8px', fontWeight: '900', letterSpacing: '1px' },
  subtitle: { color: '#888', fontSize: '14px' },
  
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
  },
  
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    gap: '30px' 
  },
  
  avatarContainer: { textAlign: 'center' },
  imageWrapper: { 
    position: 'relative', 
    width: '130px', 
    height: '130px',
    margin: '0 auto'
  },
  avatarPreview: { 
    width: '100%', 
    height: '100%', 
    borderRadius: '50%', 
    objectFit: 'cover', 
    border: '3px solid #61dafb',
    padding: '5px',
    background: '#111'
  },
  imageOverlay: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.7)', borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  },
  editIconBtn: {
    position: 'absolute', 
    bottom: '5px', 
    right: '5px',
    background: '#61dafb',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    border: '3px solid #1a1a1a',
    transition: '0.3s'
  },
  
  formContent: { width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '12px', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '5px' },
  
  input: {
    padding: '14px 18px', borderRadius: '12px', border: '1px solid #333',
    background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '15px', 
    outline: 'none', transition: '0.3s'
  },
  disabledInput: {
    padding: '14px 18px', borderRadius: '12px', border: '1px solid #222',
    background: 'rgba(0,0,0,0.2)', color: '#555', fontSize: '15px', cursor: 'not-allowed'
  },
  
  saveBtn: {
    padding: '16px', borderRadius: '12px', border: 'none',
    background: 'linear-gradient(135deg, #61dafb 0%, #21a1f1 100%)',
    color: '#000', fontWeight: '800', fontSize: '16px',
    cursor: 'pointer', marginTop: '10px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textTransform: 'uppercase', letterSpacing: '1px'
  }
};