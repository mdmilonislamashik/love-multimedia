import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WorldFilm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // ১. মুভি প্ল্যাটফর্ম ডেটা
  const moviePlatforms = [
    { name: "MovieBox PH", type: "Premium HD", desc: "Stream and download the latest global movies and trending series in high resolution.", link: "https://moviebox.ph/", icon: "📦" },
    { name: "MLWBD", type: "Bangla Dubbed", desc: "Top site for South Indian (Tamil/Telugu) and Hollywood movies dubbed in Bengali.", link: "https://mlwbd.com", icon: "🇧🇩" },
    { name: "Bolly4u", type: "Hindi & Dual Audio", desc: "Best platform for Bollywood Hindi movies and Dual Audio 4K/1080p downloads.", link: "https://bolly4u.org", icon: "🇮🇳" },
    { name: "xHamster", type: "Adult Content", desc: "One of the largest global platforms for adult entertainment and premium videos.", link: "https://xhamster.com", icon: "🔞" },
    { name: "DesiX", type: "Regional 18+", desc: "Specialized in South Asian adult content and short films for mature audiences.", link: "https://desix.net", icon: "🌶️" },
    { name: "Bioscope", type: "Bengali Originals", desc: "Watch Dhallywood movies, Natoks, and Indian Bengali content officially.", link: "https://www.bioscopelive.com", icon: "🎭" },
    { name: "YTS 4K", type: "Ultra HD", desc: "Download worldwide cinematic masterpieces in ultra-compressed 4K BluRay quality.", link: "https://yts.mx", icon: "💎" },
    { name: "Movie-Hut", type: "Regional", desc: "A great collection of Indian Bengali and Kolkata-based cinema and series.", link: "https://movie-hut.com", icon: "🎬" }
  ];

  // ২. লাইভ স্পোর্টস প্ল্যাটফর্ম (নতুন সেকশন)
  const sportsPlatforms = [
    { name: "T Sports", type: "Live Cricket/Football", desc: "Bangladesh's first sports channel. Best for Tigers' matches and BPL.", link: "https://www.tsports.com/", icon: "🏏" },
    { name: "Sony LIV", type: "Premium Sports", desc: "Official broadcaster for UCL, Series A, and International Cricket.", link: "https://www.sonyliv.com/custompage/sports-47", icon: "⚽" },
    { name: "Hotstar", type: "IPL Special", desc: "Watch IPL, ICC Events, and Premier League live with premium quality.", link: "https://www.hotstar.com/in/sports", icon: "🏆" },
    { name: "FootyBite", type: "Global Football", desc: "Best for streaming La Liga, Premier League, and Bundesliga matches.", link: "https://www.footybite.tv/", icon: "🥅" },
    { name: "CricHD", type: "Live Channels", desc: "Access Sky Sports, BT Sport, and Willow TV for 24/7 sports coverage.", link: "https://www.crichd.com/", icon: "📺" },
    { name: "Rabbitholebd", type: "Local Sports", desc: "Watch Bangladesh National Team cricket matches live on any device.", link: "https://www.rabbitholebd.com/", icon: "🐰" }
  ];

  // ৩. ইউটিউব চ্যানেলের লিস্ট
  const youtubeChannels = [
    { name: "T-Series", cat: "Music Industry", link: "https://youtube.com/@tseries", icon: "🎵" },
    { name: "MrBeast", cat: "Philanthropy", link: "https://youtube.com/@MrBeast", icon: "💎" },
    { name: "PewDiePie", cat: "Gaming Culture", link: "https://youtube.com/@PewDiePie", icon: "🎮" },
    { name: "NASA", cat: "Space Exploration", link: "https://youtube.com/@NASA", icon: "🚀" },
    { name: "Marques Brownlee", cat: "Tech Reviews", link: "https://youtube.com/@MKBHD", icon: "💻" },
    { name: "National Geographic", cat: "Wildlife Doc", link: "https://youtube.com/@NatGeo", icon: "🐾" },
    { name: "Gordon Ramsay", cat: "Culinary Arts", link: "https://youtube.com/@gordonramsay", icon: "🍳" },
    { name: "TED-Ed", cat: "Visual Education", link: "https://youtube.com/@TEDEd", icon: "🧠" },
    { name: "WWE", cat: "Sports Ent.", link: "https://youtube.com/@WWE", icon: "🤼" },
    { name: "Somoy TV", cat: "BD News", link: "https://youtube.com/@somoytvnews", icon: "📢" },
    { name: "Village Cooking", cat: "Traditional Food", link: "https://youtube.com/@VillageCookingChannel", icon: "🔥" },
    { name: "Lofi Girl", cat: "Study Beats", link: "https://youtube.com/@LofiGirl", icon: "🎧" },
    { name: "BBC News", cat: "Global Affairs", link: "https://youtube.com/@BBCNews", icon: "🌍" },
    { name: "5-Minute Crafts", cat: "Life Hacks", link: "https://youtube.com/@5MinuteCraftsYouTube", icon: "💡" },
    { name: "Dude Perfect", cat: "Trick Shots", link: "https://youtube.com/@DudePerfect", icon: "🏀" },
    { name: "Kurzgesagt", cat: "Science", link: "https://youtube.com/@Kurzgesagt", icon: "🧬" },
    { name: "Technical Guruji", cat: "Hindi Tech", link: "https://youtube.com/@TechnicalGuruji", icon: "🛠️" },
    { name: "Dhruv Rathee", cat: "Social Issues", link: "https://youtube.com/@dhruvrathee", icon: "⚖️" },
    { name: "freeCodeCamp", cat: "Education/IT", link: "https://youtube.com/@freecodecamp", icon: "🆓" },
    { name: "Chess.com", cat: "Board Games", link: "https://youtube.com/@chess", icon: "♟️" }
  ];

  const handleNavigation = (e, path) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open(path, '_blank');
    }, 1200);
  };

  return (
    <div style={styles.container}>
      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.loadingOverlay}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={styles.spinner} />
            <p style={{ color: '#ff3c3c', marginTop: '15px', fontWeight: 'bold' }}>Connecting to Server...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Section 1: Cinema Universe --- */}
      <div style={styles.header}>
        <h1 style={styles.title}>Cinema <span style={{ color: '#ff3c3c' }}>Universe</span></h1>
        <p style={styles.subtitle}>The ultimate directory for 4K Movies and World Entertainment.</p>
      </div>

      <div style={styles.grid}>
        {moviePlatforms.map((site, index) => (
          <div 
            key={index} 
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0px 15px 35px rgba(255, 60, 60, 0.25)';
              e.currentTarget.style.borderColor = '#ff3c3c';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#1a202c';
            }}
          >
            <div style={styles.iconBox}>{site.icon}</div>
            <div style={styles.typeTag}>{site.type}</div>
            <h3 style={styles.cardTitle}>{site.name}</h3>
            <p style={styles.cardDesc}>{site.desc}</p>
            <a href={site.link} onClick={(e) => handleNavigation(e, site.link)} style={styles.actionBtn}>
              Access Platform ↗
            </a>
          </div>
        ))}
      </div>

      {/* --- Section 2: Live Sports TV (নতুন যোগ করা হয়েছে) --- */}
      <div style={{ ...styles.header, marginTop: '100px' }}>
        <h1 style={styles.title}>Live <span style={{ color: '#ff3c3c' }}>Sports TV</span></h1>
        <p style={styles.subtitle}>Watch Cricket, Football, and Global Sports live from anywhere.</p>
      </div>

      <div style={styles.grid}>
        {sportsPlatforms.map((site, index) => (
          <div 
            key={index} 
            style={{...styles.card, borderColor: '#1e293b'}}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0px 15px 35px rgba(0, 184, 212, 0.15)';
              e.currentTarget.style.borderColor = '#00b8d4';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#1e293b';
            }}
          >
            <div style={styles.iconBox}>{site.icon}</div>
            <div style={{...styles.typeTag, color: '#00b8d4', backgroundColor: 'rgba(0, 184, 212, 0.12)'}}>{site.type}</div>
            <h3 style={styles.cardTitle}>{site.name}</h3>
            <p style={styles.cardDesc}>{site.desc}</p>
            <a href={site.link} onClick={(e) => handleNavigation(e, site.link)} style={{...styles.actionBtn, backgroundColor: '#00b8d4'}}>
              Watch Live Now ⚡
            </a>
          </div>
        ))}
      </div>

      {/* --- Section 3: YouTube Masters --- */}
      <div style={{ ...styles.header, marginTop: '100px' }}>
        <h1 style={styles.title}>YouTube <span style={{ color: '#ff3c3c' }}>Masters</span></h1>
        <p style={styles.subtitle}>Explore 100+ top categorized channels globally.</p>
      </div>

      <div style={styles.scrollContainer}>
        <div style={styles.listGrid}>
          {youtubeChannels.map((channel, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02, backgroundColor: '#161616', borderColor: '#ff3c3c' }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleNavigation(e, channel.link)}
              style={styles.channelBtn}
            >
              <span style={styles.btnIcon}>{channel.icon}</span>
              <div style={styles.btnTextContent}>
                <span style={styles.btnName}>{channel.name}</span>
                <span style={styles.btnCat}>{channel.cat}</span>
              </div>
              <span style={styles.arrow}>→</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div style={styles.footerNote}>
        <p>🎬 <b>Cinema Guide:</b> Use IDM for faster downloads. | © {new Date().getFullYear()} WorldFilm Portfolio</p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '60px 20px', backgroundColor: '#050505', minHeight: '100vh', textAlign: 'center', color: '#fff', fontFamily: "'Inter', sans-serif" },
  loadingOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(5, 5, 5, 0.98)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999, backdropFilter: 'blur(12px)' },
  spinner: { width: '50px', height: '50px', border: '5px solid rgba(255, 60, 60, 0.1)', borderTop: '5px solid #ff3c3c', borderRadius: '50%' },
  header: { marginBottom: '60px' },
  title: { fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', margin: 0, fontWeight: '900', textTransform: 'uppercase' },
  subtitle: { color: '#94a3b8', fontSize: '18px', marginTop: '15px', maxWidth: '800px', margin: '15px auto 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1250px', margin: '0 auto' },
  card: { backgroundColor: '#0f0f0f', borderRadius: '28px', padding: '40px 30px', textAlign: 'left', border: '1px solid #1a202c', transition: 'all 0.4s ease' },
  iconBox: { fontSize: '45px', marginBottom: '20px' },
  typeTag: { backgroundColor: 'rgba(255, 60, 60, 0.12)', color: '#ff3c3c', fontSize: '10px', fontWeight: '800', padding: '5px 12px', borderRadius: '6px', display: 'inline-block', marginBottom: '15px', textTransform: 'uppercase' },
  cardTitle: { fontSize: '24px', marginBottom: '12px', fontWeight: '700' },
  cardDesc: { color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px', height: '45px' },
  actionBtn: { display: 'block', backgroundColor: '#ff3c3c', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', textAlign: 'center', transition: '0.3s' },
  
  scrollContainer: {
    maxWidth: '1100px', margin: '0 auto', height: '60vh', overflowY: 'auto', padding: '25px', backgroundColor: 'rgba(15, 15, 15, 0.8)',
    borderRadius: '30px', border: '1px solid #1a202c', scrollbarWidth: 'thin', scrollbarColor: '#ff3c3c #0f0f0f'
  },
  listGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '15px' },
  channelBtn: {
    display: 'flex', alignItems: 'center', backgroundColor: '#0a0a0a', border: '1px solid #1a202c', borderRadius: '18px', padding: '16px',
    cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease'
  },
  btnIcon: { fontSize: '26px', marginRight: '15px' },
  btnTextContent: { flex: 1, display: 'flex', flexDirection: 'column' },
  btnName: { color: '#fff', fontSize: '15px', fontWeight: '700' },
  btnCat: { color: '#ff3c3c', fontSize: '10px', textTransform: 'uppercase', fontWeight: '900' },
  arrow: { color: '#334155' },
  footerNote: { marginTop: '100px', padding: '30px', color: '#475569', fontSize: '15px', borderTop: '1px solid #1e293b' }
};

export default WorldFilm;