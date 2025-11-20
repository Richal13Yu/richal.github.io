import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  Eye, 
  Layers, 
  Brain, 
  ChevronDown, 
  BookOpen,
  MapPin,
  UserCircle,
  School,
  ArrowUpRight,
  Database,
  PlayCircle,
  Image as ImageIcon
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Resume Data ---
const PROFILE = {
  name: "Chenhao(Richal) Yu",
  title: "Robotics MSE @ Johns Hopkins",
  university: "Johns Hopkins University",
  location: "Baltimore, MD, USA",
  email: "cyu85@jh.edu",
  github: "https://github.com", // Replace with actual link
  linkedin: "https://linkedin.com", // Replace with actual link
  imageUrl: "https://example.com/your-profile-picture.jpg", // Placeholder
  education: [
    {
      school: "Johns Hopkins University",
      degree: "M.S. in Robotics",
      time: "Sep 2024 - May 2026",
      location: "Baltimore, MD",
      courses: "Computer Vision, Robot Kinematics, Deep Learning, CIS, Haptics, AR, Sensor-Based Algorithms"
    },
    {
      school: "Jiangsu Ocean University",
      degree: "B.E. in Mechanical Design & Automation",
      time: "Sep 2018 - Jun 2022",
      location: "Lianyungang, CN",
      courses: "Theoretical Mechanics, Manufacturing Tech, Hydraulic Transmission"
    }
  ]
};

const RESEARCH = [
  {
    title: "Digital Twin Simulation for Surgical Robotics",
    role: "Research Assistant",
    lab: "LCSR (Advised by Dr. Mathias Unberath)",
    icon: <Layers className="w-6 h-6 text-blue-600" />,
    objective: "Enable safe offline validation and zero-shot skill transfer by synchronizing physical & virtual workspaces.",
    details: [
      "Generated 6-DoF peg poses using SAM2-based segmentation & foundation-pose inference.",
      "Calibrated stereo camera extrinsics via OpenCV; utilized ROS topics for PSM joint transforms.",
      "Built 60 Hz ROS↔Genesis bridge for real-time virtual twin updates."
    ],
    result: "Achieved sub-millimeter accuracy in sim; executed zero-shot peg-transfer on dVRK.",
    tags: ["Digital Twin", "ROS", "Genesis", "OpenCV"]
  },
  {
    title: "Imitation Learning Trajectory Generation",
    role: "Research Assistant",
    lab: "LCSR",
    icon: <Brain className="w-6 h-6 text-orange-600" />,
    objective: "Enable robust long-horizon motion generation for surgical peg-transfer tasks.",
    details: [
      "Fine-tuned pre-trained ACT Transformer on dVRK sequences, unfreezing specific layers.",
      "Applied temporal cropping, Gaussian noise, and time-warping for robustness.",
      "Deployed as TorchScript-based ROS 2 Foxy node for real-time control."
    ],
    result: "Achieved disturbance-resilient trajectory synthesis & reliable generalization.",
    tags: ["Imitation Learning", "Transformer", "PyTorch", "ROS 2"]
  },
  {
    title: "LLM-Agent Surgical Planning",
    role: "Research Assistant",
    lab: "LCSR",
    icon: <Terminal className="w-6 h-6 text-green-600" />,
    objective: "Develop a cognitive framework integrating LLMs and VLMs for surgical automation.",
    details: [
      "Used CLIP-based VLMs for frame classification & prompt generation.",
      "Integrated GPT-3.5-Turbo via LangChain to parse directives into ROS 2 service calls.",
      "Closed-loop 1 Hz dynamic replanning based on VLM state recognition."
    ],
    result: "Reliable autonomous multi-phase execution with robust recovery.",
    tags: ["LLM", "VLM", "LangChain", "MoveIt 2"]
  },
  {
    title: "3D Soft-Tissue Reconstruction",
    role: "Research Assistant",
    lab: "LCSR",
    icon: <Eye className="w-6 h-6 text-red-600" />,
    objective: "Real-time, anatomically accurate digital twins of deformable soft tissues.",
    details: [
      "Designed transformer-based 3D Gaussian model inspired by GS-LRM.",
      "Trained on elastic warping sequences with photometric augmentations.",
      "Integrated with NVIDIA Kaolin for >30 FPS streaming in Genesis."
    ],
    result: "High-fidelity, real-time 3D reconstruction from monocular input.",
    tags: ["3D Gaussians", "Computer Vision", "NVIDIA Kaolin"]
  },
  {
    title: "Automated Surgical Video Annotation",
    role: "Research Assistant",
    lab: "LCSR",
    icon: <Database className="w-6 h-6 text-yellow-600" />,
    objective: "Self-supervised pipeline for instrument keypoint detection & action segmentation.",
    details: [
      "Bootstrapped with pt_track (React+Node.js) & cotracker.",
      "Trained ViTPose/HRNet for keypoints; MS-TCN++ for segmentation.",
      "Adapted DETR/MaskFormer for affordance prediction."
    ],
    result: "Modular self-training annotation pipeline automating multi-level labeling.",
    tags: ["ViTPose", "React", "ActionFormer", "DETR"]
  }
];

const PUBLICATIONS = [
  {
    status: "Accepted",
    title: "Towards Robust Algorithms for Surgical Phase Recognition via Digital Twin Representation",
    venue: "DT4H 2025",
    authors: "H. Ding, ..., C. Yu, ..., M. Unberath"
  },
  {
    status: "Under Review",
    title: "Autonomous Tumor Resection for Central Airway Obstruction via Imitation Learning",
    venue: "Submitted",
    authors: "N. Yilmaz, ..., C. Yu, ..., A. Krieger"
  },
  {
    status: "In Progress",
    title: "Data Efficient Imitation Learning with Digital Twin Synthesis for Surgical Robotics",
    venue: "Target: Top Robotics Conference",
    authors: "C. Yu (First Author)"
  }
];

// --- Projects Data (New) ---
// Instruction: Uncomment 'mediaUrl' and 'mediaType' to show image/video.
const PROJECTS = [
  {
    title: "STdenoise",
    category: "Computer Vision / Deep Learning",
    description: "Developed a VGG16-based autoencoder to denoise MERFISH spatial transcriptomic images. Achieved >99% error reduction and integrated RAFT optical flow models to correct gene expression shifts.",
    tags: ["VGG16", "PyTorch"],
    // Example for Image:
    // mediaUrl: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000", 
    // mediaType: "image"
  },
  {
    title: "Wearable Haptic System",
    category: "Haptics / Embedded Systems",
    description: "Built a vibration-based wearable for upper limb posture correction using IMUs. Designed a \"double alternate\" feedback pattern that reduced user error rates by 30%.",
    tags: ["Arduino", "Haptics"],
    // Example for Video:
    // mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
    // mediaType: "video"
  }
];

const SKILLS = [
  { category: "Core", items: ["Python", "C++", "Matlab"] },
  { category: "Robotics & AI", items: ["ROS/ROS2", "PyTorch", "OpenCV", "MoveIt 2", "Genesis", "PyBullet"] },
  { category: "Tools", items: ["Git", "Docker", "Linux", "SolidWorks", "Arduino"] },
  { category: "Web/Vis", items: ["React", "Flask", "Three.js (Concept)", "Tkinter"] }
];

// --- Components ---

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-8 border-l-4 border-blue-500 pl-4">
    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
    {subtitle && <p className="text-slate-500 mt-1 text-sm font-medium">{subtitle}</p>}
  </div>
);

const TechBadge = ({ text }) => (
  <span className="px-2 py-1 rounded text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 tracking-wide uppercase">
    {text}
  </span>
);

const Card = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4 }}
    className={`bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 relative overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const SidebarItem = ({ icon, text, href }) => {
  const Content = (
    <div className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors duration-200">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

  return href ? (
    <a href={href} target={href.startsWith('http') ? "_blank" : "_self"} rel="noreferrer">
      {Content}
    </a>
  ) : Content;
};

const App = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 selection:bg-orange-100 selection:text-orange-800">
      
      {/* Top Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-orange-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-7xl mx-auto md:flex">
        
        {/* LEFT SIDEBAR - Sticky */}
        <aside className="md:w-[320px] md:h-screen md:sticky md:top-0 p-8 flex flex-col bg-white/50 backdrop-blur-xl border-r border-slate-200/60 relative z-20">
          
          {/* Profile Header */}
          <div className="mb-10">
             <div className="w-32 h-32 rounded-full bg-slate-200 mb-6 overflow-hidden border-4 border-white shadow-lg mx-auto md:mx-0">
                {PROFILE.imageUrl && PROFILE.imageUrl !== "https://example.com/your-profile-picture.jpg" ? (
                  <img src={PROFILE.imageUrl} alt={PROFILE.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100 text-slate-400">
                    <UserCircle size={64} />
                  </div>
                )}
             </div>
             
             <h1 className="text-2xl font-extrabold text-slate-900 mb-2 text-center md:text-left">
               {PROFILE.name}
             </h1>
             <p className="text-blue-600 font-medium text-sm mb-1 text-center md:text-left flex items-center justify-center md:justify-start gap-1">
               {PROFILE.title}
             </p>
             <p className="text-slate-500 text-xs text-center md:text-left flex items-center justify-center md:justify-start gap-1">
               <School size={12} /> {PROFILE.university}
             </p>
             <p className="text-slate-400 text-xs text-center md:text-left flex items-center justify-center md:justify-start gap-1 mt-1">
               <MapPin size={12} /> {PROFILE.location}
             </p>
          </div>

          {/* Navigation / Contact Links */}
          <div className="space-y-5 flex-1">
            <SidebarItem 
              icon={<Mail size={18} />} 
              text={PROFILE.email} 
              href={`mailto:${PROFILE.email}`} 
            />
            <SidebarItem 
              icon={<Github size={18} />} 
              text="Github" 
              href={PROFILE.github} 
            />
            <SidebarItem 
              icon={<Linkedin size={18} />} 
              text="LinkedIn" 
              href={PROFILE.linkedin} 
            />
            
            <div className="w-full h-[1px] bg-slate-200 my-6"></div>

            {/* Page Nav */}
            <nav className="space-y-3 hidden md:block">
              <a href="#about" className="block text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">About Me</a>
              <a href="#research" className="block text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">Research</a>
              <a href="#publications" className="block text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">Publications</a>
              <a href="#projects" className="block text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">Projects</a>
              <a href="#skills" className="block text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">Skills</a>
              <a href="#education" className="block text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">Education</a>
            </nav>
          </div>

          {/* Bottom copyright */}
          <div className="mt-auto pt-6 text-xs text-slate-300 text-center md:text-left hidden md:block">
             © {new Date().getFullYear()} Chenhao Yu
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-12 lg:p-16 space-y-24 max-w-5xl">
          
          {/* 1. ABOUT ME */}
          <section id="about" className="scroll-mt-10">
             <SectionHeader title="About Me" />
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-orange-500"></div>
               <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  I am a Robotics Master’s student at Johns Hopkins University, focusing on surgical robotics, digital twins, and 3D perception. I’m excited about building intelligent robotic systems that can understand complex environments, work safely with humans, and eventually take on parts of delicate tasks such as surgery with consistency and reliability.
                </p>
                <p>
                  Currently, I work in the <span className="font-semibold text-blue-600">ARCADE Lab</span> under Prof. Mathias Unberath, where I develop real-time digital twin systems for surgical robots and explore imitation learning for autonomous surgical assistance. My work spans multi-camera 3D reconstruction, sim-to-real learning pipelines, and LLM/VLM-based supervisory frameworks that use visual feedback to verify and refine robotic actions in a closed loop.
                </p>
                <p>
                  Previously, I was advised by Prof. Louis Whitcomb, which gave me a strong foundation in robotics, control, and experimental systems. I have also collaborated closely with surgical robotics teams on projects involving the da Vinci Research Kit and related platforms, aligning algorithmic work with real clinical needs.
                </p>
               </div>
             </div>
          </section>

          {/* 2. RESEARCH */}
          <section id="research" className="scroll-mt-10">
            <SectionHeader title="Research Experience" subtitle="LCSR & ARCADE Lab" />
            <div className="grid gap-6">
              {RESEARCH.map((item, idx) => (
                <Card key={idx} className="group p-6">
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-white group-hover:border-orange-200 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-sm font-mono text-slate-500 mb-3">{item.role}</p>
                      
                      <div className="text-sm text-slate-600 mb-4 bg-slate-50/80 p-3 rounded border-l-2 border-blue-300">
                        <span className="font-semibold text-slate-700">Objective:</span> {item.objective}
                      </div>

                      <ul className="space-y-2 mb-4">
                        {item.details.map((d, i) => (
                          <li key={i} className="text-sm text-slate-600 flex gap-2">
                            <span className="text-orange-400 mt-1">›</span> {d}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                         {item.tags.map(t => <TechBadge key={t} text={t} />)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. PUBLICATIONS */}
          <section id="publications" className="scroll-mt-10">
            <SectionHeader title="Publications" />
            <div className="grid gap-4">
              {PUBLICATIONS.map((pub, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">
                   <div className="mt-1">
                     <BookOpen size={20} className="text-slate-300" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-800 text-lg leading-snug">{pub.title}</h4>
                     <p className="text-slate-500 text-sm mt-1">{pub.authors}</p>
                     <div className="flex items-center gap-3 mt-2">
                       <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        pub.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                        pub.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                        'bg-orange-50 text-orange-600'
                      }`}>
                        {pub.status}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{pub.venue}</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. PROJECTS */}
          <section id="projects" className="scroll-mt-10">
            <SectionHeader title="Projects" />
            <div className="grid md:grid-cols-2 gap-6">
               {PROJECTS.map((project, idx) => (
                 <Card key={idx} className="flex flex-col !p-0"> {/* Use !p-0 to allow full-bleed media */}
                   
                   {/* Optional Media Display */}
                   {project.mediaUrl && (
                     <div className="w-full h-48 bg-slate-100 relative overflow-hidden group">
                       {project.mediaType === 'video' ? (
                         <video 
                           src={project.mediaUrl} 
                           controls 
                           className="w-full h-full object-cover"
                         />
                       ) : (
                         <img 
                           src={project.mediaUrl} 
                           alt={project.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                         />
                       )}
                       
                       {/* Type Indicator Badge */}
                       <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white p-1.5 rounded-full">
                          {project.mediaType === 'video' ? <PlayCircle size={14} /> : <ImageIcon size={14} />}
                       </div>
                     </div>
                   )}

                   {/* Project Content */}
                   <div className="p-6 flex flex-col flex-1">
                     <div className="mb-4">
                       <h3 className="font-bold text-lg text-slate-800">{project.title}</h3>
                       <p className="text-xs font-mono text-blue-500">{project.category}</p>
                     </div>
                     <p className="text-sm text-slate-600 mb-4 flex-1 leading-relaxed">
                       {project.description}
                     </p>
                     <div className="flex gap-2 mt-auto pt-4 border-t border-slate-50">
                       {project.tags.map(tag => <TechBadge key={tag} text={tag} />)}
                     </div>
                   </div>
                 </Card>
               ))}
            </div>
          </section>

          {/* 5. SKILLS */}
          <section id="skills" className="scroll-mt-10">
             <SectionHeader title="Skills" />
             <div className="space-y-6">
                {SKILLS.map((group, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-widest">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(skill => (
                        <span key={skill} className="px-4 py-2 bg-white border border-slate-200 rounded shadow-sm text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* 6. EDUCATION (Moved to bottom) */}
          <section id="education" className="scroll-mt-10 mb-20">
             <SectionHeader title="Education" />
             <div className="relative border-l-2 border-slate-200 ml-3 space-y-10">
               {PROFILE.education.map((edu, idx) => (
                 <div key={idx} className="pl-8 relative group">
                   {/* Timeline Dot */}
                   <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-100 border-4 border-white shadow-sm group-hover:bg-orange-400 transition-colors"></div>
                   
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                     <h3 className="text-xl font-bold text-slate-800">{edu.school}</h3>
                     <span className="text-sm font-mono text-slate-400">{edu.time}</span>
                   </div>
                   <p className="text-blue-600 font-medium mb-2">{edu.degree}</p>
                   <p className="text-sm text-slate-500 flex items-center gap-1 mb-3">
                     <MapPin size={12} /> {edu.location}
                   </p>
                   <div className="bg-slate-50 p-3 rounded text-sm text-slate-600 leading-relaxed">
                     <span className="font-semibold text-slate-700">Core Courses:</span> {edu.courses}
                   </div>
                 </div>
               ))}
             </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default App;