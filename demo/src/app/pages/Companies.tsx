import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import { Briefcase, MapPin, Clock, ExternalLink, Search } from "lucide-react";
import { useState } from "react";
import { getTechTagColors } from "../utils/techTagColors";

interface JobOffer {
  id: number;
  title: string;
  company: string;
  location: string;
  platform: string;
  description: string;
  tags: string[];
  postedTime: string;
  logo: string;
  logoGradient: string;
  platformUrl: string;
  jobUrl: string;
  daysAgo: number;
  salary?: string;
  categories: string[]; // Add categories field
}

const jobOffers: JobOffer[] = [
  {
    id: 1,
    title: "Frontend Developer React",
    company: "TechCorp Solutions",
    location: "Madrid, España",
    platform: "LinkedIn",
    description: "Buscamos desarrollador Frontend con experiencia en React y TypeScript para unirse a nuestro equipo de innovación digital. Trabajo híbrido y gran ambiente de trabajo.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    postedTime: "Hace 2 días",
    logo: "T",
    logoGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    platformUrl: "https://www.linkedin.com/jobs/",
    jobUrl: "https://www.linkedin.com/jobs/view/frontend-developer-react-techcorp-solutions",
    daysAgo: 2,
    categories: ["Frontend"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Barcelona, España (Remoto)",
    platform: "InfoJobs",
    description: "Startup en crecimiento busca Full Stack Developer apasionado por la tecnología. Stack moderno: React, Node.js, MongoDB. Equity options disponibles.",
    tags: ["React", "Node.js", "MongoDB"],
    postedTime: "Hace 5 días",
    logo: "S",
    logoGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    platformUrl: "https://www.infojobs.net/",
    jobUrl: "https://www.infojobs.net/oferta/full-stack-developer-startupxyz",
    daysAgo: 5,
    categories: ["Full Stack", "Remote"],
  },
  {
    id: 3,
    title: "Junior Frontend Developer",
    company: "Digital Agency Pro",
    location: "Valencia, España",
    platform: "Indeed",
    description: "Perfecta oportunidad para developers junior que quieran crecer profesionalmente. Formación continua, proyectos reales para clientes internacionales.",
    tags: ["Vue", "JavaScript", "CSS"],
    postedTime: "Hace 1 semana",
    logo: "D",
    logoGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    platformUrl: "https://es.indeed.com/",
    jobUrl: "https://es.indeed.com/viewjob?jk=junior-frontend-developer-digital-agency-pro",
    daysAgo: 7,
    categories: ["Frontend", "Junior"],
  },
  {
    id: 4,
    title: "React Native Developer",
    company: "MobileFirst Inc",
    location: "Remoto (España)",
    platform: "LinkedIn",
    description: "Desarrollador móvil para crear aplicaciones innovadoras en iOS y Android. Experiencia con React Native y APIs RESTful requerida.",
    tags: ["React Native", "Mobile", "API"],
    postedTime: "Hace 3 días",
    logo: "M",
    logoGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    platformUrl: "https://www.linkedin.com/jobs/",
    jobUrl: "https://www.linkedin.com/jobs/view/react-native-developer-mobilefirst",
    daysAgo: 3,
    categories: ["Frontend", "Remote"],
  },
  {
    id: 5,
    title: "Backend Developer Node.js",
    company: "CloudTech Systems",
    location: "Sevilla, España",
    platform: "Glassdoor",
    description: "Únete a nuestro equipo backend para construir sistemas escalables y robustos. Microservicios, Docker, Kubernetes. Salario competitivo.",
    tags: ["Node.js", "Docker", "AWS"],
    postedTime: "Hace 4 días",
    logo: "C",
    logoGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    platformUrl: "https://www.glassdoor.com/",
    jobUrl: "https://www.glassdoor.com/job-listing/backend-developer-nodejs-cloudtech-systems",
    daysAgo: 4,
    salary: "€50,000 - €70,000",
    categories: ["Backend"],
  },
];

const filters = ["Todos", "Remote", "Junior", "Full Stack", "Frontend", "Backend"];

const getPlatformBadgeStyle = (platform: string) => {
  switch (platform) {
    case "LinkedIn":
      return { backgroundColor: "#0A66C2", color: "white" };
    case "InfoJobs":
      return { backgroundColor: "#FF6B35", color: "white" };
    case "Indeed":
      return { backgroundColor: "#7C3AED", color: "white" };
    case "Glassdoor":
      return { backgroundColor: "#0CAA41", color: "white" };
    default:
      return { backgroundColor: "#6B6880", color: "white" };
  }
};

const getPlatformBorderColor = (platform: string): string => {
  switch (platform) {
    case "LinkedIn":
      return "#0A66C2";
    case "InfoJobs":
      return "#FF6B35";
    case "Indeed":
      return "#7C3AED";
    case "Glassdoor":
      return "#0CAA41";
    default:
      return "#7C3AED";
  }
};

export default function Companies() {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter job offers based on selected category
  const filteredJobs = jobOffers.filter(job => {
    if (selectedFilter === "Todos") return true;
    return job.categories.includes(selectedFilter);
  });

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Purple brand stripe */}
        <div style={{ 
          height: "2px", 
          background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 100%)" 
        }} />

        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Empleo
              </h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>
                // Explora ofertas de trabajo
              </p>
            </div>
            
            {/* Search Bar */}
            {/*
            <div style={{ width: "220px" }}>
              <div className="relative">
                <Search 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: "#9B8EC4" }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar proyectos, developers..."
                  className="w-full pl-9 pr-3 py-2 rounded-full border focus:outline-none focus:ring-2 text-sm"
                  style={{ 
                    backgroundColor: "#F0EEFA",
                    borderColor: "#DDD6FE",
                    color: "#1A1A2E"
                  }}
                />
              </div>
            </div>
            */}

            <AvatarDropdown />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border-b" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-5xl mx-auto px-8 py-4 space-y-4">
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFilter === filter ? "text-white" : ""
                  }`}
                  style={
                    selectedFilter === filter
                      ? { backgroundColor: "#7C3AED", color: "white" }
                      : { backgroundColor: "#F0EEFA", color: "#6B6880" }
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
            
            {/* Job Search */}
            <div className="relative">
              <Search 
                size={18} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                style={{ color: "#9B8EC4" }}
              />
              <input
                type="text"
                placeholder="Buscar ofertas, empresas, tecnologías..."
                className="w-full pl-11 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: "white",
                  borderColor: "#DDD6FE",
                  color: "#1A1A2E"
                }}
              />
            </div>
          </div>
        </div>

        {/* Job Offers */}
        <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl overflow-hidden border transition-all hover:shadow-lg relative"
              style={{ 
                borderColor: "#EDE9FA",
                boxShadow: "0 2px 12px rgba(124,58,237,0.06)",
                borderLeft: `3px solid ${getPlatformBorderColor(job.platform)}`,
              }}
            >
              {/* "Nuevo" Badge */}
              {job.daysAgo <= 3 && (
                <div 
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "#10B981", color: "white" }}
                >
                  Nuevo
                </div>
              )}
              
              <div className="p-6">
                <div className="flex gap-4">
                  {/* Company Logo */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                    style={{ background: job.logoGradient }}
                  >
                    {job.logo}
                  </div>

                  {/* Job Details */}
                  <div className="flex-1">
                    {/* Title and Company */}
                    <h3 className="text-2xl font-bold mb-1" style={{ color: "#7C3AED" }}>
                      {job.title}
                    </h3>
                    <p className="text-lg font-semibold mb-3" style={{ color: "#1A1A2E" }}>{job.company}</p>

                    {/* Meta row with platform badge */}
                    <div className="flex items-center gap-3 text-sm mb-3" style={{ color: "#6B6880" }}>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {job.postedTime}
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={getPlatformBadgeStyle(job.platform)}
                      >
                        {job.platform}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mb-3 leading-relaxed" style={{ color: "#1A1A2E" }}>
                      {job.description}
                    </p>
                    
                    {/* Salary (if available) */}
                    {job.salary && (
                      <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: "#6B6880" }}>
                        <span>💶</span>
                        <span>{job.salary}</span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                      {job.tags.map((tag) => {
                        const tagColors = getTechTagColors(tag);
                        return (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: tagColors.backgroundColor,
                              color: tagColors.color,
                            }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* Actions - Smaller buttons, left-aligned */}
                    <div className="flex items-center gap-2.5" style={{ marginTop: "16px" }}>
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full font-medium text-white transition-all hover:opacity-90 flex items-center justify-center"
                        style={{ 
                          backgroundColor: "#7C3AED",
                          height: "36px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          fontSize: "14px"
                        }}
                      >
                        Aplicar ahora
                      </a>
                      <a 
                        href={job.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full font-medium transition-all hover:bg-opacity-10 border-2 flex items-center justify-center gap-1.5" 
                        style={{ 
                          color: getPlatformBadgeStyle(job.platform).backgroundColor,
                          backgroundColor: "transparent",
                          borderColor: getPlatformBadgeStyle(job.platform).backgroundColor,
                          height: "36px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          fontSize: "14px"
                        }}
                      >
                        Ver en {job.platform}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}