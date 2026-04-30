import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import StarRating from "../components/StarRating";
import { ChevronRight, ExternalLink, Github, Send } from "lucide-react";

interface Comment {
  id: number;
  username: string;
  date: string;
  text: string;
  avatarGradient: string;
}

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: "@pedro_dev",
      date: "Hace 2 días",
      text: "Excelente implementación del drag & drop! Me encanta cómo manejaste el estado. ¿Usaste alguna librería específica?",
      avatarGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      username: "@ana_codes",
      date: "Hace 1 día",
      text: "Muy buen diseño UI. Los colores y la tipografía están perfectos. ¿Podrías compartir tu sistema de diseño?",
      avatarGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 3,
      username: "@carlos_frontend",
      date: "Hace 5 horas",
      text: "Me sirvió mucho para mi proyecto! Gracias por compartirlo. Una pregunta: ¿cómo optimizaste el rendimiento con tantas cards?",
      avatarGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ]);

  // Datos del proyecto (en una app real vendría de una API/estado global)
  const project = {
    title: "TaskFlow - Tablero Kanban",
    author: {
      username: "@sarah_codes",
      role: "Junior Developer",
      avatarGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    tags: ["React", "TypeScript", "TailwindCSS", "Vite", "React DnD"],
    description: `TaskFlow es un sistema completo de gestión de proyectos con funcionalidad de tablero Kanban al estilo Trello. 

El proyecto incluye drag & drop fluido entre columnas, filtros avanzados por prioridad y estado, persistencia local usando localStorage, y un sistema de búsqueda en tiempo real.

La interfaz está construida con React y TypeScript para garantizar type-safety, usando TailwindCSS para el diseño responsivo. He implementado react-beautiful-dnd para la funcionalidad de arrastrar y soltar, optimizando el rendimiento con React.memo y useMemo.

Características principales:
• Crear, editar y eliminar tareas
• Arrastrar tareas entre columnas (To Do, In Progress, Done)
• Filtros por prioridad (Alta, Media, Baja)
• Sistema de etiquetas personalizables
• Persistencia de datos en localStorage
• Búsqueda y filtrado en tiempo real
• Diseño completamente responsivo
• Modo oscuro (próximamente)

Este proyecto fue creado como parte de mi portafolio para demostrar mis habilidades en gestión de estado complejo y UI interactiva.`,
    rating: 4.5,
    totalReviews: 23,
    liveUrl: "https://taskflow-demo.vercel.app",
    githubUrl: "https://github.com/sarah_codes/taskflow",
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      username: "@desarrollador",
      date: "Justo ahora",
      text: newComment,
      avatarGradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    };

    setComments([comment, ...comments]);
    setNewComment("");
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
          <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Detalle de Proyecto
              </h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>
                // Información completa del proyecto
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AvatarDropdown />
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: "#6B6880" }}>
            <button 
              onClick={() => navigate("/feed")}
              className="hover:underline"
              style={{ color: "#6B6880" }}
            >
              Feed
            </button>
            <ChevronRight size={16} />
            <span style={{ color: "#1A1A2E" }}>{project.title}</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl p-8 border mb-6" style={{ 
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            {/* Title */}
            <h1 className="text-4xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
              {project.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold border-2"
                style={{ 
                  background: project.author.avatarGradient,
                  borderColor: "rgba(124,58,237,0.4)"
                }}
              >
                S
              </div>
              <div>
                <p className="font-semibold" style={{ color: "#7C3AED" }}>
                  {project.author.username}
                </p>
                <p className="text-sm" style={{ color: "#6B6880" }}>
                  {project.author.role}
                </p>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: "#EDE9FA",
                    color: "#7C3AED",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: "#1A1A2E" }}>
                {project.description}
              </p>
            </div>

            {/* Project Links */}
            <div className="flex gap-4 mb-8">
              <button
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "#7C3AED" }}
              >
                Ver proyecto en vivo
                <ExternalLink size={20} />
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold border-2 transition-all hover:bg-opacity-10"
                style={{ 
                  borderColor: "#7C3AED",
                  color: "#7C3AED",
                  backgroundColor: "transparent"
                }}
              >
                Ver código en GitHub
                <Github size={20} />
              </button>
            </div>

            {/* Rating */}
            <div className="border-t pt-8" style={{ borderColor: "#EDE9FA" }}>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <StarRating initialRating={project.rating} size={28} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                    {project.rating.toFixed(1)}
                  </p>
                  <p className="text-sm" style={{ color: "#6B6880" }}>
                    {project.totalReviews} valoraciones
                  </p>
                </div>
              </div>
            </div>
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