import React from 'react';

const MyProjects = () => {
  // আপনার কাজের উদাহরণ (Real links এখানে বসাতে পারবেন)
  const projectList = [
    { 
      id: 1, 
      category: "Video Editing", 
      title: "Cinematic Travel Film", 
      link: "https://youtube.com/your-video-link", 
      img: "🎬" 
    },
    { 
      id: 2, 
      category: "Web Development", 
      title: "E-commerce React App", 
      link: "https://your-github-or-live-site.com", 
      img: "⚛️" 
    },
    { 
      id: 3, 
      category: "UI/UX Design", 
      title: "Modern Food App UI", 
      link: "https://behance.net/your-design", 
      img: "🎨" 
    },
    { 
      id: 4, 
      category: "Multimedia", 
      title: "Motion Graphics Intro", 
      link: "https://vimeo.com/your-work", 
      img: "🎥" 
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Project <span style={{ color: '#48bb78' }}>Gallery</span></h1>
      <p style={styles.subText}>আমার কাজের কিছু বাস্তব উদাহরণ নিচে দেওয়া হলো।</p>

      <div style={styles.grid}>
        {projectList.map((project) => (
          <div key={project.id} style={styles.projectCard}>
            <div style={styles.previewIcon}>{project.img}</div>
            <span style={styles.tag}>{project.category}</span>
            <h3 style={styles.projectTitle}>{project.title}</h3>
            
            {/* কাজের লিঙ্ক */}
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.viewBtn}
            >
              View Project ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  heading: {
    fontSize: '32px',
    color: '#e6edf3',
    marginBottom: '10px'
  },
  subText: {
    color: '#8b949e',
    marginBottom: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  projectCard: {
    backgroundColor: '#121212',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #1a202c',
    textAlign: 'left',
    transition: '0.3s'
  },
  previewIcon: {
    fontSize: '40px',
    marginBottom: '15px'
  },
  tag: {
    fontSize: '12px',
    backgroundColor: '#1a202c',
    color: '#48bb78',
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '10px'
  },
  projectTitle: {
    color: '#cbd5e0',
    fontSize: '18px',
    marginBottom: '20px'
  },
  viewBtn: {
    color: '#48bb78',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '1px solid #48bb78',
    padding: '8px 15px',
    borderRadius: '5px',
    display: 'inline-block',
    transition: '0.3s'
  }
};

export default MyProjects;