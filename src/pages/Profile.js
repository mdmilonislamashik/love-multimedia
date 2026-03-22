import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export default function Profile({ session }) {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const user = session?.user;

  // ডাটাবেস থেকে প্রোফাইল তথ্য নিয়ে আসা (useCallback ব্যবহার করা হয়েছে বিল্ড এরর এড়াতে)
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
      alert('ছবি আপলোড সফল হয়েছে!');
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  // প্রোফাইল তথ্য আপডেট (Upsert)
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
      alert('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ইউজার প্রোফাইল</h1>
      <p style={styles.subtitle}>আপনার ব্যক্তিগত তথ্য এবং ছবি এখান থেকে আপডেট করুন।</p>
      
      <div style={styles.card}>
        <form onSubmit={updateProfile} style={styles.form}>
          
          {/* প্রোফাইল পিকচার সেকশন */}
          <div style={styles.avatarSection}>
            <div style={styles.imageWrapper}>
              <img 
                src={avatarUrl || "https://ui-avatars.com/api/?name=" + user?.email} 
                alt="Profile" 
                style={styles.avatarPreview} 
              />
              {uploading && <div style={styles.imageOverlay}>আপলোড হচ্ছে...</div>}
            </div>
            <label style={styles.uploadLabel}>
              {uploading ? 'প্রসেসিং...' : 'ছবি পরিবর্তন করুন'}
              <input 
                type="file" 
                accept="image/*" 
                onChange={uploadAvatar} 
                disabled={uploading} 
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <hr style={styles.divider} />

          {/* ইনপুট সেকশন */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>ইমেইল এড্রেস</label>
            <input type="text" value={user?.email} disabled style={styles.disabledInput} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>আপনার পূর্ণ নাম</label>
            <input 
              type="text" 
              placeholder="আপনার নাম লিখুন" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              style={styles.input}
              required
            />
          </div>

          <button type="submit" disabled={loading} style={styles.saveBtn}>
            {loading ? 'সেভ হচ্ছে...' : 'প্রোফাইল সেভ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ইন-লাইন স্টাইল (CSS-in-JS)
const styles = {
  container: { padding: '20px', textAlign: 'center' },
  title: { fontSize: '28px', color: '#fff', marginBottom: '10px', fontWeight: '800' },
  subtitle: { color: '#aaa', marginBottom: '30px', fontSize: '14px' },
  card: {
    background: '#1a1a1a',
    borderRadius: '15px',
    padding: '40px 20px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    maxWidth: '500px',
    margin: '0 auto',
    border: '1px solid #333'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  avatarSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' },
  imageWrapper: { position: 'relative', width: '120px', height: '120px' },
  avatarPreview: { 
    width: '120px', height: '120px', borderRadius: '50%', 
    objectFit: 'cover', border: '4px solid #61dafb' 
  },
  imageOverlay: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.7)', borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px'
  },
  uploadLabel: {
    background: '#333', color: '#fff', padding: '8px 15px', borderRadius: '20px',
    fontSize: '13px', cursor: 'pointer', transition: '0.3s', border: '1px solid #444'
  },
  divider: { width: '100%', border: '0', borderTop: '1px solid #333', margin: '10px 0' },
  inputGroup: { textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '13px', color: '#61dafb', fontWeight: 'bold', marginLeft: '5px' },
  input: {
    padding: '12px 15px', borderRadius: '8px', border: '1px solid #444',
    background: '#222', color: '#fff', fontSize: '15px', outline: 'none'
  },
  disabledInput: {
    padding: '12px 15px', borderRadius: '8px', border: '1px solid #333',
    background: '#111', color: '#666', fontSize: '15px', cursor: 'not-allowed'
  },
  saveBtn: {
    padding: '15px', borderRadius: '8px', border: 'none',
    background: 'linear-gradient(45deg, #61dafb, #21a1f1)',
    color: '#000', fontWeight: 'bold', fontSize: '16px',
    cursor: 'pointer', marginTop: '10px', transition: '0.3s'
  }
};