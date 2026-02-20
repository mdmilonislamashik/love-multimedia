import React, { useState, useEffect } from 'react';

const ProjectShowcase = () => {
  const [hue, setHue] = useState(0);

  // অটোমেটিক কালার চেঞ্জিং এফেক্ট (আগের থিমের সাথে মিল রাখার জন্য)
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const dynamicColor = `hsla(${hue}, 80%, 60%, 1)`;

  const projects = [
    { id: 1, title: 'Video Production', desc: 'High quality cinematic edits', icon: '🎬' },
    { id: 2, title: 'Graphic Design', desc: 'Creative social media posters', icon: '🎨' },
    { id: 3, title: 'VFX & Motion', desc: 'Professional visual effects', icon: '✨' },
    { id: 4, title: 'Content Strategy', desc: 'YouTube channel management', icon: '📈' }
  ];

  return (
    <div style={styles.container}>
      <h2 style={{ ...styles.sectionTitle, color: dynamicColor }}>ULM Premium Projects</h2>
      
      <div style={styles.projectGrid}>
        {projects.map((project) => (
          <div 
            key={project.id} 
            style={{ ...styles.projectCard3D, borderColor: `${dynamicColor}44` }}
            className="project-card"
          >
            <div style={{ ...styles.iconCircle, backgroundColor: `${dynamicColor}22`, color: dynamicColor }}>
              {project.icon}
            </div>
            <h3 style={styles.projectTitle}>{project.title}</h3>
            <p style={styles.projectDesc}>{project.desc}</p>
            
            <button style={{ ...styles.viewBtn, border: `1px solid ${dynamicColor}`, color: dynamicColor }}>
              View Details
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .project-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .project-card:hover {
          transform: translateY(-15px) rotateY(10deg);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          border-color: ${dynamicColor} !important;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: { 
    padding: '60px 20px', 
    backgroundColor: '#050505', 
    minHeight: '60vh', 
    textAlign: 'center', 
    fontFamily: "'Segoe UI', sans-serif" 
  },
  sectionTitle: { 
    fontSize: '32px', 
    marginBottom: '40px', 
    textTransform: 'uppercase', 
    letterSpacing: '3px',
    fontWeight: 'bold'
  },
  projectGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
    gap: '30px', 
    maxWidth: '1200px', 
    margin: '0 auto' 
  },
  projectCard3D: {
    backgroundColor: '#111',
    padding: '30px',
    borderRadius: '25px',
    border: '1px solid',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    position: 'relative',
    overflow: 'hidden'
  },
  iconCircle: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    margin: '0 auto 20px auto',
    boxShadow: 'inset 0 0 15px rgba(255,255,255,0.05)'
  },
  projectTitle: { color: '#fff', fontSize: '20px', marginBottom: '10px' },
  projectDesc: { color: '#888', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' },
  viewBtn: {
    padding: '8px 20px',
    borderRadius: '20px',
    backgroundColor: 'transparent',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s'
  }
};

export default ProjectShowcase;