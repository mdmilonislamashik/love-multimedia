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
      {/* হেডিং সেকশন - সফট কালার */}
      <h1 style={styles.heading}>Our <span style={{ color: '#48bb78' }}>Services</span></h1>
      <p style={styles.subText}>আমরা চোখের আরাম এবং কাজের গুণমান উভয়কেই প্রাধান্য দিই।</p>

      {/* সার্ভিস গ্রিড */}
      <div style={styles.grid}>
        {myServices.map((service, index) => (
          <div key={index} style={styles.card} 
               onMouseOver={(e) => {
                 e.currentTarget.style.backgroundColor = '#1a1a1a';
                 e.currentTarget.style.borderColor = '#2d3748';
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.backgroundColor = '#121212';
                 e.currentTarget.style.borderColor = '#1a202c';
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
          <div key={index} style={styles.priceCard}>
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
    padding: '60px 20px',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: '#0d1117', // Deep Dark Navy - চোখের জন্য ভালো
    color: '#8b949e' // হালকা অ্যাশ কালার টেক্সট
  },
  heading: {
    fontSize: '36px',
    marginBottom: '15px',
    fontWeight: '800',
    color: '#e6edf3', // একদম সাদা নয়, কিছুটা সফট হোয়াইট
    letterSpacing: '1px'
  },
  subText: {
    color: '#8b949e',
    marginBottom: '60px',
    fontSize: '16px',
    maxWidth: '600px',
    margin: '0 auto 60px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#121212', // Deep Matte Black
    padding: '40px 30px',
    borderRadius: '15px',
    border: '1px solid #1a202c', // খুব সূক্ষ্ম বর্ডার
    transition: '0.3s ease',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
  },
  icon: {
    fontSize: '45px',
    marginBottom: '20px',
    opacity: '0.8'
  },
  cardTitle: {
    color: '#cbd5e0',
    fontSize: '22px',
    marginBottom: '12px'
  },
  cardDesc: {
    color: '#718096',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  cardLink: {
    color: '#48bb78', // সফট গ্রিন
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600'
  },
  divider: {
    margin: '80px auto',
    width: '100px',
    height: '2px',
    backgroundColor: '#1a202c'
  },
  pricingGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap'
  },
  priceCard: {
    backgroundColor: '#0d1117',
    padding: '40px',
    borderRadius: '20px',
    border: '1px solid #30363d',
    width: '260px',
    transition: 'transform 0.3s ease'
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '30px 0',
    color: '#8b949e',
    textAlign: 'left',
    fontSize: '14px'
  },
  priceBtn: {
    display: 'inline-block',
    padding: '10px 30px',
    backgroundColor: '#238636', // ডার্ক গ্রিন বাটন
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px'
  }
};

export default Services;