import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import StarRating from "../components/StarRating";
import { Users, Eye, MessageCircle, ExternalLink, ChevronRight } from "lucide-react";
import { getTechTagColors } from "../utils/techTagColors";

interface UserData {
  id: number;
  name: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  followers_count: number;
  following_count: number;
  projects_count: number;
  is_following: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  project_link: string;
  github_link: string | null;
}

const avatarGradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
];

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        };

        const [resUser, resProjects] = await Promise.all([
          fetch(`http://api.devhub.com/api/users/${id}`, { headers }),
          fetch(`http://api.devhub.com/api/users/${id}/projects`, { headers }),
        ]);

        if (!resUser.ok) throw new Error("Usuario no encontrado");

        const dataUser = await resUser.json();
        const dataProjects = await resProjects.json();

        setUser(dataUser);
        setProjects(dataProjects.data);
      } catch {
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleFollow = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://api.devhub.com/api/follow/${user.id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser((prev) => prev ? {
        ...prev,
        is_following: data.following,
        followers_count: data.following ? prev.followers_count + 1 : prev.followers_count - 1,
      } : prev);
    } catch {
      console.error("Error al seguir/dejar de seguir");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F0EEFA" }}>
      <p style={{ color: "#9B8EC4" }}>Cargando perfil...</p>
    </div>
  );

  if (error || !user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F0EEFA" }}>
      <p style={{ color: "#B91C1C" }}>{error || "Usuario no encontrado."}</p>
    </div>
  );

  const gradient = avatarGradients[user.id % avatarGradients.length];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div style={{ height: "2px", background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 100%)" }} />

        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Perfil</h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>// Perfil de desarrollador</p>
            </div>
            <AvatarDropdown />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-8 py-6 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm" style={{ color: "#6B6880" }}>
            <button onClick={() => navigate("/connect")} className="hover:underline" style={{ color: "#6B6880" }}>
              Conectar
            </button>
            <ChevronRight size={16} />
            <span style={{ color: "#1A1A2E" }}>@{user.username}</span>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border" style={{
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            <div style={{ height: "70px", background: gradient, opacity: 0.3 }} />
            <div className="px-8 pb-6">
              <div className="relative -mt-14 mb-4 flex items-end justify-between">
                <div className="w-28 h-28 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold"
                  style={{ background: gradient, boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
                  {user.name[0].toUpperCase()}
                </div>
                <button
                  onClick={toggleFollow}
                  className="px-6 py-2 rounded-full font-semibold transition-all border-2 text-sm mb-2"
                  style={user.is_following
                    ? { borderColor: "#D1D5DB", color: "#6B6880", backgroundColor: "white" }
                    : { borderColor: "#7C3AED", color: "white", backgroundColor: "#7C3AED" }
                  }>
                  {user.is_following ? "Siguiendo" : "Seguir"}
                </button>
              </div>

              <h2 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>{user.name}</h2>
              <p className="text-lg mb-4" style={{ color: "#9B8EC4" }}>// @{user.username}</p>
              <p className="mb-6 max-w-2xl leading-relaxed" style={{ color: "#1A1A2E" }}>
                {user.bio ?? "Sin bio todavía."}
              </p>

              <div className="flex items-center gap-6 py-4 px-6 rounded-lg border" style={{
                borderColor: "#EDE9FA", backgroundColor: "#FAFAFA"
              }}>
                <div className="flex items-center gap-2">
                  <Users size={20} style={{ color: "#7C3AED" }} />
                  <span className="font-bold" style={{ color: "#1A1A2E" }}>{user.followers_count}</span>
                  <span className="text-sm" style={{ color: "#6B6880" }}>Seguidores</span>
                </div>
                <div style={{ width: "2px", height: "24px", backgroundColor: "#7C3AED", opacity: 0.2 }} />
                <div className="flex items-center gap-2">
                  <Users size={20} style={{ color: "#7C3AED" }} />
                  <span className="font-bold" style={{ color: "#1A1A2E" }}>{user.following_count}</span>
                  <span className="text-sm" style={{ color: "#6B6880" }}>Siguiendo</span>
                </div>
                <div style={{ width: "2px", height: "24px", backgroundColor: "#7C3AED", opacity: 0.2 }} />
                <div className="flex items-center gap-2">
                  <Users size={20} style={{ color: "#7C3AED" }} />
                  <span className="font-bold" style={{ color: "#1A1A2E" }}>{user.projects_count}</span>
                  <span className="text-sm" style={{ color: "#6B6880" }}>Proyectos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-xl p-8 border" style={{
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>Proyectos</h3>

            {projects.length === 0 && (
              <p className="text-center py-8" style={{ color: "#9B8EC4" }}>Este usuario no tiene proyectos todavía.</p>
            )}

            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="border rounded-lg p-6 transition-all relative"
                  style={{
                    borderColor: hoveredProject === project.id ? "#7C3AED" : "#EDE9FA",
                    boxShadow: hoveredProject === project.id ? "0 4px 16px rgba(124,58,237,0.12)" : "none"
                  }}>
                  <button onClick={() => navigate(`/project/${project.id}`)}
                    className="absolute top-6 right-6 transition-opacity"
                    style={{ color: "#7C3AED", opacity: hoveredProject === project.id ? 1 : 0 }}>
                    <ExternalLink size={18} />
                  </button>
                  <button onClick={() => navigate(`/project/${project.id}`)} className="text-left w-full">
                    <h4 className="text-xl font-bold mb-3 hover:underline" style={{ color: "#7C3AED" }}>
                      {project.title}
                    </h4>
                  </button>
                  <p className="mb-4 leading-relaxed" style={{ color: "#1A1A2E" }}>{project.description}</p>
                  <div className="flex gap-2 mb-4">
                    {project.tags?.map((tag) => {
                      const tagColors = getTechTagColors(tag);
                      return (
                        <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ backgroundColor: tagColors.backgroundColor, color: tagColors.color }}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#EDE9FA" }}>
                    <div className="flex items-center gap-6" style={{ color: "#6B6880" }}>
                      <div className="flex items-center gap-2"><Eye size={18} /><span className="text-sm">0</span></div>
                      <div className="flex items-center gap-2"><MessageCircle size={18} /><span className="text-sm">0</span></div>
                    </div>
                    <StarRating initialRating={0} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}