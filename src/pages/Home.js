import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// কম্পোনেন্ট ইমপোর্ট
import ProjectShowcase from '../ProjectShowcase';
// লোগোটি এখানে ইমপোর্ট করা হলো
import logo from '../assets/logo.png'; 

const Home = () => {
  const navigate = useNavigate();

  // ইমপোর্ট করা লোগোটি profileImg ভেরিয়েবলে সেট করা হলো
  const profileImg = logo; 

  // --- States ---
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState('');
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [comets, setComets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showUFO, setShowUFO] = useState(false);

  // Favicon and Title update
  useEffect(() => {
    document.title = "Unfinished Love Multimedia"; 
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = profileImg;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, [profileImg]);

  const words = useMemo(() => [
    "Multimedia Expert 🎬", "React Developer ❤", 
    "Video Editor 🎥", "UI/UX Designer 🎨"
  ], []);

  // Greeting Logic
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning 🌤️');
    else if (hour < 17) setGreeting('Good Afternoon ☀️');
    else if (hour < 21) setGreeting('Good Evening 🌆');
    else setGreeting('Good Night 🌙');
  }, [time]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 35,
      y: (e.clientY / window.innerHeight - 0.5) * 35
    });
  }, []);

  // Typing Effect Logic
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];
      
      setText(prev => 
        isDeleting 
          ? fullText.substring(0, prev.length - 1) 
          : fullText.substring(0, prev.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 120);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  // Space Animations Logic
  useEffect(() => {
    const clock = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    
    const cometTimer = setInterval(() => {
      const id = Date.now();
      setComets(prev => [...prev, { id, top: Math.random() * 80 + '%', left: '-20%' }]);
      setTimeout(() => setComets(prev => prev.filter(c => c.id !== id)), 10000);
    }, 12000);

    const asteroidTimer = setInterval(() => {
      const id = Date.now();
      const colors = ['#3d3d3d', '#2c3e50', '#1a1a1a'];
      const size = Math.random() * 70 + 50; 
      setAsteroids(prev => [...prev, {
        id, 
        top: Math.random() * 100 + '%', 
        left: '-30%',
        size: size + 'px', 
        color: colors[Math.floor(Math.random() * colors.length)],
        dur: Math.random() * 20 + 30 + 's' 
      }]);
      setTimeout(() => setAsteroids(prev => prev.filter(a => a.id !== id)), 45000);
    }, 15000);

    const ufoTimer = setInterval(() => {
      setShowUFO(true);
      setTimeout(() => setShowUFO(false), 8000);
    }, 20000);

    return () => { 
      clearInterval(clock); 
      clearInterval(cometTimer); 
      clearInterval(asteroidTimer); 
      clearInterval(ufoTimer);
    };
  }, []);

  const planets = [
    { n: "MERCURY", c: "#A5A5A5", s: 6, o: 100, sp: "5s" },
    { n: "VENUS", c: "#E3BB76", s: 10, o: 130, sp: "8s" },
    { n: "EARTH", c: "#2271B3", s: 11, o: 170, sp: "12s", m: true },
    { n: "MARS", c: "#E27B58", s: 8, o: 210, sp: "16s" },
    { n: "JUPITER", c: "#D39C7E", s: 28, o: 290, sp: "25s" },
    { n: "SATURN", c: "#C5AB6E", s: 24, o: 360, sp: "35s", r: true },
    { n: "URANUS", c: "#BBE1E4", s: 16, o: 430, sp: "45s" },
    { n: "NEPTUNE", c: "#6081FF", s: 16, o: 500, sp: "55s" },
  ];

  return (
    <div onMouseMove={handleMouseMove} style={styles.container} className="main-container-mobile">
      
      <div style={{...styles.nebulaBlue, transform: `translate(${mousePos.x}px, ${mousePos.y}px)`}}></div>
      <div style={{...styles.nebulaPurple, transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`}}></div>

      {showUFO && (
        <div className="ufo-3d">
          <div className="ufo-body">
            <div className="ufo-top"></div>
            <div className="ufo-lights">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      )}

      {asteroids.map(a => (
        <div key={a.id} className="asteroid-3d" style={{
          top: a.top, left: a.left, width: a.size, height: a.size, 
          background: `radial-gradient(circle at 30% 30%, ${a.color}, #000)`,
          animationDuration: a.dur, 
          boxShadow: `inset -10px -10px 25px rgba(0,0,0,0.9)`
        }} />
      ))}

      {comets.map(c => <div key={c.id} className="comet-3d" style={{top: c.top}} />)}

      <div style={styles.topWrapper} className="top-wrapper-mobile">
        <div style={styles.glassHeader}>
          <div style={styles.logoBadge}><img src={profileImg} alt="logo" style={styles.miniAvatar} /></div>
          <div>
            <span style={styles.subGreet}>{greeting}</span>
            <h2 style={styles.mainGreet}>মিলন ভাই! 🚀</h2>
          </div>
        </div>

        <div style={styles.headerRight} className="header-right-mobile">
          <div className="time-3d time-val-mobile" style={styles.timeVal}>{time}</div>
          <div style={styles.stationLabel}>UNFINISHED LOVE MULTIMEDIA • UTC+6</div>
        </div>
      </div>

      <div style={styles.mainContent} className="main-content-mobile">
        
        {/* 🪐 3D Solar System */}
        <div style={styles.universeContainer} className="universe-container-mobile">
          <div style={styles.sun}></div>
          {planets.map((p, i) => (
            <div key={i} style={{...styles.orbit, width: p.o, height: p.o, animationDuration: p.sp}}>
              <div 
                className="planet-3d-effect" 
                style={{
                  ...styles.planet, 
                  width: p.s, 
                  height: p.s, 
                  backgroundColor: p.c, 
                  boxShadow: `0 0 15px ${p.c}`,
                  animationDuration: p.sp,
                  animationDirection: 'reverse'
                }}
              >
                {p.m && <div className="moon-orbit"><div className="moon"></div></div>}
                {p.r && <div className="saturn-ring"></div>}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.profileSection} className="profile-section-mobile">
          <div style={styles.smartGlass}>
            <div style={styles.avatarWrapper}>
              <div style={styles.profileIcon}><img src={profileImg} alt="Milon Islam" style={styles.fullAvatar} /></div>
              <div className="status-pulse"></div>
            </div>
            <h1 style={styles.profileName}>Milon Islam</h1>
            <div style={styles.divider}></div>
            <p style={styles.typewriterBox}>I am a <br/><span style={styles.highlightText}>{text}</span><span className="blinking-cursor">_</span></p>
            
            <button onClick={() => navigate('/personal')} className="system-btn">
              <span className="btn-text">SYSTEM ACCESS 📂</span>
              <div className="scan-line"></div>
            </button>
          </div>
        </div>
      </div>

      {/* --- 🚀 Project Showcase Section Added Here --- */}
      <div style={styles.showcaseWrapper}>
        <ProjectShowcase />
      </div>

      <style>{`
        /* --- Mobile Responsive Fixes --- */
        @media (max-width: 768px) {
          .main-container-mobile {
            overflow-y: auto !important;
            height: auto !important;
          }
          .top-wrapper-mobile {
            flex-direction: column !important;
            align-items: center !important;
            padding: 20px !important;
            gap: 15px;
          }
          .header-right-mobile {
            align-items: center !important;
          }
          .time-val-mobile {
            font-size: 32px !important;
          }
          .main-content-mobile {
            flex-direction: column !important;
            height: auto !important;
            gap: 20px !important;
            padding-bottom: 50px;
          }
          .universe-container-mobile {
            width: 300px !important;
            height: 300px !important;
            transform: scale(0.85);
            margin: 20px 0;
          }
          .profile-section-mobile {
            width: 90% !important;
            margin: 0 auto;
          }
        }

        /* 3D Orbit Animation */
        @keyframes orbit { 
          from { transform: rotateX(75deg) rotateZ(0deg); } 
          to { transform: rotateX(75deg) rotateZ(360deg); } 
        }

        @keyframes maintainSide {
          from { transform: translateY(-50%) rotateX(-75deg) rotateZ(360deg); }
          to { transform: translateY(-50%) rotateX(-75deg) rotateZ(0deg); }
        }

        .planet-3d-effect {
          background-image: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(0,0,0,0.2));
          animation: maintainSide linear infinite;
          transform-style: preserve-3d;
        }

        @keyframes drift { 0% { left: -30%; transform: rotate(0deg); } 100% { left: 130%; transform: rotate(360deg); } }
        @keyframes cometFlow { 0% { left: -20%; opacity: 0; } 20% { opacity: 1; } 100% { left: 130%; opacity: 0; } }
        @keyframes scanning { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        @keyframes ufoPath {
          0% { left: -10%; top: 20%; transform: scale(0.5) rotate(10deg); }
          50% { left: 50%; top: 60%; transform: scale(1.2) rotate(-10deg); }
          100% { left: 110%; top: 30%; transform: scale(0.5) rotate(10deg); }
        }

        .ufo-3d { position: absolute; z-index: 100; animation: ufoPath 8s ease-in-out infinite; perspective: 1000px; }
        .ufo-body { width: 80px; height: 30px; border-radius: 50%; position: relative; background: radial-gradient(ellipse at top, #888, #222); box-shadow: inset 0 -5px 15px rgba(0,0,0,0.5), 0 10px 20px rgba(0,242,255,0.2); }
        .ufo-top { width: 40px; height: 25px; background: rgba(0, 242, 255, 0.3); border: 1px solid rgba(0, 242, 255, 0.6); border-radius: 50% 50% 10% 10%; position: absolute; top: -12px; left: 20px; backdrop-filter: blur(5px); }
        .ufo-lights { display: flex; justify-content: space-around; position: absolute; width: 100%; bottom: 5px; }
        .ufo-lights span { width: 6px; height: 6px; background: #00f2ff; border-radius: 50%; box-shadow: 0 0 10px #00f2ff; animation: blink 0.5s infinite alternate; }

        .asteroid-3d { position: absolute; border-radius: 30% 70% 50% 50% / 30% 30% 70% 70%; z-index: 1; animation: drift linear infinite; }
        .comet-3d { position: absolute; width: 200px; height: 1px; background: linear-gradient(to right, #fff, transparent); animation: cometFlow 8s linear forwards; z-index: 2; }
        .comet-3d::before { content: ''; position: absolute; width: 4px; height: 4px; background: #fff; border-radius: 50%; top: -2px; left: 0; box-shadow: 0 0 15px #fff, 0 0 30px #00f2ff; }
        
        .moon-orbit { position: absolute; width: 25px; height: 25px; top: -10px; left: -10px; animation: orbit 3s linear infinite; }
        .moon { width: 4px; height: 4px; background: #ddd; border-radius: 50%; }
        .saturn-ring { position: absolute; width: 160%; height: 40%; border: 1.5px solid rgba(197, 171, 110, 0.6); border-radius: 50%; top: 30%; left: -30%; transform: rotateX(75deg); }
        
        .status-pulse { position: absolute; bottom: 12px; right: 12px; width: 18px; height: 18px; background: #00ff00; border-radius: 50%; border: 3px solid #000; box-shadow: 0 0 15px #00ff00; }
        .status-pulse::after { content: ''; position: absolute; width: 100%; height: 100%; background: inherit; border-radius: 50%; animation: pulse 2s infinite; }

        .blinking-cursor { color: #00f2ff; animation: blink 0.8s infinite; }
        .time-3d { background: linear-gradient(180deg, #fff, #00f2ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .system-btn { 
          position: relative; width: 100%; padding: 15px; background: rgba(0, 242, 255, 0.05); border: 1px solid #00f2ff; 
          color: #00f2ff; font-weight: bold; border-radius: 8px; cursor: pointer; overflow: hidden; transition: 0.3s; letter-spacing: 1px; 
        }
        .system-btn:hover { background: rgba(0, 242, 255, 0.15); box-shadow: 0 0 20px rgba(0, 242, 255, 0.4); }
        .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: #00f2ff; box-shadow: 0 0 15px #00f2ff; animation: scanning 2s linear infinite; opacity: 0.5; }
      `}</style>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#000000', minHeight: '100vh', overflowX: 'hidden', position: 'relative', color: '#fff', fontFamily: "'Segoe UI', sans-serif" },
  nebulaBlue: { position: 'absolute', width: '1200px', height: '1200px', background: 'radial-gradient(circle, rgba(0,242,255,0.08) 0%, transparent 70%)', top: '-25%', left: '-25%', zIndex: 1, filter: 'blur(60px)', pointerEvents: 'none' },
  nebulaPurple: { position: 'absolute', width: '1200px', height: '1200px', background: 'radial-gradient(circle, rgba(124,77,255,0.08) 0%, transparent 70%)', bottom: '-25%', right: '-25%', zIndex: 1, filter: 'blur(60px)', pointerEvents: 'none' },
  topWrapper: { position: 'relative', zIndex: 10, padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' },
  glassHeader: { display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '12px 28px', borderRadius: '50px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' },
  logoBadge: { width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #00f2ff', overflow: 'hidden' },
  miniAvatar: { width: '100%', height: '100%', objectFit: 'cover' },
  subGreet: { fontSize: '12px', color: '#888' },
  mainGreet: { fontSize: '24px', margin: 0, fontWeight: 'bold' },
  timeVal: { fontSize: '48px', fontWeight: 'bold', margin: 0, fontFamily: 'monospace' },
  stationLabel: { fontSize: '9px', color: '#7c4dff', letterSpacing: '2px' },
  mainContent: { display: 'flex', justifyContent: 'center', gap: '80px', alignItems: 'center', minHeight: '65vh', position: 'relative', zIndex: 5 },
  
  universeContainer: { 
    position: 'relative', 
    width: '600px', 
    height: '600px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    perspective: '1200px',
    transformStyle: 'preserve-3d'
  },
  sun: { 
    width: '75px', 
    height: '75px', 
    borderRadius: '50%', 
    background: 'radial-gradient(circle, #ffeb3b, #f57c00)', 
    boxShadow: '0 0 60px rgba(255,152,0,0.8)',
    position: 'absolute',
    zIndex: 10,
    transform: 'rotateX(-20deg)'
  },
  orbit: { 
    position: 'absolute', 
    border: '1.5px solid rgba(255,255,255,0.12)', 
    borderRadius: '50%', 
    animation: 'orbit linear infinite',
    transformStyle: 'preserve-3d'
  },
  planet: { 
    position: 'absolute', 
    top: '50%', 
    left: '-5px', 
    borderRadius: '50%', 
    transform: 'translateY(-50%)' 
  },

  profileSection: { width: '360px' },
  smartGlass: { background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(40px)', padding: '45px 35px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
  avatarWrapper: { position: 'relative', width: '130px', height: '130px', margin: '0 auto 25px' },
  profileIcon: { width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #00f2ff', overflow: 'hidden' },
  fullAvatar: { width: '100%', height: '100%', objectFit: 'cover' },
  profileName: { fontSize: '30px', margin: 0, fontWeight: 'bold' },
  divider: { height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,242,255,0.3), transparent)', margin: '20px 0' },
  highlightText: { color: '#00f2ff', fontWeight: 'bold', fontSize: '20px' },
  typewriterBox: { height: '60px', fontSize: '18px' },

  // Showcase Section Style
  showcaseWrapper: {
    position: 'relative',
    zIndex: 10,
    marginTop: '-50px', // মেন কন্টেন্টের সাথে একটু কাছে আনার জন্য
    paddingBottom: '100px'
  }
};

export default Home;