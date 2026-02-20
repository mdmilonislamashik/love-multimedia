import React, { useState, useEffect } from 'react';

const Multimedia = () => {
  const [hue, setHue] = useState(0);

  // অটোমেটিক নিওন কালার এফেক্ট
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const dynamicColor = `hsla(${hue}, 80%, 60%, 1)`;

  // ইউটিউব চ্যানেল ডেটা
  const youtubeChannels = [
    { name: '@advoottv', link: 'https://www.youtube.com/@advoottv?sub_confirmation=1', logo: '🏮', desc: 'Creative Media & Arts' },
    { name: '@vabojon', link: 'https://www.youtube.com/@vabojon?sub_confirmation=1', logo: '🧘', desc: 'Spiritual & Thoughtful' },
    { name: '@lastpageletter', link: 'https://www.youtube.com/@lastpageletter?sub_confirmation=1', logo: '✉️', desc: 'Poetry & Literature' }
  ];

  // ৫০+ অফিসিয়াল সফটওয়্যার লিস্ট
  const softwareHub = [
    {
      category: "Android Development (Official)",
      icon: "🤖",
      tools: [
        { name: "Android Studio (Official IDE)", desc: "অ্যান্ড্রয়েড অ্যাপ তৈরির মূল সফটওয়্যার", link: "https://developer.android.com/studio" },
        { name: "Android SDK & Tools", desc: "অ্যাপ রান ও টেস্ট করার প্রয়োজনীয় টুলস", link: "https://developer.android.com/studio#command-tools" },
        { name: "Android Emulator", desc: "পিসিতে ভার্চুয়াল মোবাইল চালানোর জন্য", link: "https://developer.android.com/studio/run/emulator" },
        { name: "IntelliJ IDEA", desc: "অ্যান্ড্রয়েড স্টুডিওর মূল ভিত্তি IDE", link: "https://www.jetbrains.com/idea/download/" }
      ]
    },
    {
      category: "Coding & IDEs",
      icon: "💻",
      tools: [
        { name: "Visual Studio Code", desc: "সবচেয়ে জনপ্রিয় লাইটওয়েট কোড এডিটর", link: "https://code.visualstudio.com/download" },
        { name: "Flutter SDK", desc: "এক কোডে Android ও iOS অ্যাপ তৈরি", link: "https://docs.flutter.dev/get-started/install" },
        { name: "React Native", desc: "JavaScript দিয়ে মোবাইল অ্যাপ ডেভেলপমেন্ট", link: "https://reactnative.dev/docs/environment-setup" },
        { name: "PyCharm", desc: "Python ডেভেলপমেন্টের জন্য সেরা IDE", link: "https://www.jetbrains.com/pycharm/download/" },
        { name: "Node.js (LTS)", desc: "JavaScript রানটাইম এনভায়রনমেন্ট", link: "https://nodejs.org/" }
      ]
    },
    {
      category: "No-Code App Builders",
      icon: "🧱",
      tools: [
        { name: "MIT App Inventor", desc: "ড্র্যাগ-এন্ড-ড্রপ করে অ্যাপ বানানো", link: "https://appinventor.mit.edu/" },
        { name: "Kodular", desc: "কোডিং ছাড়া প্রফেশনাল অ্যাপ মেকার", link: "https://www.kodular.io/" },
        { name: "Thunkable", desc: "সহজ উপায়ে ক্রস-প্ল্যাটফর্ম অ্যাপ", link: "https://thunkable.com/" }
      ]
    },
    {
      category: "Graphics & UI/UX Design",
      icon: "🎨",
      tools: [
        { name: "Adobe Photoshop 2024", desc: "ফটো এডিটিং ও ডিজাইনের রাজা", link: "https://www.adobe.com/products/photoshop.html" },
        { name: "Adobe Illustrator", desc: "ভেক্টর গ্রাফিক্স ও লোগো ডিজাইন", link: "https://www.adobe.com/products/illustrator.html" },
        { name: "Figma (Desktop)", desc: "অ্যাপ ও ওয়েবসাইট UI/UX ডিজাইন", link: "https://www.figma.com/downloads/" },
        { name: "Blender 3D", desc: "ফ্রি ও ওপেন সোর্স ৩ডি মডেলিং", link: "https://www.blender.org/download/" },
        { name: "Canva Pro", desc: "অনলাইন গ্রাফিক্স ডিজাইন টুল", link: "https://www.canva.com/download/windows/" }
      ]
    },
    {
      category: "Video & Audio Editing",
      icon: "🎬",
      tools: [
        { name: "Adobe Premiere Pro", desc: "অফিসিয়াল ভিডিও এডিটিং সফটওয়্যার", link: "https://www.adobe.com/products/premiere.html" },
        { name: "After Effects", desc: "ভিজ্যুয়াল ইফেক্ট ও মোশন গ্রাফিক্স", link: "https://www.adobe.com/products/aftereffects.html" },
        { name: "DaVinci Resolve", desc: "কালার গ্রেডিং ও হাই-এন্ড এডিটিং", link: "https://www.blackmagicdesign.com/products/davinciresolve" },
        { name: "Camtasia", desc: "স্ক্রিন রেকর্ড ও টিউটোরিয়াল মেকার", link: "https://www.techsmith.com/video-editor.html" },
        { name: "Audacity", desc: "ফ্রি অডিও রেকর্ড ও এডিটিং", link: "https://www.audacityteam.org/download/" }
      ]
    },
    {
      category: "Daily Essentials",
      icon: "🚀",
      tools: [
        { name: "IDM Full Version", desc: "সবচেয়ে দ্রুত ডাউনলোড ম্যানেজার", link: "https://www.internetdownloadmanager.com/download.html" },
        { name: "WinRAR / 7-Zip", desc: "ফাইল জিপ ও আনজিপ করার জন্য", link: "https://www.win-rar.com/download.html" },
        { name: "Google Chrome", desc: "সবচেয়ে দ্রুত ওয়েব ব্রাউজার", link: "https://www.google.com/chrome/" },
        { name: "VLC Player", desc: "সব ফরম্যাটের ভিডিও প্লেয়ার", link: "https://www.videolan.org/vlc/" },
        { name: "MS Office 365", desc: "অফিসিয়াল ডকুমেন্ট টুলস", link: "https://www.office.com/" }
      ]
    },
    {
      category: "Testing & Backend",
      icon: "🧪",
      tools: [
        { name: "Genymotion", desc: "দ্রুততম অ্যান্ড্রয়েড এমুলেটর", link: "https://www.genymotion.com/download/" },
        { name: "Firebase Console", desc: "ডেটাবেজ ও নোটিফিকেশন সিস্টেম", link: "https://firebase.google.com/" },
        { name: "XAMPP / WAMP", desc: "লোকাল পিএইচপি সার্ভার", link: "https://www.apachefriends.org/download.html" },
        { name: "Postman", desc: "API টেস্ট ও ডেভেলপমেন্ট টুল", link: "https://www.postman.com/downloads/" }
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.title, color: dynamicColor }}>ULM PRO DEVELOPER HUB 🎥</h1>

      {/* --- Youtube Channels --- */}
      <div style={{ ...styles.sectionBox, borderColor: dynamicColor }}>
        <h2 style={{ ...styles.boxTitle, color: dynamicColor }}>OFFICIAL CHANNELS 📡</h2>
        <div style={styles.channelGrid}>
          {youtubeChannels.map((channel, index) => (
            <a key={index} href={channel.link} target="_blank" rel="noopener noreferrer" style={styles.channelCard}>
              <span style={styles.channelLogo}>{channel.logo}</span>
              <div style={styles.channelInfo}>
                <span style={styles.channelName}>{channel.name}</span>
                <span style={styles.channelDesc}>{channel.desc}</span>
                <span style={{ fontSize: '11px', color: dynamicColor, fontWeight: 'bold' }}>Auto Subscribe 🔔</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* --- Software Hub Section --- */}
      <div style={styles.softwareSection}>
        <h2 style={{ ...styles.boxTitle, color: dynamicColor, textAlign: 'center' }}>UNIVERSAL SOFTWARE STATION 🛠️</h2>
        <div style={styles.softwareGrid}>
          {softwareHub.map((cat, idx) => (
            <div key={idx} style={styles.catCard}>
              <div style={styles.catHeader}>
                <span style={styles.catIcon}>{cat.icon}</span>
                <h3 style={{ color: dynamicColor, fontSize: '18px' }}>{cat.category}</h3>
              </div>
              <div style={styles.toolList}>
                {cat.tools.map((tool, i) => (
                  <div key={i} style={styles.toolWrapper}>
                    <div style={styles.toolText}>
                       <span style={styles.toolName}>{tool.name}</span>
                       <p style={styles.toolDesc}>{tool.desc}</p>
                    </div>
                    <a href={tool.link} target="_blank" rel="noopener noreferrer" style={{...styles.downloadLink, color: dynamicColor}}>
                      Official Link ➜
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} ULM Multimedia | All Links are Official & Safe</p>
      </footer>
    </div>
  );
};

const styles = {
  container: { padding: '60px 20px', backgroundColor: '#020202', minHeight: '100vh', color: 'white', fontFamily: "'Segoe UI', sans-serif" },
  title: { fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: '900', marginBottom: '50px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '4px' },
  sectionBox: { maxWidth: '1100px', margin: '0 auto 60px', padding: '35px', backgroundColor: '#0a0a0a', borderRadius: '30px', border: '1px solid', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' },
  boxTitle: { fontSize: '22px', marginBottom: '30px', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'left' },
  channelGrid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' },
  channelCard: { flex: '1', minWidth: '280px', display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#111', borderRadius: '20px', textDecoration: 'none', color: 'white', border: '1px solid #1a1a1a', transition: '0.3s' },
  channelLogo: { fontSize: '40px', marginRight: '20px' },
  channelInfo: { textAlign: 'left', display: 'flex', flexDirection: 'column' },
  channelName: { fontSize: '18px', fontWeight: 'bold' },
  channelDesc: { fontSize: '13px', color: '#777', marginBottom: '5px' },
  softwareSection: { maxWidth: '1200px', margin: '0 auto' },
  softwareGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' },
  catCard: { backgroundColor: '#0a0a0a', padding: '25px', borderRadius: '25px', border: '1px solid #1a1a1a', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' },
  catHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #1a1a1a', paddingBottom: '10px' },
  catIcon: { fontSize: '24px' },
  toolList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  toolWrapper: { padding: '15px', backgroundColor: '#000', borderRadius: '15px', border: '1px solid #1a1a1a' },
  toolText: { textAlign: 'left', marginBottom: '10px' },
  toolName: { fontSize: '15px', fontWeight: 'bold', color: '#fff' },
  toolDesc: { fontSize: '11px', color: '#888', marginTop: '4px' },
  downloadLink: { fontSize: '13px', textDecoration: 'none', fontWeight: 'bold', display: 'block', textAlign: 'right' },
  footer: { marginTop: '80px', textAlign: 'center', color: '#444', borderTop: '1px solid #111', paddingTop: '30px' }
};

export default Multimedia;