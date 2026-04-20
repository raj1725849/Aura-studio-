import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, LogOut, Plus, Trash2, X, Bell, ArrowRight, Camera, Edit2, Image as ImageIcon, Eye, Grid } from 'lucide-react';

const ADMIN_EMAIL = "admin@studio.com";
const ADMIN_PASSWORD = "studio123";

interface Project {
  id: number;
  title: string;
  roomType: string;
  style: string;
  city: string;
  completionTime: string;
  budgetRange: string;
  description: string;
  categoryLabel: string;
  status: 'published' | 'draft';
  displayOrder: number;
  images: {
    cover: string;
    detail1: string;
    detail2: string;
    detail3: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'all' | 'form'>('all');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imageSlot, setImageSlot] = useState<{projectId: number, slot: string} | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    const checkAdmin = () => setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    checkAdmin();
    loadProjects();

    const handleOpenImageManager = (e: any) => {
      setImageSlot(e.detail);
      setIsImageManagerOpen(true);
    };

    const handleOpenCms = (e: any) => {
      if (e.detail?.tab === 'edit') {
        setEditingProject(e.detail.project);
        setActiveTab('form');
      } else if (e.detail?.tab === 'add') {
        setEditingProject(null);
        setActiveTab('form');
      }
      setIsCmsOpen(true);
    };

    const handleConfirmDelete = (e: any) => {
      setIsCmsOpen(true);
      setActiveTab('all');
      setDeleteConfirm(e.detail.id);
    };

    window.addEventListener('storage', checkAdmin);
    window.addEventListener('open-image-manager', handleOpenImageManager);
    window.addEventListener('open-admin-panel', handleOpenCms);
    window.addEventListener('confirm-delete-project', handleConfirmDelete);

    return () => {
      window.removeEventListener('storage', checkAdmin);
      window.removeEventListener('open-image-manager', handleOpenImageManager);
      window.removeEventListener('open-admin-panel', handleOpenCms);
      window.removeEventListener('confirm-delete-project', handleConfirmDelete);
    };
  }, []);

  useEffect(() => {
    if (isAdmin) document.body.classList.add('admin-mode');
    else document.body.classList.remove('admin-mode');
  }, [isAdmin]);

  const loadProjects = () => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) setProjects(JSON.parse(saved));
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setIsLoginOpen(false);
      showToast('✦ Access Granted: Use "MANAGE PORTFOLIO" button at the top', 'success');
      window.dispatchEvent(new Event('storage'));
    } else {
      showToast('Security Breach Prevented', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    setIsCmsOpen(false);
    showToast('Session Terminated', 'success');
    window.dispatchEvent(new Event('storage'));
  };

  const updateProjectData = (updatedProjects: Project[]) => {
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    window.dispatchEvent(new Event('portfolio-updated'));
  };

  const saveProject = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const newProject: Project = {
      id: editingProject?.id || Date.now(),
      title: data.title as string,
      roomType: data.roomType as string,
      style: (data.style as string) || 'Contemporary',
      city: data.city as string,
      completionTime: (data.completionTime as string) || '4-6 Weeks',
      budgetRange: (data.budgetRange as string) || 'Premium',
      description: data.description as string,
      categoryLabel: (data.categoryLabel as string) || (data.roomType as string).toUpperCase(),
      status: (data.status as any) || 'published',
      displayOrder: parseInt(data.displayOrder as string) || 1,
      images: {
        cover: (data.img_cover as string) || editingProject?.images.cover || '',
        detail1: (data.img_detail1 as string) || editingProject?.images.detail1 || '',
        detail2: (data.img_detail2 as string) || editingProject?.images.detail2 || '',
        detail3: (data.img_detail3 as string) || editingProject?.images.detail3 || '',
      },
      createdAt: editingProject?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let updated;
    if (editingProject) {
      updated = projects.map(p => p.id === editingProject.id ? newProject : p);
    } else {
      updated = [...projects, newProject];
    }

    updateProjectData(updated);
    showToast(`✦ Project ${editingProject ? 'Updated' : 'Added'} Successfully`);
    setActiveTab('all');
    setEditingProject(null);
  };

  const deleteProject = (id: number) => {
    const updated = projects.filter(p => p.id !== id);
    updateProjectData(updated);
    setDeleteConfirm(null);
    showToast('✦ Project Deleted Successfully');
  };

  const updateImage = (projectId: number, slot: string, src: string) => {
    const updated = projects.map(p => {
      if (p.id === projectId) {
        const newImages = { ...p.images };
        const key = slot.replace('-', '') as keyof typeof newImages;
        (newImages as any)[key] = src;
        return { ...p, images: newImages, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    updateProjectData(updated);
    
    const imgElement = document.querySelector(`[data-project-id="${projectId}"][data-img-slot="${slot}"] img`) as HTMLImageElement;
    const wrapper = document.querySelector(`[data-project-id="${projectId}"][data-img-slot="${slot}"]`);
    if (imgElement && wrapper) {
      imgElement.src = src;
      wrapper.classList.remove('img-failed');
    }
  };

  return (
    <>
      {/* Admin Toolbar */}
      {isAdmin && (
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 w-full h-[60px] bg-burgundy text-white z-[2000] flex items-center justify-between px-10 shadow-lg"
        >
          <div className="text-[12px] font-bold tracking-[3px] uppercase">✦ ADMIN MODE</div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => { setIsCmsOpen(true); setActiveTab('all'); }}
              className="bg-white/10 border border-white/20 px-6 py-2 rounded-sm text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all font-bold cursor-pointer"
            >
              📁 MANAGE PORTFOLIO
            </button>
            <button onClick={handleLogout} className="text-[10px] uppercase tracking-widest border border-white/40 text-white/70 px-4 py-2 rounded-sm hover:border-white hover:text-white transition-all font-bold flex items-center gap-2">
              <LogOut size={12} /> LOGOUT
            </button>
          </div>
        </motion.div>
      )}

      {/* Hidden Admin Entry (Bottom Left) */}
      <div id="admin-trigger" className="fixed bottom-4 left-4 z-[900]">
        {!isAdmin && (
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="text-[10px] font-sans tracking-[3px] uppercase text-stone-800/30 hover:text-stone-900 transition-colors"
          >
            Admin
          </button>
        )}
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-stone-900/40 backdrop-blur-3xl overflow-y-auto pt-20 pb-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white p-20 rounded-[60px] shadow-2xl flex flex-col gap-10"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif italic tracking-tighter text-stone-900">Aura Studio.</h2>
                <div className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">CURATOR ACCESS</div>
              </div>

              <form onSubmit={handleLogin} className="space-y-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-stone-400">Identity</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email" 
                    className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-950 transition-colors"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-stone-400">Keycode</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password" 
                    className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-950 transition-colors"
                  />
                </div>
                <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-full font-bold uppercase text-[12px] tracking-[0.3em] hover:bg-stone-800 transition-all flex items-center justify-center gap-3">
                  ENTER DASHBOARD <ArrowRight size={16} />
                </button>
              </form>

              <button 
                onClick={() => setIsLoginOpen(false)}
                className="text-[10px] uppercase font-bold tracking-widest text-stone-300 hover:text-stone-900"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main CMS Sidebar Panel */}
      <AnimatePresence>
        {isCmsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCmsOpen(false)}
              className="fixed inset-0 z-[2999] bg-stone-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="cms-sidebar fixed right-0 top-0 h-screen w-full lg:w-[600px] z-[3000] bg-[#0A0A0A] border-l border-burgundy flex flex-col p-12 overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-20">
                <div>
                  <h2 className="text-3xl font-serif text-white italic">PORTFOLIO MANAGEMENT</h2>
                  <p className="text-[11px] font-sans text-white/40 tracking-wider">Curation Panel v1.0.4</p>
                </div>
                <button onClick={() => setIsCmsOpen(false)} className="w-12 h-12 rounded-sm border border-white/20 flex items-center justify-center text-white hover:border-burgundy">
                  <X />
                </button>
              </div>

              <div className="flex gap-10 border-b border-white/10 mb-12">
                <button 
                  onClick={() => { setActiveTab('all'); setEditingProject(null); }}
                  className={`pb-4 text-[13px] uppercase tracking-widest transition-all ${activeTab === 'all' ? 'text-white border-b-2 border-burgundy' : 'text-white/40 border-b-2 border-transparent hover:text-white'}`}
                >
                  📁 Manage Collection
                </button>
                <button 
                  onClick={() => { setActiveTab('form'); setEditingProject(null); }}
                  className={`pb-4 text-[13px] uppercase tracking-widest transition-all ${activeTab === 'form' && !editingProject ? 'text-white border-b-2 border-burgundy' : 'text-white/40 border-b-2 border-transparent hover:text-white'}`}
                >
                  ➕ New Project
                </button>
              </div>

              {activeTab === 'all' ? (
                <div className="flex-1 space-y-6">
                  {projects.length > 0 ? (
                    projects.sort((a,b) => a.displayOrder - b.displayOrder).map(project => (
                      <div key={project.id} className="relative group">
                        {deleteConfirm === project.id ? (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-burgundy/10 border border-burgundy/30 p-8 rounded-sm flex flex-col gap-6"
                          >
                            <div className="flex items-center gap-4 text-white">
                               <Trash2 className="text-burgundy" size={24} />
                               <span className="text-[14px]">Are you sure you want to delete <strong className="text-burgundy">'{project.title}'</strong>? This project and its assets will be permanently removed from the public curate.</span>
                            </div>
                            <div className="flex gap-4">
                              <button onClick={() => deleteProject(project.id)} className="bg-burgundy px-10 py-3 text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:bg-white hover:text-stone-900 transition-all">Yes, Confirm Delete</button>
                              <button onClick={() => setDeleteConfirm(null)} className="border border-white/20 px-8 py-3 text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:bg-white/10 transition-all">Cancel</button>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="grid grid-cols-[100px_1fr_auto] gap-8 bg-white/[0.04] border border-white/[0.08] p-6 rounded-sm items-center hover:border-burgundy/60 transition-all">
                            <div className="w-[100px] h-[100px] bg-[#1a0a0a] rounded-sm overflow-hidden flex items-center justify-center border border-white/5">
                              {project.images.cover ? (
                                <img src={project.images.cover} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon size={30} strokeWidth={1} className="text-white/10" />
                              )}
                            </div>
                            <div>
                                <h4 className="text-white text-[16px] font-bold tracking-tight mb-1">{project.title}</h4>
                                <p className="text-white/40 text-[12px] line-clamp-1 mb-3">{project.description}</p>
                                <div className="flex items-center gap-3">
                                  <span className="text-burgundy text-[9px] uppercase font-bold tracking-widest border border-burgundy/30 px-2 py-0.5">{project.roomType}</span>
                                  <span className="text-stone-500 text-[9px] uppercase font-bold tracking-widest bg-white/5 px-2 py-0.5">{project.city}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button 
                                  onClick={() => { setEditingProject(project); setActiveTab('form'); }}
                                  className="h-10 w-10 flex items-center justify-center rounded-sm text-white/40 border border-white/15 hover:bg-burgundy hover:text-white transition-all cursor-pointer"
                                  title="Edit Narrative & Data"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button 
                                  onClick={() => setDeleteConfirm(project.id)}
                                  className="h-10 w-10 flex items-center justify-center rounded-sm text-white/40 border border-white/15 hover:bg-stone-800 hover:text-burgundy transition-all cursor-pointer"
                                  title="Destroy Record"
                                >
                                  <Trash2 size={16} />
                                </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-32 border border-dashed border-white/10 rounded-lg">
                      <Grid className="mx-auto text-white/10 mb-6" size={48} strokeWidth={1} />
                      <p className="text-white/40 text-[13px] uppercase tracking-[2px]">Your portfolio archive is currently empty.</p>
                      <button onClick={() => setActiveTab('form')} className="mt-6 text-burgundy font-bold text-[13px] cursor-pointer hover:tracking-[3px] transition-all">✦ CURATE NEW WORK</button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={saveProject} className="flex-1 space-y-12 pb-20">
                   <div className="space-y-10">
                     <div className="space-y-4">
                       <label className="text-[11px] uppercase tracking-[2px] text-burgundy font-bold flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-burgundy" /> 
                         Project Title *
                       </label>
                       <input 
                         name="title" 
                         defaultValue={editingProject?.title}
                         required 
                         className="w-full bg-transparent border-b border-white/10 hover:border-white/30 py-4 text-white text-2xl font-serif italic outline-none focus:border-burgundy transition-colors"
                         placeholder="e.g. The Ethereal Twilight Lounge"
                       />
                     </div>

                     <div className="grid grid-cols-2 gap-10">
                       <div className="space-y-4">
                         <label className="text-[11px] uppercase tracking-[2px] text-stone-500 font-bold">Room Category *</label>
                         <select 
                           name="roomType"
                           defaultValue={editingProject?.roomType || 'Living Room'}
                           className="w-full bg-[#0A0A0A] border-b border-white/10 py-4 text-white text-[15px] outline-none focus:border-burgundy cursor-pointer transition-colors"
                         >
                           <option>Living Room</option>
                           <option>Master Bedroom</option>
                           <option>Kids Room</option>
                           <option>Gourmet Kitchen</option>
                           <option>Balcony & Outdoors</option>
                           <option>Home Office</option>
                           <option>Full Home Makeover</option>
                         </select>
                       </div>
                       <div className="space-y-4">
                         <label className="text-[11px] uppercase tracking-[2px] text-stone-500 font-bold">Location *</label>
                         <input 
                           name="city" 
                           defaultValue={editingProject?.city}
                           required 
                           className="w-full bg-transparent border-b border-white/10 py-4 text-white text-[15px] outline-none focus:border-burgundy transition-colors"
                           placeholder="e.g. Mumbai, Bengaluru"
                         />
                       </div>
                     </div>

                     <div className="space-y-4">
                       <label className="text-[11px] uppercase tracking-[2px] text-stone-500 font-bold">Project Narrative (Description) *</label>
                       <textarea 
                         name="description" 
                         defaultValue={editingProject?.description}
                         required 
                         rows={6}
                         className="w-full bg-white/[0.03] border border-white/10 p-6 text-white text-[15px] font-sans leading-relaxed outline-none focus:border-burgundy transition-colors resize-none rounded-sm"
                         placeholder="Craft the story behind this design..."
                       />
                     </div>

                     <div className="space-y-10 border-t border-white/10 pt-16">
                        <div>
                           <h4 className="text-white text-xl font-serif italic mb-2 tracking-tight">Portfolio Visuals</h4>
                           <p className="text-[11px] text-white/30 uppercase tracking-[2px]">Assign high-resolution perspective shots</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8">
                           {[
                             { id: 'cover', label: 'Primary Cover Image' },
                             { id: 'detail1', label: 'Perspective Detail I' },
                             { id: 'detail2', label: 'Perspective Detail II' },
                             { id: 'detail3', label: 'Perspective Detail III' }
                           ].map((slot) => (
                             <div key={slot.id} className="space-y-4 group">
                               <label className="text-[10px] uppercase tracking-[2px] text-stone-500 font-bold">{slot.label}</label>
                               <div className="relative aspect-video bg-white/[0.02] border border-dashed border-white/10 group-hover:border-burgundy/50 transition-colors flex items-center justify-center overflow-hidden rounded-sm">
                                  {(() => {
                                    const currentUrl = (editingProject?.images as any)?.[slot.id];
                                    return currentUrl ? (
                                      <img id={`preview-${slot.id}`} src={currentUrl} className="w-full h-full object-cover" />
                                    ) : (
                                      <Camera size={24} className="text-white/5" />
                                    );
                                  })()}
                                  <div className="absolute inset-0 bg-stone-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                     <button 
                                       type="button"
                                       onClick={() => {
                                         const input = document.createElement('input');
                                         input.type = 'file';
                                         input.accept = 'image/*';
                                         input.onchange = (e: any) => {
                                           const file = e.target.files[0];
                                           if(file) {
                                             const reader = new FileReader();
                                             reader.onload = (re: any) => {
                                                const urlField = document.querySelector(`input[name="img_${slot.id}"]`) as HTMLInputElement;
                                                const previewImg = document.getElementById(`preview-${slot.id}`) as HTMLImageElement;
                                                if(urlField) urlField.value = re.target.result;
                                                if(previewImg) previewImg.src = re.target.result;
                                                else {
                                                   // Handle creating placeholder if it didn't exist
                                                    const parent = document.getElementById(`preview-${slot.id}`)?.parentElement;
                                                    if(parent) parent.innerHTML = `<img id="preview-${slot.id}" src="${re.target.result}" class="w-full h-full object-cover" />`;
                                                }
                                             };
                                             reader.readAsDataURL(file);
                                           }
                                         };
                                         input.click();
                                       }}
                                       className="bg-burgundy text-white px-4 py-2 text-[9px] font-bold uppercase tracking-widest cursor-pointer"
                                     >
                                       Upload Media
                                     </button>
                                  </div>
                               </div>
                               <input 
                                 name={`img_${slot.id}`} 
                                 defaultValue={(editingProject?.images as any)?.[slot.id]}
                                 className="w-full bg-transparent border-b border-white/5 py-2 text-white/40 text-[11px] outline-none focus:border-burgundy transition-colors"
                                 placeholder="Or paste asset URL here..."
                               />
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-6 pt-10">
                        <div className="space-y-4">
                           <label className="text-[11px] uppercase tracking-[2px] text-stone-500 font-bold">Style Preference</label>
                           <input name="style" defaultValue={editingProject?.style} className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-burgundy" placeholder="Japandi, etc." />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[11px] uppercase tracking-[2px] text-stone-500 font-bold">Delivery Timeline</label>
                           <input name="completionTime" defaultValue={editingProject?.completionTime} className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-burgundy" placeholder="60 Days" />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[11px] uppercase tracking-[2px] text-stone-500 font-bold">Display Order</label>
                           <input type="number" name="displayOrder" defaultValue={editingProject?.displayOrder || 1} className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-burgundy" />
                        </div>
                     </div>
                   </div>

                   <div className="pt-16 flex gap-6 sticky bottom-0 bg-[#0A0A0A] py-6 z-10 border-t border-white/5">
                     <button type="submit" className="flex-1 bg-burgundy text-white py-6 uppercase text-[13px] font-bold tracking-[4px] hover:bg-white hover:text-stone-900 transition-all cursor-pointer shadow-2xl">
                       ✦ {editingProject ? 'UPDATE CURATE ENTRY' : 'COMMIT TO ARCHIVE'}
                     </button>
                     <button type="button" onClick={() => { setActiveTab('all'); setEditingProject(null); }} className="px-10 border border-white/10 text-white/30 uppercase text-[10px] font-bold tracking-[2px] cursor-pointer hover:text-white transition-colors">Discard</button>
                   </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Manager Modal */}
      <AnimatePresence>
        {isImageManagerOpen && imageSlot && (
          <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-8">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[600px] bg-[#0A0A0A] border border-burgundy p-12 flex flex-col gap-10"
            >
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif text-white">IMAGE Curation</h3>
                    <p className="text-burgundy italic text-[11px] uppercase tracking-widest">{imageSlot.slot}</p>
                  </div>
                  <button onClick={() => setIsImageManagerOpen(false)} className="text-white/40 hover:text-white transition-colors">
                    <X />
                  </button>
              </div>

              <div className="space-y-12">
                  <div className="w-full h-64 bg-white/[0.03] border border-dashed border-burgundy/30 flex items-center justify-center overflow-hidden">
                     {(() => {
                        const currentImg = (projects.find(p => p.id === imageSlot.projectId)?.images as any)[imageSlot.slot.replace('-','')];
                        return currentImg ? (
                          <img src={currentImg} className="w-full h-full object-cover" />
                        ) : (
                          <Camera size={40} strokeWidth={1} className="text-white/20" />
                        );
                     })()}
                  </div>

                  <div className="space-y-10">
                     <div className="space-y-4">
                       <label className="text-[10px] uppercase tracking-[2px] text-white/30 font-bold">Option I: Remote Assets (URL)</label>
                       <div className="flex gap-4">
                         <input 
                           id="img-url-input"
                           type="text" 
                           placeholder="External URL..."
                           className="flex-1 bg-transparent border-b border-white/20 py-4 text-white text-lg outline-none focus:border-burgundy"
                         />
                         <button 
                           onClick={() => {
                             const url = (document.getElementById('img-url-input') as HTMLInputElement).value;
                             if (url) updateImage(imageSlot.projectId, imageSlot.slot, url);
                           }}
                           className="px-8 border border-white/20 text-[10px] uppercase font-bold text-white hover:border-burgundy transition-all"
                         >
                           Save
                         </button>
                       </div>
                     </div>

                     <div>
                        <label className="text-[10px] uppercase tracking-[2px] text-white/30 font-bold mb-6 block">Option II: Local Storage (Upload)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          id="admin-file-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => updateImage(imageSlot.projectId, imageSlot.slot, reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label 
                          htmlFor="admin-file-upload" 
                          className="w-full py-5 border border-white/10 hover:border-burgundy flex items-center justify-center gap-4 cursor-pointer group transition-all"
                        >
                           <Plus size={18} className="text-burgundy" />
                           <span className="text-[11px] uppercase tracking-[2px] text-white font-bold">Choose Media File</span>
                        </label>
                     </div>
                  </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Persistence Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`fixed bottom-10 right-10 z-[3000] px-10 py-5 rounded-sm shadow-2xl flex items-center gap-4 border-l-4 
              ${toast.type === 'success' ? 'bg-burgundy text-white' : 'bg-stone-900 border-burgundy text-stone-300'}`}
          >
            <Bell size={18} className="opacity-50" />
            <span className="text-[11px] font-bold uppercase tracking-widest">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
