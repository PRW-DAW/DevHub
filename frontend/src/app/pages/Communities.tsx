import { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import { MessageSquare, Users, Plus, User, Clock, Search } from "lucide-react";

interface Thread {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isNew?: boolean;
  borderColor: string;
  iconGradient: string;
}

const categories = [
  "Todos",
  "Frontend",
  "Backend",
  "DevOps",
  "Mobile",
  "Diseño",
  "Ayuda",
  "Networking",
];

const threads: Thread[] = [
  {
    id: 1,
    title: "¿Cuál es el mejor framework para empezar en 2026?",
    author: "@maria_dev",
    category: "Frontend",
    replies: 34,
    views: 523,
    lastActivity: "Hace 10 min",
    isNew: true,
    borderColor: "#7C3AED",
    iconGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "Tips para optimizar rendimiento en React",
    author: "@carlos_tech",
    category: "Frontend",
    replies: 18,
    views: 342,
    lastActivity: "Hace 1 hora",
    borderColor: "#0EA5E9",
    iconGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 3,
    title: "Cómo estructurar una API RESTful escalable",
    author: "@laura_backend",
    category: "Backend",
    replies: 27,
    views: 456,
    lastActivity: "Hace 2 horas",
    borderColor: "#10B981",
    iconGradient: "linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)",
  },
  {
    id: 4,
    title: "Docker vs Kubernetes: ¿Cuándo usar cada uno?",
    author: "@juan_devops",
    category: "DevOps",
    replies: 42,
    views: 678,
    lastActivity: "Hace 3 horas",
    borderColor: "#F59E0B",
    iconGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: 5,
    title: "React Native vs Flutter: Mi experiencia",
    author: "@sofia_mobile",
    category: "Mobile",
    replies: 31,
    views: 512,
    lastActivity: "Hace 5 horas",
    isNew: true,
    borderColor: "#7C3AED",
    iconGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 6,
    title: "Principios de diseño para developers",
    author: "@pedro_design",
    category: "Diseño",
    replies: 15,
    views: 289,
    lastActivity: "Hace 1 día",
    borderColor: "#0EA5E9",
    iconGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    id: 7,
    title: "Ayuda: Error con TypeScript y React Router",
    author: "@ana_learning",
    category: "Ayuda",
    replies: 8,
    views: 156,
    lastActivity: "Hace 2 días",
    borderColor: "#10B981",
    iconGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 8,
    title: "Meetups de desarrollo en Madrid",
    author: "@networking_dev",
    category: "Networking",
    replies: 12,
    views: 234,
    lastActivity: "Hace 3 días",
    borderColor: "#F59E0B",
    iconGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

export default function Communities() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredThreads =
    selectedCategory === "Todos"
      ? threads
      : threads.filter((thread) => thread.category === selectedCategory);

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
          <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Comunidades
              </h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>
                // Conecta y comparte conocimiento
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "#7C3AED" }}
              >
                <Plus size={20} />
                Crear Hilo
              </button>
              <AvatarDropdown />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Categories */}
          <div className="bg-white rounded-xl p-6 mb-6 border" style={{ 
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#7C3AED" }}>
              Categorías
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "text-white"
                      : ""
                  }`}
                  style={
                    selectedCategory === category
                      ? { backgroundColor: "#7C3AED", color: "white" }
                      : { backgroundColor: "#F0EEFA", color: "#6B6880" }
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Threads List */}
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <div
                key={thread.id}
                className="bg-white rounded-xl overflow-hidden transition-all hover:shadow-lg relative"
                style={{ 
                  borderLeft: `1px solid #EDE9FA`,
                  borderRight: `1px solid #EDE9FA`,
                  borderBottom: `1px solid #EDE9FA`,
                  boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
                }}
              >
                {/* Colored Top Banner */}
                <div 
                  className="h-16 relative"
                  style={{ background: thread.iconGradient }}
                />

                {/* Category Icon - Overlapping banner */}
                <div 
                  className="absolute top-8 left-6 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white"
                  style={{ background: thread.iconGradient }}
                >
                  {thread.category[0]}
                </div>

                <div className="p-6 pt-12">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      {/* Title - Clickeable */}
                      <button
                        onClick={() => navigate(`/community/${thread.id}`)}
                        className="text-left w-full group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold group-hover:underline" style={{ color: "#1A1A2E" }}>
                            {thread.title}
                          </h4>
                          {thread.isNew && (
                            <span
                              className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                              style={{ backgroundColor: "#7C3AED" }}
                            >
                              NUEVO
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm mb-3" style={{ color: "#6B6880" }}>
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          {thread.author}
                        </div>
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: "#EDE9FA",
                            color: "#7C3AED",
                          }}
                        >
                          {thread.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          {thread.lastActivity}
                        </div>
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2" style={{ color: "#7C3AED" }}>
                            <MessageSquare size={16} />
                            <span className="font-medium">{thread.replies} respuestas</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: "#7C3AED" }}>
                            <Users size={16} />
                            <span className="font-medium">{thread.views} vistas</span>
                          </div>
                        </div>

                        <button
                          onClick={() => navigate(`/community/${thread.id}`)}
                          className="px-4 py-1.5 rounded-full font-semibold text-sm transition-all border-2 hover:bg-opacity-10"
                          style={{
                            borderColor: "#7C3AED",
                            color: "#7C3AED",
                            backgroundColor: "transparent"
                          }}
                        >
                          Unirse
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Thread Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 border"
            style={{ borderColor: "#EDE9FA" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: "#7C3AED" }}>
              Crear Nuevo Hilo
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  Título
                </label>
                <input
                  type="text"
                  placeholder="¿Sobre qué quieres hablar?"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#EDE9FA", focusRingColor: "#7C3AED" }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  Categoría
                </label>
                <select
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#EDE9FA", focusRingColor: "#7C3AED" }}
                >
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  Contenido
                </label>
                <textarea
                  rows={6}
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#EDE9FA", focusRingColor: "#7C3AED" }}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 px-6 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  Publicar
                </button>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-6 py-3 rounded-full font-semibold bg-white border-2 transition-all"
                  style={{ color: "#1A1A2E", borderColor: "#EDE9FA" }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}