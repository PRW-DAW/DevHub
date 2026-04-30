import { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import StarRating from "../components/StarRating";
import AddProjectModal from "../components/AddProjectModal";
import { Users, Eye, MessageCircle, ExternalLink, Send, Search, Plus } from "lucide-react";
import { getTechTagColors } from "../utils/techTagColors";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  views: number;
  comments: number;
  rating: number;
}

interface Comment {
  id: number;
  username: string;
  date: string;
  text: string;
  avatarGradient: string;
}

const userProjects: Project[] = [
  {
    id: 1,
    title: "Portfolio Personal v2",
    description: "Mi nuevo portfolio con animaciones 3D, modo oscuro y sección de blog integrada. Construido con Next.js 14 y Three.js.",
    tags: ["Next.js", "Three.js", "TypeScript"],
    views: 523,
    comments: 18,
    rating: 5,
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "Dashboard administrativo para tienda online con analytics en tiempo real, gestión de inventario y procesamiento de órdenes.",
    tags: ["React", "Node.js", "MongoDB"],
    views: 412,
    comments: 12,
    rating: 4,
  },
  {
    id: 3,
    title: "Chat App Real-time",
    description: "Aplicación de chat con WebSockets, rooms, notificaciones push y compartir archivos. Interfaz inspirada en Discord.",
    tags: ["Socket.io", "Express", "React"],
    views: 689,
    comments: 24,
    rating: 5,
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: "@laura_dev",
      date: "Hace 2 días",
      text: "Increíble trabajo! El portfolio está genial, me encanta la integración con Three.js. ¿Podrías compartir cómo optimizaste el rendimiento?",
      avatarGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      username: "@carlos_tech",
      date: "Hace 1 semana",
      text: "El dashboard de e-commerce es justo lo que estaba buscando como referencia. Código muy limpio y bien documentado!",
      avatarGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 3,
      username: "@maria_frontend",
      date: "Hace 2 semanas",
      text: "Excelente developer! Tus proyectos demuestran mucha dedicación. Seguiré tu trabajo de cerca.",
      avatarGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      username: "@visitante",
      date: "Justo ahora",
      text: newComment,
      avatarGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

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
        {/* Purple brand stripe */}
        <div style={{ 
          height: "2px", 
          background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 100%)" 
        }} />

        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Mi Perfil
              </h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>// Gestiona tu perfil profesional</p>
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

        {/* Profile Content */}
        <div className="max-w-5xl mx-auto px-8 py-6 space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border" style={{ 
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            {/* Cover Image with gradient and pattern - Reduced height */}
            <div 
              className="relative"
              style={{ 
                height: "70px",
                background: "linear-gradient(135deg, #EDE9FA 0%, #DDD6FE 100%)",
              }}
            >
              {/* Code pattern overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  opacity: 0.05,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='14' fill='%237C3AED'%3E%7B%7D%3C/text%3E%3Ctext x='40' y='20' font-family='monospace' font-size='14' fill='%237C3AED'%3E%3C%3E%3C/text%3E%3Ctext x='10' y='50' font-family='monospace' font-size='14' fill='%237C3AED'%3E%3B%3C/text%3E%3Ctext x='40' y='50' font-family='monospace' font-size='14' fill='%237C3AED'%3E()%3C/text%3E%3Ctext x='10' y='70' font-family='monospace' font-size='14' fill='%237C3AED'%3E%5B%5D%3C/text%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-6">
              {/* Avatar - Overlapping */}
              <div className="relative -mt-14 mb-4">
                <div
                  className="w-28 h-28 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold"
                  style={{ 
                    backgroundColor: "#7C3AED",
                    boxShadow: "0 4px 16px rgba(124, 58, 237, 0.3)"
                  }}
                >
                  P
                </div>
              </div>

              {/* Name and Edit Button on same line */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>
                    Pablo Desarrollador
                  </h2>
                  <p className="text-lg" style={{ color: "#9B8EC4" }}>// @desarrollador</p>
                </div>
                
                <button
                  className="px-5 py-2 rounded-full font-semibold transition-all hover:bg-opacity-10 border-2 text-sm"
                  style={{ 
                    borderColor: "#7C3AED",
                    color: "#7C3AED",
                    backgroundColor: "transparent"
                  }}
                >
                  Editar Perfil
                </button>
              </div>

              {/* Bio */}
              <p className="mb-6 max-w-2xl leading-relaxed" style={{ color: "#1A1A2E" }}>
                Desarrollador Frontend apasionado por crear experiencias de usuario
                excepcionales. Especializado en React, TypeScript y diseño de
                interfaces modernas. Siempre aprendiendo y compartiendo conocimiento
                con la comunidad.
              </p>

              {/* Roles */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3" style={{ color: "#9B8EC4" }}>// ROLES</p>
                <div className="flex gap-2">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium border"
                    style={{
                      backgroundColor: "#EDE9FA",
                      color: "#7C3AED",
                      borderColor: "#DDD6FE"
                    }}
                  >
                    Frontend Developer
                  </span>
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium border"
                    style={{
                      backgroundColor: "#EDE9FA",
                      color: "#7C3AED",
                      borderColor: "#DDD6FE"
                    }}
                  >
                    UI/UX Enthusiast
                  </span>
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium border"
                    style={{
                      backgroundColor: "#EDE9FA",
                      color: "#7C3AED",
                      borderColor: "#DDD6FE"
                    }}
                  >
                    Open Source Contributor
                  </span>
                </div>
              </div>

              {/* Stats - Horizontal single line */}
              <div className="flex items-center gap-6 py-4 px-6 rounded-lg border" style={{ 
                borderColor: "#EDE9FA",
                backgroundColor: "#FAFAFA"
              }}>
                <div className="flex items-center gap-2">
                  <Users size={20} style={{ color: "#7C3AED" }} />
                  <span className="font-bold" style={{ color: "#1A1A2E" }}>342</span>
                  <span className="text-sm" style={{ color: "#6B6880" }}>Seguidores</span>
                </div>
                <div style={{ width: "2px", height: "24px", backgroundColor: "#7C3AED", opacity: 0.2 }} />
                <div className="flex items-center gap-2">
                  <Users size={20} style={{ color: "#7C3AED" }} />
                  <span className="font-bold" style={{ color: "#1A1A2E" }}>198</span>
                  <span className="text-sm" style={{ color: "#6B6880" }}>Siguiendo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-xl p-8 border" style={{ 
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Mis Proyectos
              </h3>
              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="px-4 py-2 rounded-full font-semibold text-white transition-all hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: "#7C3AED" }}
              >
                <Plus size={18} />
                Nuevo Proyecto
              </button>
            </div>

            <div className="space-y-6">
              {userProjects.map((project) => (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="text-left border rounded-lg p-6 transition-all relative"
                  style={{ 
                    borderColor: hoveredProject === project.id ? "#7C3AED" : "#EDE9FA",
                    boxShadow: hoveredProject === project.id ? "0 4px 16px rgba(124,58,237,0.12)" : "none"
                  }}
                >
                  {/* External Link Icon */}
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="absolute top-6 right-6 transition-opacity"
                    style={{ 
                      color: "#7C3AED",
                      opacity: hoveredProject === project.id ? 1 : 0
                    }}
                  >
                    <ExternalLink size={18} />
                  </button>

                  {/* Title - Clickeable */}
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="text-left w-full"
                  >
                    <h4 className="text-xl font-bold mb-3 hover:underline" style={{ color: "#7C3AED" }}>
                      {project.title}
                    </h4>
                  </button>

                  {/* Description */}
                  <p className="mb-4 leading-relaxed" style={{ color: "#1A1A2E" }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 mb-4">
                    {project.tags.map((tag) => {
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

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#EDE9FA" }}>
                    <div className="flex items-center gap-6" style={{ color: "#6B6880" }}>
                      <div className="flex items-center gap-2">
                        <Eye size={18} />
                        <span className="text-sm">{project.views}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle size={18} />
                        <span className="text-sm">{project.comments}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1"><StarRating initialRating={project.rating} /></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Project Button */}
            <AddProjectModal
              isOpen={isAddProjectModalOpen}
              onClose={() => setIsAddProjectModalOpen(false)}
              onSubmit={handleAddProject}
            />
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl p-8 border" style={{ 
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
              Comentarios
            </h3>

            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="mb-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe tu comentario..."
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: "#EDE9FA",
                    backgroundColor: "#FAFAFA"
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  <Send size={18} />
                  Enviar
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <div key={comment.id}>
                  <div className="flex gap-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 border-2"
                      style={{ 
                        background: comment.avatarGradient,
                        borderColor: "rgba(124,58,237,0.4)"
                      }}
                    >
                      {comment.username[1].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold" style={{ color: "#7C3AED" }}>
                          {comment.username}
                        </p>
                        <p className="text-sm" style={{ color: "#9B8EC4" }}>
                          {comment.date}
                        </p>
                      </div>
                      <p style={{ color: "#1A1A2E" }}>
                        {comment.text}
                      </p>
                    </div>
                  </div>
                  {index < comments.length - 1 && (
                    <div className="mt-6 border-t" style={{ borderColor: "#EDE9FA" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}