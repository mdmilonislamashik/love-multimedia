import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';

/**
 * ULM Personal - A Secure Cloud Storage Terminal
 * Features: Biometric Login Simulation, File Management, Storage Stats
 */

const ULMPersonal = () => {
  const navigate = useNavigate();

  // --- States ---
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState('drive');
  const [currentFolder, setCurrentFolder] = useState(0);
  const [folderHistory, setFolderHistory] = useState([0]);

  // --- Static Data ---
  const userProfile = {
    name: "Admin User",
    email: "admin@ulm.cloud",
    joinDate: "Feb 2026",
    role: "System Administrator"
  };

  // --- Local Storage Sync ---
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ulm_drive_v4');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Personal Projects', type: 'folder', parent: 0, date: '20/02/2026', isStarred: false, isArchived: false, sizeRaw: 0 },
      { id: 2, name: 'System Assets', type: 'folder', parent: 0, date: '18/02/2026', isStarred: false, isArchived: false, sizeRaw: 0 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('ulm_drive_v4', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // --- Calculations ---
  const storageStats = useMemo(() => {
    const totalLimitGB = 5;
    const totalLimitBytes = totalLimitGB * 1024 * 1024 * 1024;
    const usedBytes = items.reduce((acc, item) => acc + (item.sizeRaw || 0), 0);
    const usedMB = (usedBytes / (1024 * 1024)).toFixed(2);
    const percentage = Math.min((usedBytes / totalLimitBytes) * 100, 100);

    return {
      usedMB,
      totalLimitGB,
      percentage,
      usedDisplay: usedMB > 1024 ? (usedMB / 1024).toFixed(2) + " GB" : usedMB + " MB"
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    let baseItems = [];
    switch (activeMenu) {
      case 'starred': baseItems = items.filter(i => i.isStarred && !i.isArchived); break;
      case 'archive': baseItems = items.filter(i => i.isArchived); break;
      case 'recent': baseItems = [...items].filter(i => !i.isArchived).sort((a, b) => b.id - a.id).slice(0, 10); break;
      default: baseItems = items.filter(i => i.parent === currentFolder && !i.isArchived);
    }
    return baseItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [items, currentFolder, searchQuery, activeMenu]);

  // --- Handlers ---
  const handleVerify = () => {
    if (inputCode === "4472") {
      setScanning(true);
      setTimeout(() => { setIsAuthorized(true); setScanning(false); }, 1500);
    } else {
      setError(true);
      setInputCode("");
      setTimeout(() => setError(false), 800);
    }
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (storageStats.usedMB * 1024 * 1024 + file.size > 5 * 1024 * 1024 * 1024) {
      alert("Storage Full! You cannot upload more than 5GB.");
      return;
    }

    try {
      setUploading(true);
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('My Files').upload(fileName, file);
      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase.storage.from('My Files').getPublicUrl(fileName);

      const newFile = {
        id: Date.now(),
        name: file.name,
        url: publicUrlData.publicUrl,
        type: 'file',
        format: file.type.split('/')[1],
        size: (file.size / 1024).toFixed(1) + ' KB',
        sizeRaw: file.size,
        parent: currentFolder,
        date: new Date().toLocaleDateString(),
        isStarred: false,
        isArchived: false
      };
      setItems(prev => [...prev, newFile]);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleMenuChange = (menu) => {
    setIsLoading(true);
    setActiveMenu(menu);
    if (menu !== 'drive') setCurrentFolder(0);
    setTimeout(() => setIsLoading(false), 500);
  };

  const toggleStar = (id) => setItems(prev => prev.map(item => item.id === id ? { ...item, isStarred: !item.isStarred } : item));
  const toggleArchive = (id) => setItems(prev => prev.map(item => item.id === id ? { ...item, isArchived: !item.isArchived } : item));
  const deleteItem = (id) => window.confirm("Delete permanently?") && setItems(prev => prev.filter(i => i.id !== id));
  
  const openFolder = (id) => {
    if (activeMenu !== 'drive') return;
    setFolderHistory(prev => [...prev, id]);
    setCurrentFolder(id);
  };

  const goBack = () => {
    if (folderHistory.length > 1) {
      const newHistory = [...folderHistory];
      newHistory.pop();
      setFolderHistory(newHistory);
      setCurrentFolder(newHistory[newHistory.length - 1]);
    }
  };

  // --- Helper: Icons ---
  const getFileIcon = (item) => {
    if (item.type === 'folder') return '📂';
    const fmt = item.format?.toLowerCase();
    const iconMap = {
      image: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
      video: ['mp4', 'mov', 'avi'],
      pdf: ['pdf'],
      zip: ['zip', 'rar', '7z'],
      audio: ['mp3', 'wav']
    };
    if (iconMap.image.includes(fmt)) return '🖼️';
    if (iconMap.video.includes(fmt)) return '🎥';
    if (iconMap.pdf.includes(fmt)) return '📕';
    if (iconMap.zip.includes(fmt)) return '📦';
    if (iconMap.audio.includes(fmt)) return '🎵';
    return '📄';
  };

  // --- Auth Screen View ---
  if (!isAuthorized) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.gridOverlay}></div>
        <div style={styles.centerStage}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            style={{...styles.glassCard, borderColor: error ? '#ff3c3c' : 'rgba(0, 242, 255, 0.2)'}}
          >
            <div style={styles.secureHeader}>
              <div style={styles.pulseDot}></div>
              <h2 style={styles.titleMain}>SECURE TERMINAL</h2>
            </div>
            
            <div style={styles.codeDisplay}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{...styles.codeSlot, borderColor: inputCode.length > i ? '#00f2ff' : '#333'}}>
                  {inputCode.length > i && <motion.div initial={{scale:0}} animate={{scale:1}} style={styles.activeDot} />}
                </div>
              ))}
            </div>

            <div style={styles.keypadGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "OK"].map((key) => (
                <button 
                  key={key} 
                  onClick={() => {
                    if (key === "C") setInputCode("");
                    else if (key === "OK") handleVerify();
                    else if (inputCode.length < 4) setInputCode(prev => prev + key);
                  }} 
                  style={styles.key} 
                  className="key-hover"
                >
                  {key}
                </button>
              ))}
            </div>

            <div style={styles.biometricSection}>
               <div style={styles.fingerprintBox}>
                  {scanning && <div style={styles.laser}></div>}
                  <span style={{fontSize:'24px'}}>🧬</span>
               </div>
               <p style={styles.scanText}>{scanning ? "DECRYPTING..." : "BIOMETRIC READY"}</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // --- Main Drive View ---
  return (
    <div style={styles.driveContainer} onContextMenu={(e) => e.preventDefault()}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoBox}>
          <div style={styles.logoIcon}>U</div> 
          <span style={styles.logoText}>ULM <span style={{color: '#4285F4'}}>CLOUD</span></span>
        </div>
        
        <button onClick={() => handleMenuChange('drive')} style={styles.sideBtn}><span>🏠</span> Dashboard</button>
        
        <button 
          onClick={() => {
            const name = prompt("Folder Name:");
            if(name) setItems([...items, { id: Date.now(), name, type: 'folder', parent: currentFolder, date: new Date().toLocaleDateString(), isStarred: false, isArchived: false, sizeRaw: 0 }]);
          }} 
          style={styles.primaryBtn}
        >
          <span>＋</span> New Folder
        </button>
        
        <label style={styles.uploadLabel}>
          {uploading ? "⏳ Processing..." : "📤 Upload Asset"}
          <input type="file" onChange={uploadFile} disabled={uploading} style={{display:'none'}}/>
        </label>

        <div style={styles.divider}></div>

        <nav style={styles.sideNav}>
          {['drive', 'recent', 'starred', 'archive'].map((menu) => (
            <div 
              key={menu}
              onClick={() => handleMenuChange(menu)} 
              style={activeMenu === menu ? styles.navActive : styles.navItem}
            >
              {menu === 'drive' && '☁️ My Drive'}
              {menu === 'recent' && '🕒 Recent'}
              {menu === 'starred' && '⭐ Starred'}
              {menu === 'archive' && '🗑️ Archive'}
            </div>
          ))}
        </nav>

        {/* Storage Stats */}
        <div style={styles.storageBox}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', marginBottom:'8px'}}>
                <span>Cloud Storage</span>
                <span>{storageStats.percentage.toFixed(1)}%</span>
            </div>
            <div style={styles.storageBarBg}>
                <motion.div 
                    initial={{width: 0}} 
                    animate={{width: `${storageStats.percentage}%`}} 
                    style={{...styles.storageBarFill, background: storageStats.percentage > 85 ? '#ff3c3c' : '#4285F4'}}
                />
            </div>
            <p style={{fontSize:'10px', color:'#71717a', marginTop:'8px'}}>
                {storageStats.usedDisplay} of {storageStats.totalLimitGB} GB used
            </p>
        </div>

        <button onClick={() => window.confirm("Logout?") && navigate('/')} style={styles.logoutBtn}>
          Terminate Session
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        <header style={styles.topHeader}>
          <div style={styles.headerLeft}>
            <button onClick={goBack} disabled={folderHistory.length <= 1 || activeMenu !== 'drive'} style={styles.circleBtn}>❮</button>
            <div style={styles.searchContainer}>
                🔍 <input placeholder="Search files, folders..." onChange={(e)=>setSearchQuery(e.target.value)} style={styles.searchInput}/>
            </div>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.statusBadge}>Online</div>
            <div style={styles.profileCircle} onClick={() => setShowProfile(!showProfile)}>
                {userProfile.name.charAt(0)}
            </div>
            
            <AnimatePresence>
                {showProfile && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.profileDropdown}>
                        <div style={styles.profileHeader}>
                            <div style={styles.largeAvatar}>{userProfile.name.charAt(0)}</div>
                            <h4 style={{margin: '10px 0 2px 0'}}>{userProfile.name}</h4>
                            <p style={{fontSize: '11px', color: '#71717a'}}>{userProfile.email}</p>
                        </div>
                        <div style={styles.profileStats}>
                             <div style={styles.statItem}><span>Role</span><span style={{color: '#4285F4'}}>{userProfile.role}</span></div>
                             <div style={styles.statItem}><span>Joined</span><span>{userProfile.joinDate}</span></div>
                        </div>
                        <button style={styles.closeProfileBtn} onClick={() => setShowProfile(false)}>Close</button>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </header>

        <section style={styles.scrollArea}>
          <div style={styles.breadcrumb}>
            <span style={styles.link} onClick={() => handleMenuChange('drive')}>MY DRIVE</span> 
            {activeMenu === 'drive' && folderHistory.map((folderId, idx) => {
                if (folderId === 0) return null;
                const folder = items.find(i => i.id === folderId);
                return (
                    <span key={folderId}>
                        <span style={{opacity:0.4, margin: '0 8px'}}>/</span>
                        <span style={{cursor:'pointer'}} onClick={() => {
                            setFolderHistory(folderHistory.slice(0, idx + 1));
                            setCurrentFolder(folderId);
                        }}>{folder?.name}</span>
                    </span>
                );
            })}
          </div>

          {isLoading ? (
            <div style={{display:'flex', justifyContent:'center', marginTop:'100px'}}>
               <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1}} style={{fontSize:'30px'}}>🌀</motion.div>
            </div>
          ) : (
            <motion.div layout style={styles.fileGrid}>
              <AnimatePresence mode='popLayout'>
                {filteredItems.length > 0 ? filteredItems.map(item => (
                  <motion.div 
                    layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} 
                    key={item.id} style={styles.itemCard} className="item-card-hover" 
                    onDoubleClick={() => item.type === 'folder' ? openFolder(item.id) : window.open(item.url, '_blank')}
                    onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.pageX, y: e.pageY, item }); }}
                  >
                    <div style={styles.iconWrapper}>{getFileIcon(item)}</div>
                    <div style={styles.itemInfo}>
                      <p style={styles.itemName}>{item.name}</p>
                      <div style={styles.itemMeta}>
                        <span onClick={(e) => {e.stopPropagation(); toggleStar(item.id)}} style={{cursor:'pointer'}}>
                          {item.isStarred ? '⭐' : '☆'}
                        </span>
                        <span style={{fontSize: '10px', opacity: 0.5}}>{item.size || 'Folder'}</span>
                      </div>
                      
                      <div style={styles.actionRow}>
                        <button onClick={(e) => {e.stopPropagation(); toggleArchive(item.id)}} style={styles.actionIconBtn}>
                          {item.isArchived ? '📤' : '📦'}
                        </button>
                        <button onClick={(e) => {e.stopPropagation(); deleteItem(item.id)}} style={{...styles.actionIconBtn, color: '#ff4444'}}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div style={{gridColumn:'1/-1', textAlign:'center', opacity: 0.3, marginTop: '50px'}}>
                    <p>No items found.</p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* Context Menu */}
        <AnimatePresence>
          {contextMenu && (
            <motion.div 
                initial={{opacity:0, y: -10}} animate={{opacity:1, y: 0}} exit={{opacity:0}}
                style={{...styles.contextMenu, top: contextMenu.y, left: contextMenu.x}}
            >
              <div style={styles.contextItem} onClick={() => contextMenu.item.type === 'folder' ? openFolder(contextMenu.item.id) : window.open(contextMenu.item.url, '_blank')}>📂 Open</div>
              <div style={styles.contextItem} onClick={() => toggleStar(contextMenu.item.id)}>⭐ Star</div>
              <div style={{...styles.contextItem, color: '#ff4444'}} onClick={() => deleteItem(contextMenu.item.id)}>❌ Delete</div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Scoped Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
        .key-hover:hover { background: rgba(0, 242, 255, 0.15) !important; color: #00f2ff; }
        .item-card-hover:hover { background: #18181b !important; transform: translateY(-4px); border-color: #27272a !important; box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        .item-card-hover { cursor: pointer; transition: all 0.2s ease; }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
      `}</style>
    </div>
  );
};

// --- Professional Style Object ---
const styles = {
  pageWrapper: { height: '100vh', backgroundColor: '#050507', color: '#fff', fontFamily: "'JetBrains Mono', monospace", overflow: 'hidden', position: 'relative' },
  gridOverlay: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))', backgroundSize: '100% 2px, 3px 100%' },
  centerStage: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 },
  glassCard: { background: 'rgba(10, 10, 15, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid', borderRadius: '24px', padding: '40px', width: '320px', textAlign: 'center' },
  secureHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '30px' },
  pulseDot: { width: '8px', height: '8px', background: '#00f2ff', borderRadius: '50%', boxShadow: '0 0 10px #00f2ff' },
  titleMain: { fontSize: '14px', letterSpacing: '2px', margin: 0 },
  codeDisplay: { display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' },
  codeSlot: { width: '45px', height: '55px', border: '1px solid #333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  activeDot: { width: '12px', height: '12px', background: '#00f2ff', borderRadius: '50%', boxShadow: '0 0 15px #00f2ff' },
  keypadGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
  key: { padding: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#fff', cursor: 'pointer', transition: '0.2s' },
  biometricSection: { marginTop: '30px' },
  fingerprintBox: { width: '60px', height: '60px', margin: '0 auto', border: '1px solid #333', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  laser: { position: 'absolute', width: '100%', height: '2px', background: '#00f2ff', top: 0, boxShadow: '0 0 10px #00f2ff', animation: 'scan 2s infinite linear' },
  scanText: { fontSize: '10px', color: '#555', marginTop: '10px' },
  driveContainer: { display: 'flex', height: '100vh', background: '#09090b', color: '#e4e4e7', fontFamily: "'Inter', sans-serif" },
  sidebar: { width: '260px', padding: '24px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #18181b', background: '#0c0c0e' },
  logoBox: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
  logoIcon: { width: '32px', height: '32px', background: '#4285F4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' },
  logoText: { fontSize: '18px', fontWeight: '700' },
  sideBtn: { background: 'transparent', color: '#a1a1aa', border: 'none', padding: '12px', textAlign: 'left', cursor: 'pointer', fontSize: '14px', borderRadius: '10px', display:'flex', gap:'10px' },
  primaryBtn: { background: '#fff', color: '#000', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', margin: '10px 0' },
  uploadLabel: { border: '1px solid #27272a', padding: '12px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', fontSize: '13px', color: '#a1a1aa' },
  divider: { height: '1px', background: '#18181b', margin: '20px 0' },
  sideNav: { display: 'flex', flexDirection: 'column', gap: '4px' },
  navItem: { padding: '10px 16px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', color: '#71717a', transition: '0.2s' },
  navActive: { padding: '10px 16px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', background: 'rgba(66,133,244,0.1)', color: '#4285F4' },
  storageBox: { marginTop: '20px', padding: '16px', background: '#141417', borderRadius: '16px', border: '1px solid #18181b' },
  storageBarBg: { height: '6px', background: '#27272a', borderRadius: '10px', overflow: 'hidden' },
  storageBarFill: { height: '100%', borderRadius: '10px' },
  logoutBtn: { padding: '12px', borderRadius: '12px', border: '1px solid #3f0f0f', background: 'transparent', color: '#ff4444', cursor: 'pointer', marginTop: 'auto', fontSize: '13px' },
  mainContent: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  topHeader: { height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', borderBottom: '1px solid #18181b' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '15px' },
  circleBtn: { width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #27272a', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  searchContainer: { background: '#141417', borderRadius: '10px', padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '10px', width: '300px', border: '1px solid #18181b' },
  searchInput: { background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '13px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '15px' },
  statusBadge: { padding: '4px 10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '20px', fontSize: '11px' },
  profileCircle: { width: '35px', height: '35px', background: '#4285F4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold' },
  profileDropdown: { position: 'absolute', top: '65px', right: '30px', width: '220px', background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '16px', padding: '20px', zIndex: 100 },
  scrollArea: { flex: 1, padding: '30px', overflowY: 'auto' },
  breadcrumb: { marginBottom: '25px', fontSize: '13px', letterSpacing: '0.5px' },
  link: { color: '#4285F4', cursor: 'pointer', fontWeight: '600' },
  fileGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' },
  itemCard: { background: '#0c0c0e', border: '1px solid #18181b', borderRadius: '16px', padding: '16px', textAlign: 'center' },
  iconWrapper: { fontSize: '32px', marginBottom: '12px' },
  itemName: { fontSize: '13px', fontWeight: '500', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  itemMeta: { display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#52525b', borderTop: '1px solid #18181b', paddingTop: '8px' },
  actionRow: { display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' },
  actionIconBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px' },
  contextMenu: { position: 'fixed', background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '8px', padding: '5px', zIndex: 1000, minWidth: '150px' },
  contextItem: { padding: '8px 12px', fontSize: '13px', cursor: 'pointer', borderRadius: '5px', color: '#eee' }
};

export default ULMPersonal;