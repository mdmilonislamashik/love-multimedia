import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Loading Component ---
const PageLoader = ({ text = "ULM Project Loading..." }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={styles.loaderWrapper}
  >
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      style={styles.spinner}
    />
    <p style={{ color: '#48bb78', marginTop: '15px', fontWeight: 'bold', letterSpacing: '1px' }}>
      {text}
    </p>
  </motion.div>
);

// --- Navbar Component ---
const Navbar = ({ onNavClick }) => {
  const navItems = ['Home', 'Projects', 'Pricing', 'Reviews', 'Contact'];

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <motion.div whileHover={{ scale: 1.05 }} style={styles.logo}>
          ULM<span style={{ color: '#48bb78' }}> Project</span>
        </motion.div>
        <ul style={styles.navLinks}>
          {navItems.map((item) => (
            <motion.li 
              key={item}
              whileHover={{ color: '#48bb78' }}
              style={styles.navItem}
              onClick={() => onNavClick(item)}
            >
              {item}
            </motion.li>
          ))}
        </ul>
        {/* Hire Me বাটন - এখানে Contact সেকশনে যাওয়ার ফাংশনটি যোগ করা হয়েছে */}
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#48bb78', color: '#0d1117' }}
          whileTap={{ scale: 0.95 }}
          style={styles.navBtn}
          onClick={() => onNavClick('Contact')} 
        >
          Hire Me
        </motion.button>
      </div>
    </nav>
  );
};

// --- Review Section ---
const Reviews = () => {
  const reviews = [
    { id: 1, name: "Zubayer Ahmed", role: "YouTuber", text: "অসাধারণ ভিডিও এডিটিং! আমার চ্যানেলের ভিউ অনেক বেড়েছে।", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Sarah Khan", role: "Business Owner", text: "আমার ই-কমার্স সাইটটি দেখতে এখন অনেক বেশি প্রফেশনাল। ধন্যবাদ!", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Tanvir Hossain", role: "App Developer", text: "UI/UX ডিজাইনগুলো ছিল জাস্ট মাইন্ড ব্লোয়িং!", avatar: "https://i.pravatar.cc/150?u=3" },
  ];

  return (
    <section id="reviews" style={{ padding: '80px 20px', backgroundColor: '#0d1117' }}>
      <h2 style={styles.sectionHeading}>Client <span style={{ color: '#48bb78' }}>Reviews</span></h2>
      <div style={styles.grid}>
        {reviews.map((rev) => (
          <motion.div key={rev.id} whileHover={{ y: -10 }} style={styles.reviewCard}>
            <img src={rev.avatar} alt={rev.name} style={styles.avatar} />
            <p style={styles.desc}>"{rev.text}"</p>
            <h4 style={{ color: '#f0f6fc', margin: '10px 0 0 0' }}>{rev.name}</h4>
            <span style={{ color: '#48bb78', fontSize: '13px' }}>{rev.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- Pricing Table ---
const Pricing = () => {
  const plans = [
    { title: "Basic", price: "$49", features: ["1 Video Edit", "Basic UI Design", "5 Revisions"] },
    { title: "Standard", price: "$99", features: ["3 Video Edits", "Web Development", "Unlimited Revisions"], featured: true },
    { title: "Premium", price: "$199", features: ["Full Branding", "Custom Web App", "24/7 Support"] },
  ];

  return (
    <section id="pricing" style={{ padding: '80px 20px', backgroundColor: '#161b22' }}>
      <h2 style={styles.sectionHeading}>My <span style={{ color: '#48bb78' }}>Pricing</span></h2>
      <div style={styles.grid}>
        {plans.map((plan) => (
          <motion.div 
            key={plan.title} 
            whileHover={{ scale: 1.03 }}
            style={{ ...styles.priceCard, borderColor: plan.featured ? '#48bb78' : '#30363d' }}
          >
            <h3 style={{ color: '#f0f6fc' }}>{plan.title}</h3>
            <h2 style={{ fontSize: '36px', color: '#48bb78' }}>{plan.price}</h2>
            <ul style={styles.featureList}>
              {plan.features.map(f => <li key={f} style={{ marginBottom: '10px' }}>{f}</li>)}
            </ul>
            <button style={plan.featured ? styles.priceBtnActive : styles.priceBtn}>Choose Plan</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- Contact Form ---
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`ধন্যবাদ ${formData.name}! ULM Project-এ আপনার মেসেজটি আমরা পেয়েছি।`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" style={{ padding: '80px 20px', backgroundColor: '#161b22' }}>
      <h2 style={styles.sectionHeading}>Get In <span style={{ color: '#48bb78' }}>Touch</span></h2>
      <div style={styles.contactWrapper}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" style={styles.input} value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" style={styles.input} value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" style={{ ...styles.input, height: '150px', resize: 'none' }} value={formData.message} onChange={handleChange} required />
          <motion.button whileHover={{ scale: 1.02, backgroundColor: '#3da368' }} whileTap={{ scale: 0.98 }} type="submit" style={styles.submitBtn}>
            Send Message
          </motion.button>
        </form>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.footerContent}>
      <p>© 2026 <span style={{ color: '#48bb78', fontWeight: 'bold' }}>ULM Project</span>. All rights reserved.</p>
      <div style={styles.socialIcons}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Facebook</a>
        <span style={{ color: '#30363d', margin: '0 10px' }}>|</span>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" style={styles.socialLink}>YouTube</a>
        <span style={{ color: '#30363d', margin: '0 10px' }}>|</span>
        <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.socialLink}>GitHub</a>
      </div>
    </div>
  </footer>
);

// --- Main MyProjects Component ---
const MyProjects = () => {
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("ULM Project Loading...");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (item) => {
    setLoadingText(`Redirecting to ${item}...`);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const id = item.toLowerCase();
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({ top: offsetTop, behavior: 'auto' });
      }
    }, 800);
  };

  const projectList = [
    { id: 1, category: "Video Editing", title: "Cinematic Travel Film", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500", description: "High-quality cinematic montage.", link: "https://youtube.com" },
    { id: 2, category: "Web Development", title: "E-commerce App", img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500", description: "Full-stack shopping site.", link: "https://github.com" },
    { id: 3, category: "UI/UX Design", title: "Food App UI", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500", description: "Modern interface design.", link: "https://behance.net" },
    { id: 4, category: "Multimedia", title: "Motion Graphics", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500", description: "Dynamic intro sequence.", link: "https://vimeo.com" },
  ];

  const categories = ['All', ...new Set(projectList.map(p => p.category))];
  const filteredProjects = filter === 'All' ? projectList : projectList.filter(p => p.category === filter);

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: '#e6edf3', fontFamily: "'Inter', sans-serif" }}>
      
      <AnimatePresence>
        {isLoading && <PageLoader text={loadingText} />}
      </AnimatePresence>

      <Navbar onNavClick={handleNavClick} />
      
      <main id="home">
        <section id="projects" style={styles.container}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h1 style={styles.heading}>Project <span style={{ color: '#48bb78' }}>Gallery</span></h1>
            <p style={styles.subText}>ULM Project-এর কিছু সেরা কাজ নিচে দেওয়া হলো।</p>
          </motion.div>

          <div style={styles.filterWrapper}>
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                style={{ 
                  ...styles.filterBtn, 
                  backgroundColor: filter === cat ? '#48bb78' : '#1a202c', 
                  color: filter === cat ? '#0d1117' : '#8b949e' 
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout style={styles.grid}>
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map(project => (
                <motion.div 
                  key={project.id} 
                  layout 
                  initial={{ scale: 0.9, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  exit={{ scale: 0.9, opacity: 0 }} 
                  style={styles.projectCard}
                >
                  <img src={project.img} alt={project.title} style={styles.projectImage} />
                  <div style={styles.content}>
                    <span style={styles.tag}>{project.category}</span>
                    <h3 style={styles.projectTitle}>{project.title}</h3>
                    <a href={project.link} target="_blank" rel="noreferrer" style={styles.viewBtn}>View Project ↗</a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <Pricing />
        <Reviews />
        <ContactForm />
      </main>
      
      <Footer />

      <style>{`
        body { margin: 0; }
        html { scroll-behavior: auto !important; }
        input:focus, textarea:focus { border-color: #48bb78 !important; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #48bb78; }
      `}</style>
    </div>
  );
};

// --- Styles (Unchanged) ---
const styles = {
  loaderWrapper: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: '#0d1117', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  spinner: { width: '50px', height: '50px', border: '5px solid #161b22', borderTop: '5px solid #48bb78', borderRadius: '50%' },
  navbar: { height: '70px', backgroundColor: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, padding: '0 20px' },
  navContainer: { maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: '#f0f6fc', fontSize: '22px', fontWeight: 'bold' },
  navLinks: { display: 'flex', listStyle: 'none', gap: '25px', cursor: 'pointer', padding: 0 },
  navItem: { color: '#8b949e', fontSize: '14px', transition: '0.3s' },
  navBtn: { backgroundColor: 'transparent', color: '#48bb78', border: '1px solid #48bb78', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  container: { padding: '80px 20px', textAlign: 'center' },
  heading: { fontSize: '42px', fontWeight: '800', marginBottom: '15px' },
  subText: { color: '#8b949e', marginBottom: '40px', fontSize: '18px' },
  filterWrapper: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '50px', flexWrap: 'wrap' },
  filterBtn: { padding: '10px 22px', borderRadius: '30px', border: 'none', cursor: 'pointer', transition: '0.3s', fontWeight: '600' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' },
  projectCard: { backgroundColor: '#161b22', borderRadius: '20px', border: '1px solid #30363d', overflow: 'hidden' },
  projectImage: { width: '100%', height: '220px', objectFit: 'cover' },
  content: { padding: '25px', textAlign: 'left' },
  tag: { color: '#48bb78', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' },
  projectTitle: { margin: '12px 0', fontSize: '22px', color: '#f0f6fc' },
  viewBtn: { color: '#48bb78', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #48bb78' },
  sectionHeading: { textAlign: 'center', fontSize: '36px', marginBottom: '60px', fontWeight: '800', color: '#f0f6fc' },
  reviewCard: { backgroundColor: '#161b22', padding: '40px', borderRadius: '25px', border: '1px solid #30363d', textAlign: 'center' },
  avatar: { width: '70px', height: '70px', borderRadius: '50%', marginBottom: '20px', border: '2px solid #48bb78' },
  priceCard: { backgroundColor: '#0d1117', padding: '50px 30px', borderRadius: '30px', border: '2px solid', textAlign: 'center' },
  featureList: { listStyle: 'none', padding: 0, color: '#8b949e', margin: '30px 0', lineHeight: '2' },
  priceBtn: { width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #48bb78', color: '#48bb78', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 'bold' },
  priceBtnActive: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#48bb78', color: '#0d1117', fontWeight: 'bold', cursor: 'pointer' },
  contactWrapper: { maxWidth: '600px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { backgroundColor: '#0d1117', border: '1px solid #30363d', padding: '15px', borderRadius: '10px', color: '#f0f6fc', fontSize: '16px', outline: 'none', transition: '0.3s' },
  submitBtn: { backgroundColor: '#48bb78', color: '#0d1117', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  footer: { padding: '50px 20px', textAlign: 'center', backgroundColor: '#0d1117', borderTop: '1px solid #30363d' },
  socialLink: { color: '#48bb78', textDecoration: 'none', fontWeight: '500' }
};

export default MyProjects;