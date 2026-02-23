import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import { supabase } from '../supabaseClient'; 

const ULMPersonal = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  const [userProfile] = useState({
    name: "Admin User",
    email: "admin@ulm.cloud",
    joinDate: "Feb 2026",
    role: "System Administrator"
  });

  const [activeMenu, setActiveMenu] = useState('drive'); 

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ulm_drive_v4');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Personal Projects', type: 'folder', parent: 0, date: '20/02/2026', isStarred: false, isArchived: false, sizeRaw: 0 },
      { id: 2, name: 'System Assets', type: 'folder', parent: 0, date: '18/02/2026', isStarred: false, isArchived: false, sizeRaw: 0 }
    ];
  });
  
  const [currentFolder, setCurrentFolder] = useState(0);
  const [folderHistory, setFolderHistory] = useState([0]);

  // Storage Stats calculation
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

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('ulm_drive_v4', JSON.stringify(items));
  }, [items]);

  // Close context menu on click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleMenuChange = (menu) => {
    setIsLoading(true);
    setActiveMenu(menu);
    if(menu !== 'drive') setCurrentFolder(0);
    setTimeout(() => setIsLoading(false), 500);
  };

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

  // --- Actions ---
  const toggleStar = (id) => setItems(items.map(item => item.id === id ? { ...item, isStarred: !item.isStarred } : item));
  
  const toggleArchive = (id) => setItems(items.map(item => item.id === id ? { ...item, isArchived: !item.isArchived } : item));

  const deleteItem = (id) => {
    if(window.confirm("Are you sure you want to permanently delete this?")) {
        setItems(items.filter(item => item.id !== id));
    }
  };

  const renameItem = (id) => {
    const oldName = items.find(i => i.id === id).name;
    const newName = prompt("Rename to:", oldName);
    if(newName) setItems(items.map(item => item.id === id ? { ...item, name: newName } : item));
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, item });
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const usedBytes = items.reduce((acc, item) => acc + (item.sizeRaw || 0), 0);
    if (usedBytes + file.size > 5 * 1024 * 1024 * 1024) {
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

  const getFileIcon = (item) => {
    if (item.type === 'folder') return '📂';
    const fmt = item.format?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'svg', 'webp'].includes(fmt)) return '🖼️';
    if (['mp4', 'mov', 'avi'].includes(fmt)) return '🎥';
    if (['pdf'].includes(fmt)) return '📕';
    if (['zip', 'rar', '7z'].includes(fmt)) return '📦';
    if (['mp3', 'wav'].includes(fmt)) return '🎵';
    return '📄';
  };

  const handleVerify = () => {
    if (inputCode === "4472") {
      setScanning(true);
      setTimeout(() => { setIsAuthorized(true); setScanning(false); }, 1500);
    } else {
      setError(true); setInputCode("");
      setTimeout(() => setError(false), 800);
    }
  };

  const openFolder = (id) => {
    if (activeMenu !== 'drive') return;
    setFolderHistory([...folderHistory, id]);
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

  const createFolder = () => {
    const name = prompt("Enter Folder Name:");
    if (name) setItems([...items, { id: Date.now(), name, type: 'folder', parent: currentFolder, date: new Date().toLocaleDateString(), isStarred: false, isArchived: false, sizeRaw: 0 }]);
  };

  const handleLogout = () => window.confirm("Logout?") && navigate('/');

  if (!isAuthorized) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.gridOverlay}></div>
        <div style={styles.centerStage}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{...styles.glassCard, borderColor: error ? '#ff3c3c' : 'rgba(0, 242, 255, 0.2)'}}>
            <div style={styles.secureHeader}>
              <div style={styles.pulseDot}></div>
              <h2 style={styles.titleMain}>SECURE TERMINAL</h2>
            </div>
            <div style={styles.codeDisplay}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{...styles.codeSlot, borderColor: inputCode.length > i ? '#00f2ff' : '#333'}}>
                  {inputCode.length > i && <div style={styles.activeDot} />}
                </div>
              ))}
            </div>
            <div style={styles.keypadGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "OK"].map((key) => (
                <button key={key} onClick={() => {
                  if (key === "C") setInputCode("");
                  else if (key === "OK") handleVerify();
                  else if (inputCode.length < 4) setInputCode(prev => prev + key);
                }} style={styles.key} className="key-hover">{key}</button>
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

  return (
    <div style={styles.driveContainer} onContextMenu={(e)=>e.preventDefault()}>
      <aside style={styles.sidebar}>
        <div style={styles.logoBox}><div style={styles.logoIcon}>U</div> <span style={styles.logoText}>ULM <span style={{color: '#4285F4'}}>CLOUD</span></span></div>
        
        <button onClick={() => handleMenuChange('drive')} style={styles.sideBtn}><span>🏠</span> Dashboard</button>
        <button onClick={createFolder} style={styles.primaryBtn}><span>＋</span> New Folder</button>
        
        <label style={styles.uploadLabel}>
          {uploading ? "⏳ Processing..." : "📤 Upload Asset"}
          <input type="file" onChange={uploadFile} disabled={uploading} style={{display:'none'}}/>
        </label>

        <div style={styles.divider}></div>

        <nav style={styles.sideNav}>
          <div onClick={() => handleMenuChange('drive')} style={activeMenu === 'drive' ? styles.navActive : styles.navItem}>☁️ My Drive</div>
          <div onClick={() => handleMenuChange('recent')} style={activeMenu === 'recent' ? styles.navActive : styles.navItem}>🕒 Recent</div>
          <div onClick={() => handleMenuChange('starred')} style={activeMenu === 'starred' ? styles.navActive : styles.navItem}>⭐ Starred</div>
          <div onClick={() => handleMenuChange('archive')} style={activeMenu === 'archive' ? styles.navActive : styles.navItem}>🗑️ Archive</div>
        </nav>

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

        <button onClick={handleLogout} style={styles.logoutBtn}>Terminate Session</button>
      </aside>

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
            <div 
                style={styles.profileCircle} 
                onClick={() => setShowProfile(!showProfile)}
                title="View Profile"
            >
                {userProfile.name.charAt(0)}
            </div>
            
            <AnimatePresence>
                {showProfile && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        style={styles.profileDropdown}
                    >
                        <div style={styles.profileHeader}>
                            <div style={styles.largeAvatar}>{userProfile.name.charAt(0)}</div>
                            <h4 style={{margin: '10px 0 2px 0'}}>{userProfile.name}</h4>
                            <p style={{fontSize: '11px', color: '#71717a', margin: 0}}>{userProfile.email}</p>
                        </div>
                        <div style={styles.profileStats}>
                             <div style={styles.statItem}>
                                 <span>Role</span>
                                 <span style={{color: '#4285F4'}}>{userProfile.role}</span>
                             </div>
                             <div style={styles.statItem}>
                                 <span>Joined</span>
                                 <span>{userProfile.joinDate}</span>
                             </div>
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
            {activeMenu === 'drive' && folderHistory.length > 1 && (
                folderHistory.map((folderId, idx) => {
                    if (folderId === 0) return null;
                    const folder = items.find(i => i.id === folderId);
                    return (
                        <span key={folderId} style={{cursor:'pointer'}}>
                            <span style={{opacity:0.4, margin: '0 8px'}}>/</span>
                            <span onClick={() => {
                                const newHistory = folderHistory.slice(0, idx + 1);
                                setFolderHistory(newHistory);
                                setCurrentFolder(folderId);
                            }}>{folder?.name}</span>
                        </span>
                    )
                })
            )}
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
                    layout initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} 
                    key={item.id} style={styles.itemCard} className="item-card-hover" 
                    onDoubleClick={() => item.type === 'folder' ? openFolder(item.id) : window.open(item.url, '_blank')}
                    onContextMenu={(e) => handleContextMenu(e, item)}
                  >
                    <div style={styles.iconWrapper}>{getFileIcon(item)}</div>
                    <div style={styles.itemInfo}>
                      <p style={styles.itemName}>{item.name}</p>
                      <div style={styles.itemMeta}>
                        <span onClick={(e) => {e.stopPropagation(); toggleStar(item.id)}} style={{cursor:'pointer', fontSize: '16px'}}>
                          {item.isStarred ? '⭐' : '☆'}
                        </span>
                        <span style={{fontSize: '10px', opacity: 0.5}}>{item.size || (item.type === 'folder' ? 'Folder' : '')}</span>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div style={{gridColumn:'1/-1', textAlign:'center', opacity: 0.3, marginTop: '50px'}}>
                    <p>No items found in this section.</p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* Custom Context Menu */}
        <AnimatePresence>
          {contextMenu && (
            <motion.div 
                initial={{opacity:0, scale: 0.9}} animate={{opacity:1, scale: 1}}
                style={{...styles.contextMenu, top: contextMenu.y, left: contextMenu.x}}
            >
              <div style={styles.contextItem} onClick={() => {
                  if(contextMenu.item.type === 'folder') openFolder(contextMenu.item.id);
                  else window.open(contextMenu.item.url, '_blank');
              }}>📂 Open</div>
              <div style={styles.contextItem} onClick={() => renameItem(contextMenu.item.id)}>✏️ Rename</div>
              <div style={styles.contextItem} onClick={() => toggleStar(contextMenu.item.id)}>⭐ {contextMenu.item.isStarred ? 'Unstar' : 'Star'}</div>
              <div style={styles.contextItem} onClick={() => toggleArchive(contextMenu.item.id)}>🗑️ {contextMenu.item.isArchived ? 'Restore' : 'Archive'}</div>
              <div style={{...styles.contextItem, color: '#ff4444'}} onClick={() => deleteItem(contextMenu.item.id)}>❌ Delete Permanently</div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

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
  key: { padding: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#fff', cursor: 'pointer' },
  biometricSection: { marginTop: '30px' },
  fingerprintBox: { width: '60px', height: '60px', margin: '0 auto', border: '1px solid #333', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  laser: { position: 'absolute', width: '100%', height: '2px', background: '#00f2ff', top: 0, boxShadow: '0 0 10px #00f2ff' },
  scanText: { fontSize: '10px', color: '#555', marginTop: '10px' },
  driveContainer: { display: 'flex', height: '100vh', background: '#09090b', color: '#e4e4e7', fontFamily: "'Inter', sans-serif" },
  sidebar: { width: '280px', padding: '24px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #18181b', background: '#0c0c0e' },
  logoBox: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
  logoIcon: { width: '35px', height: '35px', background: '#4285F4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  logoText: { fontSize: '20px', fontWeight: '700' },
  sideBtn: { background: 'transparent', color: '#a1a1aa', border: 'none', padding: '12px', textAlign: 'left', cursor: 'pointer', fontSize: '14px', borderRadius: '10px' },
  primaryBtn: { background: '#fff', color: '#000', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', margin: '10px 0' },
  uploadLabel: { border: '1px solid #27272a', padding: '12px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', fontSize: '14px' },
  divider: { height: '1px', background: '#18181b', margin: '20px 0' },
  sideNav: { display: 'flex', flexDirection: 'column', gap: '4px' },
  navItem: { padding: '10px 16px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', color: '#71717a' },
  navActive: { padding: '10px 16px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', background: 'rgba(66,133,244,0.1)', color: '#4285F4' },
  storageBox: { marginTop: '20px', padding: '16px', background: '#141417', borderRadius: '16px', border: '1px solid #18181b' },
  storageBarBg: { height: '6px', background: '#27272a', borderRadius: '10px', overflow: 'hidden' },
  storageBarFill: { height: '100%', borderRadius: '10px' },
  logoutBtn: { padding: '12px', borderRadius: '12px', border: '1px solid #3f0f0f', background: 'transparent', color: '#ff4444', cursor: 'pointer', marginTop: 'auto' },
  mainContent: { flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' },
  topHeader: { height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderBottom: '1px solid #18181b', position: 'relative' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  circleBtn: { width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #27272a', background: 'transparent', color: '#fff', cursor: 'pointer' },
  searchContainer: { background: '#141417', borderRadius: '12px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px', width: '350px', border: '1px solid #18181b' },
  searchInput: { background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '15px' },
  statusBadge: { padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '20px', fontSize: '12px' },
  profileCircle: { width: '40px', height: '40px', background: '#4285F4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: '600', color: '#fff', fontSize: '16px', boxShadow: '0 0 15px rgba(66, 133, 244, 0.3)' },
  profileDropdown: { position: 'absolute', top: '75px', right: '40px', width: '240px', background: 'rgba(20, 20, 23, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid #27272a', borderRadius: '20px', padding: '20px', zIndex: 1000, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' },
  profileHeader: { textAlign: 'center', borderBottom: '1px solid #27272a', paddingBottom: '15px' },
  largeAvatar: { width: '60px', height: '60px', background: '#4285F4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '24px', fontWeight: 'bold' },
  profileStats: { margin: '15px 0' },
  statItem: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '5px 0' },
  closeProfileBtn: { width: '100%', padding: '10px', background: '#27272a', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontSize: '12px' },
  scrollArea: { flex: 1, padding: '40px', overflowY: 'auto' },
  breadcrumb: { marginBottom: '30px', fontSize: '14px', display: 'flex', alignItems: 'center' },
  link: { color: '#4285F4', cursor: 'pointer', fontWeight: '500' },
  fileGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' },
  itemCard: { background: '#0c0c0e', border: '1px solid #18181b', borderRadius: '20px', padding: '20px' },
  iconWrapper: { fontSize: '40px', marginBottom: '15px', textAlign: 'center' },
  itemName: { fontSize: '14px', fontWeight: '600', marginBottom: '10px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  itemMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#52525b', fontSize: '12px', borderTop: '1px solid #18181b', paddingTop: '10px' },
  contextMenu: { position: 'absolute', background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '12px', padding: '8px', zIndex: 2000, width: '180px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  contextItem: { padding: '10px 12px', fontSize: '13px', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s', textAlign: 'left', display: 'block', width: '100%', background: 'none', border: 'none', color: '#eee' }
};

export default ULMPersonal;