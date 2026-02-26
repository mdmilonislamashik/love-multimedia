import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { Mail, Phone, Code, Video, Palette, Monitor } from 'lucide-react';
import profilePic from '../assets/logo.png';

const About = () => {
  const [language, setLanguage] = useState('bn');

  const content = {
    bn: {
      title: "মিলন ইসলাম",
      subtitle: "মাল্টিমিডিয়া এক্সপার্ট ও রিঅ্যাক্ট ডেভেলপার",
      intro: "আসসালামু আলাইকুম! আমি একজন প্যাশনেট মাল্টিমিডিয়া এক্সপার্ট এবং রিঅ্যাক্ট (React) ডেভেলপার। আমি প্রযুক্তির শৈল্পিক ছোঁয়ায় নতুন কিছু তৈরি করতে পছন্দ করি।",
      expTitle: "অভিজ্ঞতা",
      expText: "৩+ বছর মাল্টিমিডিয়া এবং ২ বছর ওয়েব ডেভেলপমেন্ট।",
      goalTitle: "লক্ষ্য",
      goalText: "আধুনিক ওয়েব টেকনোলজি ব্যবহার করে জটিল সমস্যার সহজ সমাধান করা।",
      journeyTitle: "আমার যাত্রা 🚀",
      timeline: [
        { year: "২০২১", task: "মাল্টিমিডিয়া এবং ভিডিও এডিটিং শুরু।" },
        { year: "২০২২", task: "গ্রাফিক্স ডিজাইন এবং ফ্রিল্যান্সিং যাত্রা।" },
        { year: "২০২৩", task: "ওয়েব ডেভেলপমেন্ট এবং রিঅ্যাক্ট শেখা।" },
        { year: "২০২৪", task: "ফুল-স্ট্যাক প্রজেক্ট এবং ইনোভেশন।" }
      ],
      loveTitle: "আমি যা করতে ভালোবাসি",
      loveItems: [
        { name: "Video Editing", icon: <Video size={18} /> },
        { name: "React Apps", icon: <Code size={18} /> },
        { name: "UI/UX Design", icon: <Palette size={18} /> },
        { name: "Motion Graphics", icon: <Monitor size={18} /> }
      ],
      phone: "01975805326",
      email: "mdmilonislamashik@gmail.com"
    },
    en: {
      title: "Milon Islam",
      subtitle: "Multimedia Expert & React Developer",
      intro: "Assalamu Alaikum! I am a passionate Multimedia Expert and React Developer. I love building innovative solutions where technology meets creativity.",
      expTitle: "Experience",
      expText: "3+ years in Multimedia and 2 years in Web Development.",
      goalTitle: "Goal",
      goalText: "Solving real-world problems using modern web stacks.",
      journeyTitle: "My Journey 🚀",
      timeline: [
        { year: "2021", task: "Started Multimedia & Video Editing." },
        { year: "2022", task: "Stepped into Graphics & Freelancing." },
        { year: "2023", task: "Deep dive into Web Dev & React." },
        { year: "2024", task: "Full-stack Projects & Innovation." }
      ],
      loveTitle: "I Love To Do",
      loveItems: [
        { name: "Video Editing", icon: <Video size={18} /> },
        { name: "React Apps", icon: <Code size={18} /> },
        { name: "UI Design", icon: <Palette size={18} /> },
        { name: "Motion Graphics", icon: <Monitor size={18} /> }
      ],
      phone: "01975805326",
      email: "mdmilonislamashik@gmail.com"
    }
  };

  const t = content[language];

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.contentCard}
      >
        
        {/* Language Switcher */}
        <div style={styles.langWrapper}>
          {['bn', 'en'].map((lang) => (
            <button 
              key={lang}
              onClick={() => setLanguage(lang)} 
              style={language === lang ? styles.activeBtn : styles.langBtn}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Profile Header */}
        <div style={styles.profileBox}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={styles.imageGlow}
          >
            <img 
              src={profilePic} 
              alt="Milon Islam" 
              style={styles.profileImg} 
              onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
            />
          </motion.div>
          <h1 style={styles.heading}>{t.title}</h1>
          <div style={styles.badge}>{t.subtitle}</div>
        </div>
        
        {/* Intro Card */}
        <motion.div 
          whileHover={{ translateY: -5 }}
          style={styles.glassCard}
        >
          <p style={styles.text}>{t.intro}</p>
        </motion.div>

        {/* Info Grid */}
        <div style={styles.infoGrid}>
          <motion.div whileHover={{ scale: 1.02 }} style={styles.infoItem}>
            <h4 style={styles.infoTitle}>{t.expTitle}</h4>
            <p style={styles.infoText}>{t.expText}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} style={styles.infoItem}>
            <h4 style={styles.infoTitle}>{t.goalTitle}</h4>
            <p style={styles.infoText}>{t.goalText}</p>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div style={styles.timelineBox}>
          <h3 style={styles.sectionTitle}>{t.journeyTitle}</h3>
          <div style={styles.timeline}>
            {t.timeline.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                style={styles.timelineItem}
              >
                <div style={styles.timelineDot}></div>
                <div style={styles.timelineContent}>
                  <span style={styles.timelineYear}>{item.year}</span>
                  <p style={styles.timelineTask}>{item.task}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div style={styles.glassCard}>
          <h3 style={styles.sectionTitle}>{t.loveTitle}</h3>
          <div style={styles.skillList}>
            {t.loveItems.map((item, idx) => (
              <motion.span 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(97, 218, 251, 0.2)' }}
                key={idx} 
                style={styles.skillBadge}
              >
                {item.icon} <span style={{ marginLeft: '8px' }}>{item.name}</span>
              </motion.span>
            ))}
          </div>
        </div>

        {/* Contact Footer */}
        <div style={styles.contactSection}>
          <motion.a whileHover={{ y: -3 }} href={`tel:${t.phone}`} style={styles.contactLink}>
            <Phone size={18} /> {t.phone}
          </motion.a>
          <motion.a whileHover={{ y: -3 }} href={`mailto:${t.email}`} style={styles.contactLink}>
            <Mail size={18} /> {t.email}
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: { 
    backgroundColor: '#050505', 
    minHeight: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    padding: '60px 20px', 
    fontFamily: "'Inter', sans-serif",
    backgroundImage: 'radial-gradient(circle at 50% 50%, #111 0%, #050505 100%)'
  },
  contentCard: { maxWidth: '850px', width: '100%' },
  langWrapper: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '30px' },
  langBtn: { padding: '8px 16px', borderRadius: '12px', border: '1px solid #222', backgroundColor: '#111', color: '#666', cursor: 'pointer', transition: '0.3s', fontSize: '12px', fontWeight: '600' },
  activeBtn: { padding: '8px 16px', borderRadius: '12px', border: 'none', backgroundColor: '#61dafb', color: '#000', fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 20px rgba(97, 218, 251, 0.3)' },
  profileBox: { textAlign: 'center', marginBottom: '50px' },
  imageGlow: { 
    width: '150px', height: '150px', borderRadius: '40px', margin: '0 auto 25px', padding: '3px',
    background: 'linear-gradient(135deg, #61dafb 0%, #d422dd 100%)', transform: 'rotate(-3deg)'
  },
  profileImg: { width: '100%', height: '100%', borderRadius: '38px', objectFit: 'cover', border: '4px solid #050505', transform: 'rotate(3deg)' },
  heading: { color: '#fff', fontSize: 'clamp(32px, 5vw, 42px)', margin: '15px 0 10px', fontWeight: '800' },
  badge: { display: 'inline-block', padding: '6px 16px', borderRadius: '100px', backgroundColor: 'rgba(97, 218, 251, 0.1)', color: '#61dafb', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(97, 218, 251, 0.2)' },
  glassCard: { backgroundColor: 'rgba(20, 20, 20, 0.6)', backdropFilter: 'blur(12px)', padding: '35px', borderRadius: '28px', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '30px' },
  text: { color: '#bbb', fontSize: '18px', lineHeight: '1.8', textAlign: 'center' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' },
  infoItem: { background: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222' },
  infoTitle: { color: '#fff', margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700' },
  infoText: { color: '#888', fontSize: '15px' },
  timelineBox: { padding: '20px 0', marginBottom: '50px' },
  sectionTitle: { color: '#fff', fontSize: '26px', marginBottom: '35px', textAlign: 'center' },
  timeline: { borderLeft: '2px dashed #222', marginLeft: '20px', paddingLeft: '40px' },
  timelineItem: { position: 'relative', marginBottom: '40px' },
  timelineDot: { position: 'absolute', left: '-50px', top: '8px', width: '16px', height: '16px', backgroundColor: '#050505', border: '3px solid #61dafb', borderRadius: '50%' },
  timelineYear: { color: '#61dafb', fontWeight: '800', fontSize: '18px' },
  timelineTask: { color: '#aaa', fontSize: '16px' },
  skillList: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' },
  skillBadge: { display: 'flex', alignItems: 'center', padding: '12px 24px', borderRadius: '16px', backgroundColor: '#111', color: '#eee', border: '1px solid #222', fontSize: '15px' },
  contactSection: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginTop: '50px' },
  contactLink: { display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', fontSize: '15px', padding: '14px 28px', borderRadius: '18px', backgroundColor: '#111', border: '1px solid #222' }
};

export default About;