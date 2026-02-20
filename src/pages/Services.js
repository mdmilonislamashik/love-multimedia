import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const myServices = [
    { title: "Video Editing", desc: "Professional cinematic video editing and color grading.", icon: "🎬", link: "/projects" },
    { title: "Web Development", desc: "Building modern and responsive React applications.", icon: "⚛️", link: "/projects" },
    { title: "UI/UX Design", desc: "Creating user-friendly and eye-catching digital designs.", icon: "🎨", link: "/contact" },
    { title: "Multimedia Expert", desc: "Complete multimedia solutions for your brand.", icon: "🎥", link: "/multimedia" },
    { title: "Digital Marketing", desc: "Strategic social media marketing to boost your presence.", icon: "📈", link: "/contact" },
    { title: "Content Creation", desc: "Creative storytelling and scriptwriting solutions.", icon: "📝", link: "/multimedia" }
  ];

  const pricingPlans = [
    { plan: "Basic", price: "$49", features: ["Video Editing", "Basic Design", "24/7 Support"], link: "/contact" },
    { plan: "Premium", price: "$99", features: ["Full Web App", "VFX Editing", "Priority Support"], link: "/contact" },
  ];

  return (
    <div style={styles.container}>
      {/* হেডিং সেকশন */}
      <h1 style={styles.heading}>Our <span style={{ color: '#48bb78' }}>Services</span></h1>
      <p style={styles.subText}>আমরা চোখের আরাম এবং কাজের গুণমান উভয়কেই প্রাধান্য দিই।</p>

      {/* সার্ভিস গ্রিড */}
      <div style={styles.grid}>
        {myServices.map((service, index) => (
          <div key={index} style={styles.card} 
               onMouseOver={(e) => {
                 e.currentTarget.style.backgroundColor = '#1a1a1a';
                 e.currentTarget.style.borderColor = '#2d3748';
                 e.currentTarget.style.transform = 'translateY(-5px)';
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.backgroundColor = '#121212';
                 e.currentTarget.style.borderColor = '#1a202c';
                 e.currentTarget.style.transform = 'translateY(0)';
               }}>
            <div style={styles.icon}>{service.icon}</div>
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <p style={styles.cardDesc}>{service.desc}</p>
            <Link to={service.link} style={styles.cardLink}>Explore Details</Link>
          </div>
        ))}
      </div>

      <div style={styles.divider}></div>

      {/* Pricing Section */}
      <h2 style={styles.heading}>Service <span style={{ color: '#4a5568' }}>Tiers</span></h2>
      <div style={styles.pricingGrid}>
        {pricingPlans.map((item, index) => (
          <div key={index} style={styles.priceCard}
               onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <h4 style={{ color: '#a0aec0', marginBottom: '10px' }}>{item.plan}</h4>
            <h2 style={{ fontSize: '32px', color: '#cbd5e0' }}>{item.price}</h2>
            <ul style={styles.featureList}>
              {item.features.map((f, i) => <li key={i} style={{ marginBottom: '10px' }}>• {f}</li>)}
            </ul>
            <Link to={item.link} style={styles.priceBtn}>Get Started</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 10px',
    textAlign: 'center',
    backgroundColor: 'transparent', // App.js এর ব্যাকগ্রাউন্ড ব্যবহার করবে
    color: '#8b949e'
  },
  heading: {
    fontSize: '32px',
    marginBottom: '15px',
    fontWeight: '800',
    color: '#e6edf3',
    letterSpacing: '1px'
  },
  subText: {
    color: '#8b949e',
    marginBottom: '50px',
    fontSize: '15px',
    maxWidth: '500px',
    margin: '0 auto 50px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#121212',
    padding: '30px 20px',
    borderRadius: '15px',
    border: '1px solid #1a202c',
    transition: '0.3s ease',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
  },
  icon: {
    fontSize: '40px',
    marginBottom: '15px',
    opacity: '0.9'
  },
  cardTitle: {
    color: '#cbd5e0',
    fontSize: '20px',
    marginBottom: '10px'
  },
  cardDesc: {
    color: '#718096',
    fontSize: '13px',
    lineHeight: '1.6',
    marginBottom: '15px'
  },
  cardLink: {
    color: '#48bb78',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600'
  },
  divider: {
    margin: '60px auto',
    width: '60px',
    height: '2px',
    backgroundColor: '#2d3748'
  },
  pricingGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    flexWrap: 'wrap',
    marginTop: '30px'
  },
  priceCard: {
    backgroundColor: '#0d1117',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid #30363d',
    width: '240px',
    transition: '0.3s ease',
    boxShadow: '0 10px 20px rgba(0,0,0,0.4)'
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '25px 0',
    color: '#8b949e',
    textAlign: 'left',
    fontSize: '13px'
  },
  priceBtn: {
    display: 'inline-block',
    padding: '10px 25px',
    backgroundColor: '#238636',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '13px',
    transition: '0.2s'
  }
};

export default Services;