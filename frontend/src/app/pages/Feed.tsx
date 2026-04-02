import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, MessageCircle, ExternalLink, Search, UserPlus, Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import StarRating from "../components/StarRating";
import AddProjectModal from "../components/AddProjectModal";
import { getTechTagColors } from "../utils/techTagColors";

interface Project {
  id: number;
  username: string;
  title: string;
  description: string;
  tags: string[];
  views: number;
  comments: number;
  rating: number;
  avatarGradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    username: "@sarah_codes",
    title: "TaskFlow - Tablero Kanban",
    description: "Sistema completo de gestión de proyectos con drag & drop, filtros avanzados y persistencia local.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    views: 342,
    comments: 12,
    rating: 4,
    avatarGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    username: "@mike_dev",
    title: "WeatherNow Dashboard",
    description: "Dashboard meteorológico con integración de API en tiempo real, gráficos interactivos y geolocalización.",
    tags: ["Next.js", "Chart.js", "API"],
    views: 289,
    comments: 8,
    rating: 4,
    avatarGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    username: "@anna_builds",
    title: "CodeSnippet Manager",
    description: "Organizador de snippets de código con syntax highlighting, búsqueda avanzada y sincronización en la nube.",
    tags: ["Vue", "Firebase", "Sass"],
    views: 456,
    comments: 15,
    rating: 5,
    avatarGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

const featuredDevelopers = [
  { name: "María G.", username: "@maria_codes", avatarGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { name: "Carlos M.", username: "@carlos_dev", avatarGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { name: "Laura S.", username: "@laura_backend", avatarGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
];

const popularCommunities = [
  { name: "React Developers", members: 2345, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { name: "TypeScript Masters", members: 1823, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { name: "CSS Artists", members: 1456, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
];

const topTechnologies = [
  { name: "React", usage: 85, color: "#61DAFB" },
  { name: "TypeScript", usage: 72, color: "#3178C6" },
  { name: "Node.js", usage: 68, color: "#68A063" },
  { name: "Python", usage: 54, color: "#FFD43B" },
  { name: "Vue", usage: 48, color: "#42B883" },
];

export default function Feed() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Feed");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleAddProject = (projectData: {
    title: string;
    description: string;
    tags: string[];
    projectLink: string;
    githubLink: string;
  }) => {
    console.log("Nuevo proyecto agregado:", projectData);
    // En una app real, aquí enviarías los datos al backend
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Purple brand stripe at top */}
        <div style={{ 
          height: "2px", 
          background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 100%)" 
        }} />

        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Feed
              </h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>
                // Descubre y califica proyectos de desarrolladores
              </p>
            </div>
            
            {/* Search Bar */}
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
                  placeholder="Buscar..."
                  className="w-full pl-9 pr-3 py-2 rounded-full border focus:outline-none focus:ring-2 text-sm"
                  style={{ 
                    backgroundColor: "#F0EEFA",
                    borderColor: "#DDD6FE",
                    color: "#1A1A2E"
                  }}
                />
              </div>
            </div>

            <AvatarDropdown />
          </div>
        </div>

        {/* Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-8 py-8 flex gap-8">
          {/* Feed Cards */}
          <div className="flex-1 space-y-4">
            {/* Add Project Card - Dashed Border */}
            <button
              onClick={() => setIsAddProjectModalOpen(true)}
              className="w-full rounded-xl py-8 transition-all border-2 border-dashed hover:border-solid"
              style={{ 
                backgroundColor: "#F5F3FF",
                borderColor: "#7C3AED",
              }}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  <Plus size={24} className="text-white" />
                </div>
                <p className="font-semibold" style={{ color: "#7C3AED" }}>
                  Publica tu primer proyecto
                </p>
              </div>
            </button>

            {projects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-white rounded-xl p-4 transition-all relative border"
                style={{ 
                  borderColor: "#EDE9FA",
                  boxShadow: hoveredCard === project.id 
                    ? "0 8px 24px rgba(124,58,237,0.12)" 
                    : "0 2px 12px rgba(124,58,237,0.06)",
                  borderLeft: `3px solid ${getTechTagColors(project.tags[0]).color}`,
                }}
              >
                <div className="flex-1">
                  {/* Username with Avatar */}
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2"
                      style={{ 
                        background: project.avatarGradient,
                        borderColor: "rgba(124,58,237,0.4)"
                      }}
                    >
                      {project.username[1].toUpperCase()}
                    </div>
                    <p className="text-xs" style={{ color: "#6B6880" }}>{project.username}</p>
                  </div>

                  {/* Title - Clickeable */}
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="text-left w-full group"
                  >
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:underline" style={{ color: "#7C3AED" }}>
                      {project.title}
                      <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </button>

                  {/* Description */}
                  <p className="mb-3 leading-relaxed text-sm" style={{ color: "#1A1A2E" }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 mb-3">
                    {project.tags.map((tag) => {
                      const tagColors = getTechTagColors(tag);
                      return (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium"
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

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#EDE9FA" }}>
                    <div className="flex items-center gap-4" style={{ color: "#6B6880" }}>
                      <div className="flex items-center gap-1.5">
                        <Eye size={16} />
                        <span className="text-xs">{project.views}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle size={16} />
                        <span className="text-xs">{project.comments}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-0.5">
                      <StarRating initialRating={project.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="w-72 space-y-6 flex-shrink-0">
            {/* Featured Developers */}
            <div className="bg-white rounded-xl p-6 border" style={{ 
              borderColor: "#EDE9FA",
              boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
            }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "#1A1A2E" }}>
                Developers destacados
              </h3>
              <div className="space-y-4">
                {featuredDevelopers.map((dev) => (
                  <div key={dev.username} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold border-2"
                        style={{ 
                          background: dev.avatarGradient,
                          borderColor: "rgba(124,58,237,0.4)"
                        }}
                      >
                        {dev.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{dev.name}</p>
                        <p className="text-xs" style={{ color: "#9B8EC4" }}>{dev.username}</p>
                      </div>
                    </div>
                    <button
                      className="px-3 rounded-full text-xs font-medium border transition-all hover:bg-opacity-10"
                      style={{ 
                        height: "28px",
                        borderColor: "#7C3AED",
                        color: "#7C3AED",
                        backgroundColor: "transparent"
                      }}
                    >
                      Seguir
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Technologies This Week */}
            <div className="bg-white rounded-xl p-6 border" style={{ 
              borderColor: "#EDE9FA",
              boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
            }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "#1A1A2E" }}>
                Top tecnologías esta semana
              </h3>
              <div className="space-y-3">
                {topTechnologies.map((tech) => {
                  const techColors = getTechTagColors(tech.name);
                  return (
                    <div key={tech.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>
                          {tech.name}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: techColors.color }}>
                          {tech.usage}%
                        </span>
                      </div>
                      <div 
                        className="w-full h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: "#F3F4F6" }}
                      >
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${tech.usage}%`,
                            backgroundColor: techColors.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSubmit={handleAddProject}
      />
    </div>
  );
}