import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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

const SEED_PROJECTS: Project[] = [
  {
    id: 1,
    title: "The Ethereal Twilight Lounge",
    roomType: "Living Room",
    style: "Contemporary",
    city: "Mumbai",
    completionTime: "60 Days",
    budgetRange: "Above ₹15L",
    description: "A masterclass in transparency and light. This double-height living sanctuary dissolves the boundary between interior comfort and the glowing city skyline with 20ft glass panels and modular illuminated seating.",
    categoryLabel: "ULTRA-LUXURY ARCHITECTURE",
    status: "published",
    displayOrder: 1,
    images: {
      cover: "https://storage.googleapis.com/test-media-files/input_file_0.png",
      detail1: "https://storage.googleapis.com/test-media-files/input_file_1.png",
      detail2: "https://storage.googleapis.com/test-media-files/input_file_2.png",
      detail3: "https://storage.googleapis.com/test-media-files/input_file_3.png"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "The Timber Zenith Atelier",
    roomType: "Full Home Makeover",
    style: "Japandi",
    city: "Bengaluru",
    completionTime: "90 Days",
    budgetRange: "Above ₹15L",
    description: "A multi-level residential masterpiece focused on the tactile warmth of walnut and oak. Featuring integrated LED shelving, a bespoke reading pit, and architectural staircases that double as sculpture.",
    categoryLabel: "ARTISANAL WOOD CRAFT",
    status: "published",
    displayOrder: 2,
    images: {
      cover: "https://storage.googleapis.com/test-media-files/input_file_2.png",
      detail1: "https://storage.googleapis.com/test-media-files/input_file_0.png",
      detail2: "https://storage.googleapis.com/test-media-files/input_file_3.png",
      detail3: "https://storage.googleapis.com/test-media-files/input_file_1.png"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function PortfolioImage({ src, alt, projectId, slot, isAdmin }: { src: string; alt: string; projectId: number; slot: string; isAdmin: boolean }) {
  const [failed, setFailed] = useState(!src || src === "");

  useEffect(() => {
    setFailed(!src || src === "");
  }, [src]);

  const handleEditClick = () => {
    window.dispatchEvent(new CustomEvent('open-image-manager', { 
      detail: { projectId, slot } 
    }));
  };

  return (
    <div className={`portfolio-img-wrapper ${failed ? 'img-failed' : ''}`} data-project-id={projectId} data-img-slot={slot}>
      <img 
        src={src} 
        alt={alt}
        className="portfolio-img"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      
      <div className="img-fallback">
        <span>Image Coming Soon</span>
        <span className="img-fallback-sub">Upload via Admin Panel</span>
      </div>

      {isAdmin && (
        <div className="admin-overlay" onClick={handleEditClick}>
          <span>🖼 Click to Change Image</span>
        </div>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  idx: number;
  isAdmin: boolean;
  onEdit: (p: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx, isAdmin, onEdit }) => {
  const handleDelete = () => {
    window.dispatchEvent(new CustomEvent('confirm-delete-project', { detail: project }));
  };

  return (
    <div className="relative group">
      <span className="absolute -top-10 sm:-top-20 right-0 text-[100px] sm:text-[180px] font-serif italic text-stone-900/[0.05] select-none -z-10 group-hover:text-stone-900/10 transition-colors">
        {project.id < 10 ? `0${project.id}` : project.id}
      </span>

      {isAdmin && (
        <div className="absolute top-4 right-4 z-[100] flex gap-2 line-clamp-1">
          <button 
            onClick={() => onEdit(project)}
            className="w-8 h-8 bg-stone-950/80 border border-burgundy/60 text-white rounded-[2px] flex items-center justify-center hover:bg-burgundy transition-colors"
            title="Edit Project"
          >
            ✏️
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-image-manager', { detail: { projectId: project.id, slot: 'cover' } }))}
            className="w-8 h-8 bg-stone-950/80 border border-burgundy/60 text-white rounded-[2px] flex items-center justify-center hover:bg-burgundy transition-colors"
            title="Manage Images"
          >
            🖼
          </button>
          <button 
            onClick={handleDelete}
            className="w-8 h-8 bg-stone-950/80 border border-burgundy/60 text-white rounded-[2px] flex items-center justify-center hover:bg-burgundy transition-colors"
            title="Delete Project"
          >
            🗑
          </button>
        </div>
      )}

      <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center lg:items-end`}>
        {/* Main Image Container */}
        <div className="relative w-full lg:w-1/2 overflow-hidden rounded-[30px] sm:rounded-[40px] aspect-[4/5] sm:aspect-[3/4] bg-stone-900 shadow-sm">
          <PortfolioImage 
            src={project.images.cover} 
            alt={`${project.title} — ${project.roomType} interior design`}
            projectId={project.id}
            slot="cover"
            isAdmin={isAdmin}
          />
        </div>

        {/* Content Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col gap-8 sm:gap-10 pb-4 lg:pb-10"
        >
          <div className="space-y-4 sm:space-y-6">
            <span className="text-[9px] sm:text-[10px] font-bold text-stone-800/40 tracking-[0.3em] uppercase">{project.categoryLabel}</span>
            <h3 className="text-4xl sm:text-5xl font-serif italic text-stone-900 leading-tight">{project.title}</h3>
            <p className="text-[14px] sm:text-[16px] font-sans text-stone-600 leading-relaxed max-w-sm">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 border-y border-stone-200 py-8 sm:py-10">
            <div>
              <div className="text-[8px] sm:text-[9px] uppercase font-bold text-stone-800/40 tracking-[2px] mb-2 sm:mb-3">LOCATION</div>
              <div className="text-xl sm:text-2xl font-serif italic text-stone-800">{project.city}</div>
            </div>
            <div>
              <div className="text-[8px] sm:text-[9px] uppercase font-bold text-stone-800/40 tracking-[2px] mb-2 sm:mb-3">TIMELINE</div>
              <div className="text-xl sm:text-2xl font-serif italic text-stone-800">{project.completionTime}</div>
            </div>
          </div>

          <div className="flex gap-10 opacity-40">
            <div>
              <div className="text-[7px] uppercase font-bold tracking-[2px] mb-1">STYLE</div>
              <div className="text-[12px] font-sans">{project.style}</div>
            </div>
            <div>
              <div className="text-[7px] uppercase font-bold tracking-[2px] mb-1">INVESTMENT</div>
              <div className="text-[12px] font-sans">{project.budgetRange}</div>
            </div>
          </div>

          <a 
            href="#contact" 
            className="glass p-1.5 rounded-full flex items-center pr-8 gap-5 cursor-pointer w-fit group hover:bg-stone-900 hover:text-white transition-all duration-500"
          >
            <div className="w-11 h-11 rounded-full bg-stone-900 text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight size={18} />
            </div>
            <span className="text-[11px] uppercase font-bold tracking-[0.1em]">Enquire Project</span>
          </a>
        </motion.div>
      </div>

      {/* Detail Images */}
      <div className="mt-12 sm:mt-20 flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6 sm:-mx-12 sm:px-12 lg:mx-0 lg:px-0">
        {[1, 2, 3].map((num) => {
          const slot = `detail${num}`;
          const imgUrl = (project.images as any)[slot];
          return (
            <motion.div
              key={num}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * num, duration: 0.5 }}
              className="flex-shrink-0 w-2/3 sm:w-1/2 lg:flex-1 aspect-[4/5] sm:aspect-square overflow-hidden rounded-[24px] sm:rounded-[30px] bg-stone-900"
            >
              <PortfolioImage 
                src={imgUrl} 
                alt="Detail shot"
                projectId={project.id}
                slot={`detail${num}`}
                isAdmin={isAdmin}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('portfolio_projects');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProjects(parsed.sort((a: any, b: any) => a.displayOrder - b.displayOrder));
        } catch (e) { console.error(e); }
      } else {
        setProjects(SEED_PROJECTS);
      }
    };

    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };

    loadData();
    checkAdmin();
    window.addEventListener('storage', loadData);
    window.addEventListener('portfolio-updated', loadData);
    return () => {
      window.removeEventListener('storage', loadData);
      window.removeEventListener('portfolio-updated', loadData);
    };
  }, []);

  const handleEditClick = (project: Project) => {
    window.dispatchEvent(new CustomEvent('open-admin-panel', { detail: { tab: 'edit', project } }));
  };

  return (
    <section id="portfolio" className="py-24 sm:py-48 bg-stone-50 overflow-hidden">
      <div className="max-w-[var(--max-width)] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-xl mb-16 sm:mb-32">
           <div className="flex items-center gap-4 mb-6 sm:mb-8">
             <div className="w-8 sm:w-12 h-[1px] bg-[#6D001A]" />
             <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.4em] text-[#6D001A] uppercase">Selected Archive</span>
           </div>
           <h2 className="text-stone-900 text-fluid-h2 mb-8 sm:mb-12 italic">
             Curated Stories in <br />
             <span className="font-light not-italic">Material & Form.</span>
           </h2>
        </div>

        <div className="space-y-24 sm:space-y-48 lg:space-y-72">
          {projects.filter(p => p.status === 'published').map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              idx={index} 
              isAdmin={isAdmin}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
