import React, { useState, useEffect, useMemo } from 'react';

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState('');
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [comets, setComets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const words = useMemo(() => [
    "Multimedia Expert 🎬", "React Developer ⚛️", 
    "Video Editor 🎥", "UI/UX Designer 🎨"
  ], []);

  // ডাইনামিক গ্রিটিং
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning 🌤️');
    else if (hour < 17) setGreeting('Good Afternoon ☀️');
    else if (hour < 21) setGreeting('Good Evening 🌆');
    else setGreeting('Good Night 🌙');
  }, [time]);

  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    });
  };

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 50 : 120);
      if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && text === '') { setIsDeleting(false); setLoopNum(loopNum + 1); }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  useEffect(() => {
    const clock = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    
    // ধুমকেতু জেনারেটর
    const cometTimer = setInterval(() => {
      const id = Date.now();
      setComets(prev => [...prev, { id, top: Math.random() * 40 + '%', dur: '10s' }]);
      setTimeout(() => setComets(prev => prev.filter(c => c.id !== id)), 10500);
    }, 12000);

    // ৩ডি অ্যাস্টেরয়েড জেনারেটর
    const asteroidTimer = setInterval(() => {
      const id = Date.now();
      const colors = ['#5d4037', '#455a64', '#263238', '#4e342e'];
      setAsteroids(prev => [...prev, {
        id,
        top: Math.random() * 100 + '%',
        left: Math.random() > 0.5 ? '-10%' : '110%',
        size: Math.random() * 60 + 40 + 'px',
        color: colors[Math.floor(Math.random() * colors.length)],
        dur: Math.random() * 15 + 10 + 's',
        rot: Math.random() * 360 + 'deg'
      }]);
      setTimeout(() => setAsteroids(prev => prev.filter(a => a.id !== id)), 25000);
    }, 6000);

    return () => { clearInterval(clock); clearInterval(cometTimer); clearInterval(asteroidTimer); };
  }, []);

  const planets = [
    { n: "MERCURY", c: "#A5A5A5", s: 6, o: 90, sp: "5s" },
    { n: "VENUS", c: "#E3BB76", s: 10, o: 120, sp: "8s" },
    { n: "EARTH", c: "#2271B3", s: 11, o: 160, sp: "12s", m: true },
    { n: "MARS", c: "#E27B58", s: 8, o: 200, sp: "16s" },
    { n: "JUPITER", c: "#D39C7E", s: 28, o: 290, sp: "25s" },
    { n: "SATURN", c: "#C5AB6E", s: 24, o: 360, sp: "35s", r: true },
    { n: "URANUS", c: "#BBE1E4", s: 16, o: 420, sp: "45s" },
    { n: "NEPTUNE", c: "#6081FF", s: 16, o: 480, sp: "55s" },
  ];

  return (
    <div onMouseMove={handleMouseMove} style={styles.container}>
      {/* অসংখ্য তারা (Twinkling Stars) */}
      <div style={styles.starsLayer}></div>
      <div style={styles.starsLayerSlow}></div>

      {/* নেবুলা ক্লাউডস */}
      <div style={{...styles.nebulaBlue, transform: `translate(${mousePos.x}px, ${mousePos.y}px)`}}></div>
      <div style={{...styles.nebulaPurple, transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`}}></div>

      {/* বড় ধুমকেতু */}
      {comets.map(c => <div key={c.id} style={{...styles.bigComet, top: c.top, animationDuration: c.dur}} />)}

      {/* ৩ডি অ্যাস্টেরয়েড */}
      {asteroids.map(a => (
        <div key={a.id} style={{
          ...styles.asteroid, 
          top: a.top, 
          left: a.left, 
          width: a.size, 
          height: a.size, 
          backgroundColor: a.color,
          animationDuration: a.dur,
          transform: `rotate(${a.rot})`
        }} />
      ))}

      {/* হেডার */}
      <div style={styles.topWrapper}>
        <div style={styles.glassHeader}>
          <div style={styles.logoBadge}>MI</div>
          <div>
            <span style={styles.subGreet}>{greeting}</span>
            <h2 style={styles.mainGreet}>মিলন ভাই! 🚀</h2>
          </div>
        </div>
        <div style={styles.clockCard}>
          <div style={styles.timeVal}>{time}</div>
          <div style={styles.stationLabel}>MILON'S COSMOS • UTC+6</div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.universeContainer}>
          <div style={styles.sun}><div style={styles.sunCore}></div></div>
          <div style={styles.asteroidBelt}></div>
          {planets.map((p, i) => (
            <div key={i} style={{...styles.orbit, width: p.o, height: p.o, animationDuration: p.sp}}>
              <div style={{...styles.planet, width: p.s, height: p.s, backgroundColor: p.c, boxShadow: `0 0 15px ${p.c}aa`}}>
                {p.m && <div style={styles.moonOrbit}><div style={styles.moon}></div></div>}
                {p.r && <div style={styles.ring}></div>}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.profileSection}>
          <div style={styles.smartGlass}>
            <div style={styles.avatarWrapper}>
                <div style={styles.profileIcon}>M</div>
                <div style={styles.onlineStatus}></div>
            </div>
            <h1 style={styles.profileName}>Milon Islam</h1>
            <div style={styles.divider}></div>
            <p style={styles.typewriterBox}>
              I am a <br/>
              <span style={styles.highlightText}>{text}</span>
              <span style={styles.cursor}>_</span>
            </p>
            <button style={styles.cvBtn}>SYSTEM ACCESS 📂</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sunGlow { 0%, 100% { box-shadow: 0 0 60px #ff9800; transform: scale(1); } 50% { box-shadow: 0 0 100px #ff5722; transform: scale(1.05); } }
        @keyframes cometFly { 0% { right: -20%; opacity: 0; } 10% { opacity: 1; } 100% { right: 120%; opacity: 0; } }
        @keyframes asteroidDrift { 
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; } 
          10% { opacity: 1; }
          100% { transform: translate(110vw, 50vh) rotate(720deg); opacity: 0; } 
        }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes nebulaPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#010103', minHeight: '100vh', overflow: 'hidden', position: 'relative', color: '#fff', fontFamily: "'Segoe UI', Roboto, sans-serif" },
  
  // তারার লেয়ার
  starsLayer: { position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 150px 150px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 300px 100px, #fff, rgba(0,0,0,0))', backgroundSize: '350px 350px', animation: 'twinkle 4s infinite ease-in-out', zIndex: 0 },
  starsLayerSlow: { position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(1.5px 1.5px at 50px 80px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 250px 400px, #fff, rgba(0,0,0,0))', backgroundSize: '500px 500px', animation: 'twinkle 7s infinite reverse', zIndex: 0 },

  nebulaBlue: { position: 'absolute', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0,242,255,0.08) 0%, transparent 70%)', top: '-10%', left: '-10%', zIndex: 1, animation: 'nebulaPulse 8s infinite' },
  nebulaPurple: { position: 'absolute', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(124,77,255,0.08) 0%, transparent 70%)', bottom: '-10%', right: '-10%', zIndex: 1, animation: 'nebulaPulse 10s infinite reverse' },
  
  topWrapper: { position: 'relative', zIndex: 10, padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  glassHeader: { display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255,255,255,0.03)', padding: '15px 30px', borderRadius: '50px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' },
  logoBadge: { width: '45px', height: '45px', background: 'linear-gradient(45deg, #00f2ff, #7c4dff)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' },
  subGreet: { fontSize: '12px', color: '#00f2ff', letterSpacing: '2px', textTransform: 'uppercase' },
  mainGreet: { margin: 0, fontSize: '22px', fontWeight: '400' },

  clockCard: { textAlign: 'right' },
  timeVal: { fontSize: '36px', fontWeight: 'bold', letterSpacing: '2px' },
  stationLabel: { fontSize: '10px', color: '#7c4dff', letterSpacing: '3px' },

  mainContent: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '70vh', position: 'relative', zIndex: 5 },

  universeContainer: { position: 'relative', width: '550px', height: '550px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  sun: { width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, #ffeb3b, #f57c00)', zIndex: 5, animation: 'sunGlow 5s infinite ease-in-out' },
  orbit: { position: 'absolute', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '50%', animation: 'orbit linear infinite' },
  planet: { position: 'absolute', top: '50%', left: '-10px', borderRadius: '50%', transform: 'translateY(-50%)' },
  ring: { position: 'absolute', width: '240%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', top: '50%', left: '-70%', transform: 'rotateX(75deg)' },

  profileSection: { zIndex: 10 },
  smartGlass: { width: '360px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(30px)', padding: '50px 40px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
  avatarWrapper: { position: 'relative', width: '90px', height: '90px', margin: '0 auto 25px' },
  profileIcon: { width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', border: '2px solid #00f2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '35px', color: '#00f2ff' },
  onlineStatus: { position: 'absolute', bottom: '5px', right: '5px', width: '15px', height: '15px', background: '#00ff00', borderRadius: '50%', border: '3px solid #020205' },
  profileName: { fontSize: '32px', margin: 0, fontWeight: '700' },
  divider: { width: '40px', height: '3px', background: '#7c4dff', margin: '15px auto' },
  typewriterBox: { fontSize: '18px', color: '#ccc', height: '60px' },
  highlightText: { color: '#00f2ff', fontWeight: 'bold' },
  cursor: { color: '#00f2ff', animation: 'blink 0.8s infinite' },
  cvBtn: { width: '100%', marginTop: '20px', padding: '15px', background: 'transparent', border: '2px solid #00f2ff', color: '#00f2ff', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', textTransform: 'uppercase' },

  bigComet: { position: 'absolute', width: '300px', height: '2px', background: 'linear-gradient(to left, #00f2ff, transparent)', animation: 'cometFly linear forwards', zIndex: 2 },
  
  // ৩ডি অ্যাস্টেরয়েড স্টাইল
  asteroid: { position: 'absolute', borderRadius: '40% 60% 50% 50%', boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.8), 5px 5px 15px rgba(0,0,0,0.5)', animation: 'asteroidDrift linear forwards', zIndex: 2, opacity: 0 }
};

export default Home;