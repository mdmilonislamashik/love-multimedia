import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you Milon Islam! Message from ${formData.name} has been sent successfully.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact <span style={{color: '#61dafb'}}>Me</span></h1>
      <p style={styles.subtitle}>Let's build something amazing together! Send me a message below.</p>

      <div style={styles.contentWrapper}>
        {/* Left Side: 3D Info Cards */}
        <div style={styles.infoSection}>
          <div style={styles.threeDCard}>
            <div style={styles.icon}>📍</div>
            <div>
              <h4 style={styles.infoTitle}>Location</h4>
              <p style={styles.infoText}>Shyamkhali, Koyra, Khulna, BD</p>
            </div>
          </div>

          <div style={styles.threeDCard}>
            <div style={styles.icon}>📧</div>
            <div>
              <h4 style={styles.infoTitle}>Email</h4>
              <p style={styles.infoText}>mdmilonislamashik@gmail.com</p>
            </div>
          </div>

          <div style={styles.threeDCard}>
            <div style={styles.icon}>📞</div>
            <div>
              <h4 style={styles.infoTitle}>WhatsApp</h4>
              <p style={styles.infoText}>+880 1975805326</p>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Floating Form */}
        <div style={styles.formWrapper3D}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputContainer3D}>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.inputContainer3D}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputContainer3D}>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </div>

            <button 
              type="submit" 
              style={styles.submitBtn}
              onMouseDown={(e) => e.target.style.transform = 'translateY(4px)'}
              onMouseUp={(e) => e.target.style.transform = 'translateY(0)'}
            >
              SEND MESSAGE 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '100px 20px',
    backgroundColor: '#0a0f1a',
    minHeight: '100vh',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: "'Inter', sans-serif",
    perspective: '1000px'
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '900',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '18px',
    marginBottom: '60px',
    maxWidth: '600px',
    margin: '0 auto 60px'
  },
  contentWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  infoSection: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  threeDCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '25px',
    backgroundColor: '#0f172a',
    borderRadius: '24px',
    textAlign: 'left',
    boxShadow: '10px 10px 20px #050810, -5px -5px 15px rgba(255,255,255,0.02)',
    border: '1px solid #1e293b',
    transition: '0.3s'
  },
  icon: {
    fontSize: '30px',
    backgroundColor: 'rgba(97, 218, 251, 0.1)',
    padding: '15px',
    borderRadius: '15px',
    color: '#61dafb'
  },
  infoTitle: { color: '#61dafb', margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold' },
  infoText: { color: '#94a3b8', margin: '0', fontSize: '15px' },

  formWrapper3D: {
    flex: '1.5',
    minWidth: '350px',
    backgroundColor: '#0f172a',
    padding: '40px',
    borderRadius: '35px',
    boxShadow: '25px 25px 50px #050810, -10px -10px 30px rgba(255,255,255,0.02)',
    border: '1px solid #1e293b',
    transform: 'rotateY(-5deg)' // Subtle 3D tilt
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  inputContainer3D: {
    borderRadius: '15px',
    backgroundColor: '#0a0f1a',
    boxShadow: 'inset 6px 6px 12px #050810, inset -3px -3px 8px #1e293b',
    padding: '5px'
  },
  input: {
    width: '100%',
    padding: '15px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '15px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    minHeight: '150px',
    outline: 'none',
    resize: 'none',
    boxSizing: 'border-box'
  },
  submitBtn: {
    padding: '20px',
    borderRadius: '18px',
    border: 'none',
    backgroundColor: '#61dafb',
    color: '#0a0f1a',
    fontSize: '16px',
    fontWeight: '900',
    cursor: 'pointer',
    boxShadow: '0 8px 0 #2b82f6, 0 15px 25px rgba(97, 218, 251, 0.3)',
    transition: '0.2s ease',
    letterSpacing: '2px'
  }
};

export default Contact;