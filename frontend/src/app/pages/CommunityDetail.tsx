import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import { ChevronRight, MessageSquare, ThumbsUp, Send, User, Clock, Search } from "lucide-react";

interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  avatarGradient: string;
}

export default function CommunityDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newReply, setNewReply] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [replies, setReplies] = useState<Reply[]>([
    {
      id: 1,
      author: "@pedro_dev",
      content: "Gran pregunta! Yo uso useState para estado local simple y useReducer cuando tengo lógica compleja con múltiples estados relacionados. También considero el contexto - si varios componentes necesitan el mismo estado, Redux o Context API son mejores opciones.",
      timestamp: "Hace 2 horas",
      likes: 12,
      avatarGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      author: "@ana_codes",
      content: "Totalmente de acuerdo con @pedro_dev. Agregaría que para formularios complejos, react-hook-form es increíble porque reduce los re-renders y mejora el performance. Para estado global, Zustand es muy ligero y fácil de usar comparado con Redux.",
      timestamp: "Hace 1 hora",
      likes: 8,
      avatarGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 3,
      author: "@carlos_frontend",
      content: "No olviden React Query (ahora TanStack Query) para manejar estado del servidor! Es un game changer para fetch, cache y sincronización de datos. Lo combiné con Zustand para estado cliente y funciona perfecto.",
      timestamp: "Hace 30 min",
      likes: 15,
      avatarGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 4,
      author: "@maria_tech",
      content: "Excelentes consejos! También recomiendo usar el Context API con custom hooks para crear providers específicos. Por ejemplo, un AuthProvider, ThemeProvider, etc. Mantiene el código organizado y escalable.",
      timestamp: "Hace 15 min",
      likes: 6,
      avatarGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
  ]);

  // Thread data (en app real vendría del backend según el ID)
  const thread = {
    id: 1,
    title: "¿Cuál es la mejor forma de manejar estado en React 2024?",
    category: "React",
    author: "@juan_developer",
    authorRole: "Senior Frontend Developer",
    timestamp: "Hace 3 horas",
    views: 234,
    content: `Estoy trabajando en una aplicación React de tamaño medio y me pregunto cuál es el approach recomendado para gestión de estado en 2024.

He usado Redux en el pasado, pero últimamente veo mucha gente hablando de Zustand, Jotai, y otras alternativas más ligeras. También está el Context API nativo de React.

Mi aplicación tiene:
- Autenticación de usuarios
- Carrito de compras
- Preferencias de UI (tema, idioma)
- Datos de formularios
- Estado de loading/error para las llamadas API

¿Qué stack recomiendan? ¿Es overkill usar Redux para esto? ¿Deberían diferentes tipos de estado manejarse con diferentes herramientas?

Agradezco cualquier consejo o experiencia que puedan compartir!`,
    iconGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    tags: ["React", "State Management", "Redux", "Zustand"],
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const reply: Reply = {
      id: replies.length + 1,
      author: "@desarrollador",
      content: newReply,
      timestamp: "Justo ahora",
      likes: 0,
      avatarGradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    };

    setReplies([...replies, reply]);
    setNewReply("");
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
                Foro de la Comunidad
              </h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>
                // Participa en la discusión
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search 
                  size={18} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: "#9B8EC4" }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar proyectos, developers..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: "#F0EEFA",
                    borderColor: "#DDD6FE",
                    color: "#1A1A2E"
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AvatarDropdown />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: "#6B6880" }}>
            <button 
              onClick={() => navigate("/communities")}
              className="hover:underline"
              style={{ color: "#6B6880" }}
            >
              Comunidades
            </button>
            <ChevronRight size={16} />
            <span
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "#EDE9FA",
                color: "#7C3AED",
              }}
            >
              {thread.category}
            </span>
            <ChevronRight size={16} />
            <span style={{ color: "#1A1A2E" }}>Hilo de discusión</span>
          </div>

          {/* Thread Main Card */}
          <div className="bg-white rounded-xl overflow-hidden mb-6 border" style={{ 
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            {/* Colored Top Banner */}
            <div 
              className="h-20 relative"
              style={{ background: thread.iconGradient }}
            />

            {/* Category Icon - Overlapping */}
            <div 
              className="absolute top-12 left-8 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white"
              style={{ background: thread.iconGradient }}
            >
              {thread.category[0]}
            </div>

            <div className="p-8 pt-12">
              {/* Title */}
              <h1 className="text-3xl font-bold mb-4" style={{ color: "#1A1A2E" }}>
                {thread.title}
              </h1>

              {/* Author info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b" style={{ borderColor: "#EDE9FA" }}>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold border-2"
                  style={{ 
                    background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
                    borderColor: "rgba(124,58,237,0.4)"
                  }}
                >
                  J
                </div>
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: "#7C3AED" }}>
                    {thread.author}
                  </p>
                  <p className="text-sm" style={{ color: "#6B6880" }}>
                    {thread.authorRole}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm" style={{ color: "#6B6880" }}>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {thread.timestamp}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={16} />
                    {replies.length} respuestas
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-6">
                {thread.tags.map((tag) => (
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

              {/* Content */}
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: "#1A1A2E" }}>
                  {thread.content}
                </p>
              </div>
            </div>
          </div>

          {/* Replies Section */}
          <div className="bg-white rounded-xl p-8 border mb-6" style={{ 
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
              Respuestas ({replies.length})
            </h3>

            {/* Add Reply Form */}
            <form onSubmit={handleAddReply} className="mb-8">
              <div className="flex gap-3">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  rows={3}
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                  style={{ 
                    borderColor: "#EDE9FA",
                    backgroundColor: "#FAFAFA"
                  }}
                />
                <button
                  type="submit"
                  className="px-6 h-12 rounded-lg font-semibold text-white transition-all hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  <Send size={18} />
                  Responder
                </button>
              </div>
            </form>

            {/* Replies List */}
            <div className="space-y-6">
              {replies.map((reply, index) => (
                <div key={reply.id}>
                  <div className="flex gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 border-2"
                      style={{ 
                        background: reply.avatarGradient,
                        borderColor: "rgba(124,58,237,0.4)"
                      }}
                    >
                      {reply.author[1].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold" style={{ color: "#7C3AED" }}>
                          {reply.author}
                        </p>
                        <p className="text-sm" style={{ color: "#9B8EC4" }}>
                          {reply.timestamp}
                        </p>
                      </div>
                      <p className="mb-3 leading-relaxed" style={{ color: "#1A1A2E" }}>
                        {reply.content}
                      </p>
                      <button 
                        className="flex items-center gap-2 text-sm font-medium transition-all hover:opacity-70"
                        style={{ color: "#7C3AED" }}
                      >
                        <ThumbsUp size={16} />
                        <span>{reply.likes} Me gusta</span>
                      </button>
                    </div>
                  </div>
                  {index < replies.length - 1 && (
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
