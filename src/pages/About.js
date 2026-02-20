import React, { useState } from 'react';

const About = () => {
  const [language, setLanguage] = useState('bn');

  // গুগল ড্রাইভের ডাইরেক্ট ইমেজ লিঙ্ক জেনারেট করা হয়েছে
  const profileImageUrl = "https://lh3.googleusercontent.com/d/1OZGT0cJd6oLtqPtvjFL-gN4nU6fd6_qd";

  const content = {
    bn: {
      title: "About Me 👨‍💻",
      intro: "আসসালামু আলাইকুম! আমি মিলন ইসলাম। একজন প্যাশনেট মাল্টিমিডিয়া এক্সপার্ট এবং রিঅ্যাক্ট (React) ডেভেলপার। আমি প্রযুক্তির মাধ্যমে নতুন কিছু তৈরি করতে পছন্দ করি।",
      expTitle: "Experience",
      expText: "৩+ বছর মাল্টিমিডিয়া এবং ২ বছর ওয়েব ডেভেলপমেন্ট।",
      goalTitle: "Goal",
      goalText: "আধুনিক ওয়েব টেকনোলজি ব্যবহার করে সমস্যার সমাধান করা।",
      journeyTitle: "My Journey 🚀",
      timeline: [
        { year: "২০২১", task: "মাল্টিমিডিয়া এবং ভিডিও এডিটিং শুরু।" },
        { year: "২০২২", task: "গ্রাফিক্স ডিজাইন এবং ফ্রিল্যান্সিং যাত্রা।" },
        { year: "২০২৩", task: "ওয়েব ডেভেলপমেন্ট এবং রিঅ্যাক্ট শেখা।" },
        { year: "২০২৪", task: "ফুল-স্ট্যাক প্রজেক্ট এবং ইনোভেশন।" }
      ],
      loveTitle: "I Love To Do:",
      loveItems: ["🎬 Video Editing", "⚛️ React Apps", "🎨 UI/UX Design"],
      phone: "01975805326",
      email: "mdmilonislamashik@gmail.com"
    },
    en: {
      title: "About Me 👨‍💻",
      intro: "Assalamu Alaikum! I am Milon Islam. A passionate Multimedia Expert and React Developer. I love building new things with technology.",
      expTitle: "Experience",
      expText: "3+ years in Multimedia and 2 years in Web Development.",
      goalTitle: "Goal",
      goalText: "Solving problems using modern web technologies.",
      journeyTitle: "My Journey 🚀",
      timeline: [
        { year: "2021", task: "Started Multimedia & Video Editing." },
        { year: "2022", task: "Stepped into Graphics & Freelancing." },
        { year: "2023", task: "Deep dive into Web Dev & React." },
        { year: "2024", task: "Full-stack Projects & Innovation." }
      ],
      loveTitle: "I Love To Do:",
      loveItems: ["🎬 Video Editing", "⚛️ React Apps", "🎨 UI Design"],
      phone: "01975805326",
      email: "mdmilonislamashik@gmail.com"
    }
  };

  const t = content[language] || content['en'];

  return (
    <div style={styles.container}>
      <div style={styles.contentCard}>
        
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

        {/* Profile Image Section */}
        <div style={styles.profileBox}>
          <div style={styles.imageGlow}>
            <img 
              src={profileImageUrl}
              alt="Milon Islam" 
              style={styles.profileImg} 
              onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} // লিঙ্ক কাজ না করলে ডামি ছবি দেখাবে
            />
          </div>
          <h1 style={styles.heading}>{t.title}</h1>
        </div>
        
        <div style={styles.card3D}>
          <p style={styles.text}>{t.intro}</p>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.glassItem}>
            <h4 style={styles.infoTitle}>{t.expTitle}</h4>
            <p style={styles.infoText}>{t.expText}</p>
          </div>
          <div style={styles.glassItem}>
            <h4 style={styles.infoTitle}>{t.goalTitle}</h4>
            <p style={styles.infoText}>{t.goalText}</p>
          </div>
        </div>

        {/* Timeline Journey Section */}
        <div style={styles.timelineBox}>
          <h3 style={styles.sectionTitle}>{t.journeyTitle}</h3>
          <div style={styles.timeline}>
            {t.timeline.map((item, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={styles.timelineDot}></div>
                <div style={styles.timelineContent}>
                  <span style={styles.timelineYear}>{item.year}</span>
                  <p style={styles.timelineTask}>{item.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card3D}>
          <h3 style={styles.sectionTitle}>{t.loveTitle}</h3>
          <ul style={styles.list}>
            {t.loveItems.map((item, idx) => (
              <li key={idx} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={styles.contactSection}>
          <div style={styles.contactCard3D}><p style={styles.infoText}>📞 {t.phone}</p></div>
          <div style={styles.contactCard3D}><p style={styles.infoText}>📧 {t.email}</p></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#050505', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '40px 15px', perspective: '1000px' },
  contentCard: { backgroundColor: '#0f0f0f', padding: '40px 20px', borderRadius: '40px', maxWidth: '850px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.8)', border: '1px solid #1a1a1a' },
  langWrapper: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' },
  langBtn: { padding: '8px 15px', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#111', color: '#888', cursor: 'pointer' },
  activeBtn: { padding: '8px 15px', borderRadius: '10px', border: 'none', backgroundColor: '#61dafb', color: '#000', fontWeight: 'bold', boxShadow: '0 0 15px rgba(97, 218, 251, 0.4)' },
  
  profileBox: { textAlign: 'center', marginBottom: '30px' },
  imageGlow: { width: '130px', height: '130px', borderRadius: '50%', margin: '0 auto 20px', padding: '5px', background: 'linear-gradient(45deg, #61dafb, #ff3c3c)', boxShadow: '0 0 25px rgba(97, 218, 251, 0.2)' },
  profileImg: { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid #0f0f0f' },
  
  heading: { color: '#fff', fontSize: '32px', fontWeight: '800' },
  card3D: { backgroundColor: '#161616', padding: '25px', borderRadius: '24px', marginBottom: '30px', borderLeft: '4px solid #61dafb', boxShadow: '10px 10px 20px #000' },
  text: { fontSize: '17px', textAlign: 'center', color: '#ddd', lineHeight: '1.7' },
  
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' },
  glassItem: { backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '20px', borderBottom: '3px solid #61dafb' },
  infoTitle: { margin: '0 0 10px 0', color: '#61dafb', fontSize: '20px' },
  infoText: { fontSize: '15px', color: '#aaa' },

  timelineBox: { padding: '20px', marginBottom: '30px' },
  timeline: { borderLeft: '2px solid #333', marginLeft: '20px', paddingLeft: '20px' },
  timelineItem: { position: 'relative', marginBottom: '25px' },
  timelineDot: { position: 'absolute', left: '-31px', top: '5px', width: '20px', height: '20px', backgroundColor: '#61dafb', borderRadius: '50%', border: '4px solid #0f0f0f', boxShadow: '0 0 10px #61dafb' },
  timelineYear: { color: '#61dafb', fontWeight: 'bold', fontSize: '18px' },
  timelineTask: { color: '#888', fontSize: '14px', marginTop: '5px' },

  sectionTitle: { color: '#fff', fontSize: '22px', marginBottom: '20px', textAlign: 'center' },
  list: { listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' },
  listItem: { backgroundColor: '#222', padding: '8px 15px', borderRadius: '10px', fontSize: '14px', color: '#61dafb', border: '1px solid #333' },
  
  contactSection: { display: 'flex', flexDirection: 'column', gap: '10px' },
  contactCard3D: { backgroundColor: '#111', padding: '15px', borderRadius: '15px', textAlign: 'center', boxShadow: 'inset 4px 4px 10px #000' }
};

export default About;