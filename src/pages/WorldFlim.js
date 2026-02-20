import React from 'react';

const WorldFilm = () => {
  const moviePlatforms = [
    { 
      name: "MovieBox PH", 
      type: "Premium HD", 
      desc: "Stream and download the latest global movies and trending series in high resolution.", 
      link: "https://moviebox.ph/", 
      icon: "📦" 
    },
    { 
      name: "MLWBD", 
      type: "Bangla Dubbed", 
      desc: "Top site for South Indian (Tamil/Telugu) and Hollywood movies dubbed in Bengali.", 
      link: "https://mlwbd.com", 
      icon: "🇧🇩" 
    },
    { 
      name: "Bolly4u", 
      type: "Hindi & Dual Audio", 
      desc: "Best platform for Bollywood Hindi movies and Dual Audio 4K/1080p downloads.", 
      link: "https://bolly4u.org", 
      icon: "🇮🇳" 
    },
    { 
      name: "Bioscope", 
      type: "Bengali Originals", 
      desc: "Watch Dhallywood movies, Natoks, and Indian Bengali content officially.", 
      link: "https://www.bioscopelive.com", 
      icon: "🎭" 
    },
    { 
      name: "YTS 4K", 
      type: "Ultra HD", 
      desc: "Download worldwide cinematic masterpieces in ultra-compressed 4K BluRay quality.", 
      link: "https://yts.mx", 
      icon: "💎" 
    },
    { 
      name: "Movie-Hut", 
      type: "Regional", 
      desc: "A great collection of Indian Bengali and Kolkata-based cinema and series.", 
      link: "https://movie-hut.com", 
      icon: "🎬" 
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Cinema <span style={{ color: '#ff3c3c' }}>Universe</span></h1>
        <p style={styles.subtitle}>
          The ultimate directory for 4K Movies, Bengali Dubbed Cinema, and Global Box Office Hits.
        </p>
      </div>

      {/* Movie Grid */}
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
            <a 
              href={site.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.actionBtn}
            >
              Access Platform ↗
            </a>
          </div>
        ))}
      </div>

      {/* Footer / Notice Section */}
      <div style={styles.footerNote}>
        <p>🎬 <b>Cinema Guide:</b> Use IDM or ADM downloader for faster 4K movie downloads from these links.</p>
        <p style={{marginTop: '10px', fontSize: '12px', opacity: 0.6}}>© {new Date().getFullYear()} WorldFilm Portfolio</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 20px',
    backgroundColor: '#050505',
    minHeight: '100vh',
    textAlign: 'center',
    fontFamily: "'Inter', sans-serif",
    color: '#fff'
  },
  header: {
    marginBottom: '60px'
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    margin: 0,
    fontWeight: '900',
    letterSpacing: '-1px',
    textTransform: 'uppercase'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '18px',
    marginTop: '15px',
    maxWidth: '800px',
    margin: '15px auto 0',
    lineHeight: '1.5'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1250px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#0f0f0f',
    borderRadius: '28px',
    padding: '40px 30px',
    textAlign: 'left',
    border: '1px solid #1a202c',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  iconBox: {
    fontSize: '45px',
    marginBottom: '20px'
  },
  typeTag: {
    backgroundColor: 'rgba(255, 60, 60, 0.12)',
    color: '#ff3c3c',
    fontSize: '10px',
    fontWeight: '800',
    padding: '5px 12px',
    borderRadius: '6px',
    display: 'inline-block',
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  cardTitle: {
    fontSize: '24px',
    marginBottom: '12px',
    fontWeight: '700',
    color: '#f8fafc'
  },
  cardDesc: {
    color: '#64748b',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '25px',
    height: '45px'
  },
  actionBtn: {
    display: 'block',
    backgroundColor: '#ff3c3c',
    color: '#fff',
    textDecoration: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '14px',
    textAlign: 'center',
    transition: '0.3s',
  },
  footerNote: {
    marginTop: '100px',
    padding: '30px',
    color: '#475569',
    fontSize: '15px',
    borderTop: '1px solid #1e293b',
    maxWidth: '700px',
    margin: '100px auto 0'
  }
};

export default WorldFilm;