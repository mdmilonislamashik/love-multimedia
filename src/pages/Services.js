import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // লোডিং হ্যান্ডলার
  const handleNavigation = (e, path) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(path);
    }, 1500);
  };

  const myServices = [
    { title: "Video Editing", desc: "Professional cinematic video editing and color grading.", icon: "🎬", link: "/projects", tag: "Hot" },
    { title: "Web Development", desc: "Building modern and responsive React applications.", icon: "⚛️", link: "/projects", tag: "Pro" },
    { title: "UI/UX Design", desc: "Creating user-friendly and eye-catching digital designs.", icon: "🎨", link: "/contact" },
    { title: "Multimedia Expert", desc: "Complete multimedia solutions for your brand.", icon: "🎥", link: "/multimedia" },
    { title: "Digital Marketing", desc: "Strategic social media marketing to boost your presence.", icon: "📈", link: "/contact" },
    { title: "Content Creation", desc: "Creative storytelling and scriptwriting solutions.", icon: "📝", link: "/multimedia" }
  ];

  const pricingPlans = [
    { plan: "Basic", price: "$49", features: ["Video Editing", "Basic Design", "24/7 Support"], link: "/contact", recommended: false },
    { plan: "Premium", price: "$99", features: ["Full Web App", "VFX Editing", "Priority Support"], link: "/contact", recommended: true },
  ];

  const testimonials = [
    { name: "John Doe", role: "CEO, TechFlow", comment: "The video editing quality exceeded my expectations. Highly recommended!", rating: "⭐⭐⭐⭐⭐" },
    { name: "Sifat Ahmed", role: "Youtuber", comment: "Incredible React development skills. My site is now super fast.", rating: "⭐⭐⭐⭐⭐" }
  ];

  const faqs = [
    { q: "আপনার কাজের ডেলিভারি সময় কত?", a: "প্রজেক্টের জটিলতা অনুযায়ী সাধারণত ৩ থেকে ৭ কর্মদিবসের মধ্যে আমরা ডেলিভারি দিয়ে থাকি।" },
    { q: "আমি কি কাস্টম প্যাকেজ নিতে পারি?", a: "হ্যাঁ! আপনার প্রয়োজন অনুযায়ী আমরা কাস্টম বাজেট এবং ফিচার সেট করে দিতে পারি।" },
    { q: "আফটার-সেলস সাপোর্ট কি পাওয়া যাবে?", a: "অবশ্যই। প্রিমিয়াম প্ল্যানে আমরা ৩ মাসের ফ্রি মেইনটেন্যান্স সাপোর্ট প্রদান করি।" }
  ];

  return (
    <div style={styles.container}>
      {/* Particles Effect Background */}
      <div style={styles.particlesWrapper}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.5, 0],
              x: Math.random() * 200 - 100
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            style={{
              ...styles.particle,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.loadingOverlay}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={styles.spinner} />
            <p style={{ color: '#48bb78', marginTop: '15px', fontWeight: 'bold' }}>Loading Experience...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Heading Section */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <h1 style={styles.heading}>Our <span style={styles.highlightText}>Services</span></h1>
        <p style={styles.subText}>আমরা সৃজনশীলতা এবং আধুনিক প্রযুক্তির সমন্বয়ে আপনার ব্র্যান্ডকে দিই এক নতুন মাত্রা।</p>
      </motion.div>

      {/* Service Grid with 3D Hover & Depth */}
      <div style={styles.grid}>
        {myServices.map((service, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05, z: 50 }}
            style={styles.card}
          >
            {service.tag && <span style={styles.tag}>{service.tag}</span>}
            <div style={styles.iconBox}>{service.icon}</div>
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <p style={styles.cardDesc}>{service.desc}</p>
            <a href={service.link} onClick={(e) => handleNavigation(e, service.link)} style={styles.cardLink}>Explore Details →</a>
          </motion.div>
        ))}
      </div>

      <div style={styles.divider}></div>

      {/* Comparison Table */}
      <h2 style={styles.heading}>Plan <span style={{ color: '#718096' }}>Comparison</span></h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr><th style={styles.th}>Features</th><th style={styles.th}>Basic</th><th style={styles.th}>Premium</th></tr>
          </thead>
          <tbody>
            <tr><td style={styles.td}>Video Editing</td><td style={styles.td}>Standard</td><td style={styles.td}>4K & VFX</td></tr>
            <tr><td style={styles.td}>Revisions</td><td style={styles.td}>2 Times</td><td style={styles.td}>Unlimited</td></tr>
            <tr><td style={styles.td}>Delivery Time</td><td style={styles.td}>5 Days</td><td style={styles.td}>2 Days</td></tr>
          </tbody>
        </table>
      </div>

      <div style={styles.divider}></div>

      {/* Pricing Section with Depth */}
      <h2 style={styles.heading}>Service <span style={{ color: '#718096' }}>Tiers</span></h2>
      <div style={styles.pricingGrid}>
        {pricingPlans.map((item, index) => (
          <motion.div key={index} whileHover={{ y: -15, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }} style={{...styles.priceCard, borderColor: item.recommended ? '#48bb78' : '#30363d'}}>
            {item.recommended && <div style={styles.popularBadge}>Most Popular</div>}
            <h4 style={styles.planName}>{item.plan}</h4>
            <h2 style={styles.priceTag}>{item.price}</h2>
            <ul style={styles.featureList}>
              {item.features.map((f, i) => (
                <li key={i} style={styles.featureItem}><span style={styles.checkMark}>✓</span> {f}</li>
              ))}
            </ul>
            <a href={item.link} onClick={(e) => handleNavigation(e, item.link)} style={{...styles.priceBtn, background: item.recommended ? 'linear-gradient(135deg, #48bb78, #2f855a)' : '#2d3748'}}>Get Started</a>
          </motion.div>
        ))}
      </div>

      <div style={styles.divider}></div>

      {/* Testimonial Section */}
      <h2 style={styles.heading}>What Clients <span style={{ color: '#48bb78' }}>Say</span></h2>
      <div style={styles.testimonialGrid}>
        {testimonials.map((t, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={styles.testimonialCard}>
            <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"{t.comment}"</p>
            <h4 style={{ color: '#fff' }}>{t.name}</h4>
            <p style={{ fontSize: '12px', color: '#48bb78' }}>{t.role}</p>
            <div style={{ marginTop: '10px' }}>{t.rating}</div>
          </motion.div>
        ))}
      </div>

      <div style={styles.divider}></div>

      {/* FAQ Section */}
      <h2 style={styles.heading}>Common <span style={{ color: '#718096' }}>Questions</span></h2>
      <div style={styles.faqWrapper}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
            <div style={styles.faqQuestion}>
              {faq.q}
              <span style={{ transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s' }}>▼</span>
            </div>
            <AnimatePresence>
              {activeFaq === index && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={styles.faqAnswer}>
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <h2 style={styles.highlightText}>Love Multimedia</h2>
            <p>Bringing your ideas to life with modern technology.</p>
          </div>
          <div style={styles.footerLinks}>
            <a href="/" onClick={(e) => handleNavigation(e, '/')} style={styles.fLink}>Home</a>
            <a href="/projects" onClick={(e) => handleNavigation(e, '/projects')} style={styles.fLink}>Projects</a>
            <a href="/contact" onClick={(e) => handleNavigation(e, '/contact')} style={styles.fLink}>Contact</a>
          </div>
        </div>
        <div style={styles.copyright}>© 2026 Love Multimedia. All rights reserved.</div>
      </footer>
    </div>
  );
};

const styles = {
  container: { position: 'relative', padding: '100px 0 0', textAlign: 'center', backgroundColor: '#0a0b0e', color: '#8b949e', perspective: '1200px', overflow: 'hidden' },
  particlesWrapper: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' },
  particle: { position: 'absolute', background: 'rgba(72, 187, 120, 0.3)', borderRadius: '50%', bottom: -10 },
  loadingOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 11, 14, 0.98)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999, backdropFilter: 'blur(15px)' },
  spinner: { width: '50px', height: '50px', border: '5px solid rgba(72, 187, 120, 0.1)', borderTop: '5px solid #48bb78', borderRadius: '50%' },
  heading: { position: 'relative', zIndex: 1, fontSize: '48px', marginBottom: '20px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1.5px', textShadow: '0 10px 20px rgba(0,0,0,0.3)' },
  highlightText: { color: '#48bb78', background: 'linear-gradient(to right, #48bb78, #81e6d9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' },
  subText: { position: 'relative', zIndex: 1, color: '#94a3b8', fontSize: '17px', maxWidth: '650px', margin: '0 auto 80px', lineHeight: '1.8' },
  grid: { position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '35px', maxWidth: '1200px', margin: '0 auto', padding: '20px' },
  card: { position: 'relative', backgroundColor: 'rgba(30, 30, 35, 0.6)', backdropFilter: 'blur(12px)', padding: '50px 30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transformStyle: 'preserve-3d', transition: 'transform 0.5s ease' },
  tag: { position: 'absolute', top: '20px', right: '20px', background: 'linear-gradient(135deg, #48bb78, #22543d)', color: '#fff', padding: '5px 15px', borderRadius: '30px', fontSize: '12px', fontWeight: 'bold' },
  iconBox: { fontSize: '50px', marginBottom: '25px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', width: '100px', height: '100px', lineHeight: '100px', borderRadius: '50%', margin: '0 auto 20px', transform: 'translateZ(30px)' },
  cardTitle: { color: '#f8fafc', fontSize: '24px', marginBottom: '15px', fontWeight: '700', transform: 'translateZ(20px)' },
  cardDesc: { color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px' },
  cardLink: { color: '#48bb78', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  divider: { position: 'relative', zIndex: 1, margin: '100px auto', width: '120px', height: '4px', borderRadius: '10px', background: 'linear-gradient(90deg, transparent, #48bb78, transparent)', opacity: '0.5' },
  tableWrapper: { position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', overflowX: 'auto', padding: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#0f172a', borderRadius: '15px', overflow: 'hidden', border: '1px solid #1e293b' },
  th: { padding: '20px', backgroundColor: '#1e293b', color: '#fff' },
  td: { padding: '20px', borderBottom: '1px solid #1e293b', color: '#94a3b8' },
  pricingGrid: { position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '50px' },
  priceCard: { position: 'relative', backgroundColor: '#0f172a', padding: '50px 40px', borderRadius: '30px', border: '2px solid #1e293b', width: '300px', transition: 'all 0.4s' },
  popularBadge: { position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #48bb78, #38a169)', color: '#fff', padding: '6px 20px', borderRadius: '50px', fontSize: '13px', fontWeight: 'bold' },
  planName: { color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '14px' },
  priceTag: { fontSize: '50px', color: '#ffffff', margin: '15px 0', fontWeight: '800' },
  featureList: { listStyle: 'none', padding: 0, margin: '40px 0', textAlign: 'left' },
  featureItem: { marginBottom: '15px', color: '#cbd5e1', display: 'flex', alignItems: 'center' },
  checkMark: { color: '#48bb78', marginRight: '12px' },
  priceBtn: { display: 'block', padding: '15px 25px', color: '#fff', borderRadius: '15px', textDecoration: 'none', fontWeight: '800' },
  testimonialGrid: { position: 'relative', zIndex: 1, display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' },
  testimonialCard: { backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222', width: '300px' },
  faqWrapper: { position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto', textAlign: 'left' },
  faqItem: { backgroundColor: '#0f172a', marginBottom: '15px', borderRadius: '12px', border: '1px solid #1e293b', cursor: 'pointer' },
  faqQuestion: { padding: '20px', color: '#fff', display: 'flex', justifyContent: 'space-between' },
  faqAnswer: { padding: '0 20px 20px', color: '#94a3b8' },
  footer: { position: 'relative', zIndex: 1, marginTop: '100px', backgroundColor: '#0a0b0e', padding: '60px 20px 20px', borderTop: '1px solid #1e293b' },
  footerContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' },
  footerBrand: { textAlign: 'left', minWidth: '250px' },
  footerLinks: { display: 'flex', gap: '30px' },
  fLink: { color: '#94a3b8', textDecoration: 'none', transition: '0.3s', cursor: 'pointer' },
  copyright: { borderTop: '1px solid #1e293b', paddingTop: '20px', fontSize: '14px' }
};

export default Services;