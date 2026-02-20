import React, { useState } from 'react';

const About = () => {
  const [language, setLanguage] = useState('bn');

  const content = {
    bn: {
      title: "About Me 👨‍💻",
      intro: "আসসালামু আলাইকুম! আমি মিলন ইসলাম। আমি একজন প্যাশনেট মাল্টিমিডিয়া এক্সপার্ট এবং রিঅ্যাক্ট (React) ডেভেলপার। আমি প্রযুক্তির মাধ্যমে নতুন কিছু তৈরি করতে পছন্দ করি।",
      expTitle: "Experience",
      expText: "৩+ বছর মাল্টিমিডিয়া এবং ২ বছর ওয়েব ডেভেলপমেন্ট।",
      goalTitle: "Goal",
      goalText: "আধুনিক ওয়েব টেকনোলজি ব্যবহার করে সমস্যার সমাধান করা।",
      loveTitle: "I Love To Do:",
      loveItems: ["🎬 Video Editing & Motion", "⚛️ React Applications", "🎨 UI/UX Design"],
      contactTitle: "Contact Me:",
      phone: "Phone: 01975805326",
      email: "Email: mdmilonislamashik@gmail.com"
    },
    en: {
      title: "About Me 👨‍💻",
      intro: "Assalamu Alaikum! I am Milon Islam. A passionate Multimedia Expert and React Developer. I love building new things with technology and creating great user experiences.",
      expTitle: "Experience",
      expText: "3+ years in Multimedia and 2 years in Web Development.",
      goalTitle: "Goal",
      goalText: "Solving problems using modern web technologies.",
      loveTitle: "What I Love to Do:",
      loveItems: ["🎬 Video Editing & Motion", "⚛️ React Apps", "🎨 UI Design"],
      contactTitle: "Contact Me:",
      phone: "Phone: 01975805326",
      email: "Email: mdmilonislamashik@gmail.com"
    },
    ar: {
      title: "عني 👨‍💻",
      intro: "السلام عليكم! أنا ميلون إسلام. خبير في الوسائط المتعددة ومطور ریأکت (React). أحب بناء أشياء جديدة بالتكنولوجيا وتقديم تجارب مستخدم رائعة.",
      expTitle: "خبرة",
      expText: "أكثر من ٣ سنوات في الوسائط المتعددة وسنتان في تطوير الويب.",
      goalTitle: "هدف",
      goalText: "حل المشكلات باستخدام تقنيات الويب الحديثة.",
      loveTitle: "ما أحب القيام به:",
      loveItems: ["🎬 تحرير الفيديو", "⚛️ تطبيقات ریأکت", "🎨 تصميم الواجهة"],
      contactTitle: "اتصل بي:",
      phone: "الهاتف: 01975805326",
      email: "بريد إلكتروني: mdmilonislamashik@gmail.com"
    }
  };

  const t = content[language];

  return (
    <div style={styles.container}>
      <div style={styles.contentCard}>
        
        {/* Language Switcher */}
        <div style={styles.langWrapper}>
          {['bn', 'en', 'ar'].map((lang) => (
            <button 
              key={lang}
              onClick={() => setLanguage(lang)} 
              style={language === lang ? styles.activeBtn : styles.langBtn}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <h1 style={styles.heading}>{t.title}</h1>
        
        {/* Bio Section with 3D Pop */}
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

        <div style={styles.card3D}>
          <h3 style={styles.sectionTitle}>{t.loveTitle}</h3>
          <ul style={styles.list}>
            {t.loveItems.map((item, idx) => (
              <li key={idx} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={styles.contactSection}>
          <div style={styles.contactCard3D}>
             <p style={styles.infoText}>📞 {t.phone}</p>
          </div>
          <div style={styles.contactCard3D}>
             <p style={styles.infoText}>📧 {t.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#050505',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    perspective: '1000px', // 3D perspective
  },
  contentCard: {
    backgroundColor: '#0f0f0f',
    padding: '40px',
    borderRadius: '40px',
    maxWidth: '850px',
    width: '100%',
    boxShadow: '20px 20px 60px #000000, -5px -5px 30px rgba(97, 218, 251, 0.05)',
    border: '1px solid #1a1a1a',
  },
  langWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '30px'
  },
  langBtn: {
    padding: '8px 20px',
    borderRadius: '12px',
    border: '1px solid #333',
    backgroundColor: '#111',
    color: '#888',
    cursor: 'pointer',
    transition: '0.3s',
  },
  activeBtn: {
    padding: '8px 20px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#61dafb',
    color: '#000',
    fontWeight: 'bold',
    boxShadow: '0 0 15px rgba(97, 218, 251, 0.5)',
    cursor: 'pointer',
  },
  heading: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '38px',
    fontWeight: '800',
    textShadow: '0 10px 20px rgba(0,0,0,0.5)'
  },
  card3D: {
    backgroundColor: '#161616',
    padding: '30px',
    borderRadius: '24px',
    marginBottom: '30px',
    borderTop: '1px solid #333',
    borderLeft: '1px solid #333',
    boxShadow: '10px 10px 20px #000, -2px -2px 10px rgba(255,255,255,0.02)',
    transform: 'rotateX(5deg)',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    marginBottom: '30px'
  },
  glassItem: {
    backgroundColor: '#1a1a1a',
    padding: '25px',
    borderRadius: '24px',
    borderBottom: '4px solid #61dafb',
    boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
    transition: '0.3s',
  },
  infoTitle: {
    margin: '0 0 12px 0',
    color: '#61dafb',
    fontSize: '22px',
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: '16px',
    color: '#aaa',
    lineHeight: '1.5'
  },
  sectionTitle: {
    color: '#fff',
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px'
  },
  listItem: {
    backgroundColor: '#222',
    padding: '10px 20px',
    borderRadius: '12px',
    fontSize: '15px',
    color: '#61dafb',
    border: '1px solid #333'
  },
  text: {
    fontSize: '18px',
    textAlign: 'center',
    color: '#ddd',
    lineHeight: '1.8'
  },
  contactSection: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  contactCard3D: {
    backgroundColor: '#111',
    padding: '15px 25px',
    borderRadius: '15px',
    boxShadow: 'inset 4px 4px 8px #000, inset -2px -2px 6px rgba(255,255,255,0.01)',
    textAlign: 'center',
  }
};

export default About;