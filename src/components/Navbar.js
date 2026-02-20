import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// আপনার পেজগুলো ইম্পোর্ট করুন
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Multimedia from './multimedia'; 
import WorldFilm from './WorldFlim'; 
import Services from './Services'; 
import MyProjects from './My Projects'; 

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
        
        {/* --- Navbar Start --- */}
        <nav style={styles.navbar}>
          <div style={styles.logo}>MILON.DEV</div>
          
          <div style={styles.navLinks}>
            <Link to="/" style={styles.link3d}>Home</Link>
            <Link to="/about" style={styles.link3d}>About</Link>
            
            {/* Services Button */}
            <Link to="/services" style={styles.servicesBtn}>Services</Link>
            
            {/* My Projects Button (Green Style) */}
            <Link to="/projects" style={styles.myProjectsBtn}>My Projects</Link> 
            
            <Link to="/multimedia" style={styles.link3d}>Multimedia</Link>
            <Link to="/world-film" style={styles.worldFilmBtn}>World Film</Link>
            <Link to="/contact" style={styles.link3d}>Contact</Link>
          </div>
        </nav>
        {/* --- Navbar End --- */}

        {/* --- Routes Configuration --- */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<MyProjects />} /> 
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/world-film" element={<WorldFilm />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

// স্টাইল অবজেক্ট
const styles = {
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '15px 30px', 
    background: '#161616', 
    borderBottom: '2px solid #333',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
    flexWrap: 'wrap'
  },
  logo: { 
    color: '#61dafb', 
    fontWeight: 'bold', 
    fontSize: '22px' 
  },
  navLinks: { 
    display: 'flex', 
    gap: '10px', 
    alignItems: 'center', 
    flexWrap: 'wrap' 
  },
  link3d: { 
    color: 'white', 
    textDecoration: 'none', 
    fontSize: '13px', 
    fontWeight: '600',
    padding: '6px 12px', 
    borderRadius: '6px', 
    background: '#222', 
    borderBottom: '3px solid #000',
    display: 'inline-block',
    transition: '0.2s'
  },
  servicesBtn: {
    color: 'white', 
    textDecoration: 'none', 
    fontSize: '13px', 
    fontWeight: 'bold',
    padding: '6px 12px', 
    borderRadius: '6px', 
    background: '#007bff', 
    borderBottom: '3px solid #0056b3',
    display: 'inline-block'
  },
  myProjectsBtn: { 
    color: 'white', 
    textDecoration: 'none', 
    fontSize: '13px', 
    fontWeight: 'bold',
    padding: '6px 12px', 
    borderRadius: '6px', 
    background: '#28a745', 
    borderBottom: '3px solid #1e7e34',
    display: 'inline-block'
  },
  worldFilmBtn: {
    color: 'white', 
    textDecoration: 'none', 
    fontSize: '13px', 
    fontWeight: 'bold',
    padding: '6px 12px', 
    borderRadius: '6px', 
    background: '#ff3c3c', 
    borderBottom: '3px solid #8b0000',
    display: 'inline-block'
  }
};

export default App;