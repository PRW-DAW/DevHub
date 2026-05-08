import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import StarRating from "../components/StarRating";
import AddProjectModal from "../components/AddProjectModal";
import { Users, Eye, MessageCircle, ExternalLink, Plus, Trash2, X } from "lucide-react";
import { getTechTagColors } from "../utils/techTagColors";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  project_link: string;
  github_link: string | null;
  views_count: number;
  comments_count: number;
}

interface AuthUser {
  id: number;
  name: string;
  username: string;
  bio: string | null;
  avatar: string | null;
}

export default function Profile() {
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [authUser, setAuthUser] = useState<AuthUser>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [bioInput, setBioInput] = useState(authUser.bio ?? "");
  const [savingBio, setSavingBio] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const resProjects = await fetch("http://api.devhub.com/api/me/projects", {
          headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
        });
        if (resProjects.ok) {
          const dataProjects = await resProjects.json();
          setProjects(dataProjects.data);
        }

        const resMe = await fetch("http://api.devhub.com/api/me", {
          headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
        });
        if (resMe.ok) {
          const dataMe = await resMe.json();
          setFollowersCount(dataMe.followers_count);
          setFollowingCount(dataMe.following_count);
        }
      } catch {
        // silencioso
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveBio = async () => {
    setSavingBio(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://api.devhub.com/api/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ bio: bioInput }),
      });
      if (!res.ok) throw new Error();
      const updatedUser = await res.json();
      const newUser = { ...authUser, bio: updatedUser.bio };
      setAuthUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsEditModalOpen(false);
    } catch {
      console.error("Error al guardar la bio");
    } finally {
      setSavingBio(false);
    }
  };

  const handleAddProject = async (projectData: {
    title: string;
    description: string;
    tags: string[];
    projectLink: string;
    githubLink: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://api.devhub.com/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: projectData.title,
          description: projectData.description,
          tags: projectData.tags,
          project_link: projectData.projectLink,
          github_link: projectData.githubLink || null,
        }),
      });
      if (!res.ok) throw new Error();
      const newProject = await res.json();
      setProjects((prev) => [newProject, ...prev]);
      setIsAddProjectModalOpen(false);
    } catch {
      console.error("Error al publicar proyecto");
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!confirm("¿Seguro que quieres eliminar este proyecto?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://api.devhub.com/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error();
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch {
      console.error("Error al eliminar el proyecto");
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div style={{ height: "2px", background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 100%)" }} />
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Mi Perfil</h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>// Gestiona tu perfil profesional</p>
            </div>
            <AvatarDropdown />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-8 py-6 space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border" style={{
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            <div className="relative" style={{
              height: "70px",
              background: "linear-gradient(135deg, #EDE9FA 0%, #DDD6FE 100%)",
            }}>
              <div className="absolute inset-0" style={{
                opacity: 0.05,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='14' fill='%237C3AED'%3E%7B%7D%3C/text%3E%3Ctext x='40' y='20' font-family='monospace' font-size='14' fill='%237C3AED'%3E%3C%3E%3C/text%3E%3Ctext x='10' y='50' font-family='monospace' font-size='14' fill='%237C3AED'%3E%3B%3C/text%3E%3Ctext x='40' y='50' font-family='monospace' font-size='14' fill='%237C3AED'%3E()%3C/text%3E%3Ctext x='10' y='70' font-family='monospace' font-size='14' fill='%237C3AED'%3E%5B%5D%3C/text%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
              }} />
            </div>
            <div className="px-8 pb-6">
              <div className="relative -mt-14 mb-4">
                <div className="w-28 h-28 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold"
                  style={{ backgroundColor: "#7C3AED", boxShadow: "0 4px 16px rgba(124, 58, 237, 0.3)" }}>
                  {authUser.name?.[0]?.toUpperCase() ?? "?"}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>{authUser.name}</h2>
                  <p className="text-lg" style={{ color: "#9B8EC4" }}>// @{authUser.username}</p>
                </div>
                <button
                  onClick={() => {
                    setBioInput(authUser.bio ?? "");
                    setIsEditModalOpen(true);
                  }}
                  className="px-5 py-2 rounded-full font-semibold transition-all hover:bg-opacity-10 border-2 text-sm"
                  style={{ borderColor: "#7C3AED", color: "#7C3AED", backgroundColor: "transparent" }}>
                  Editar Perfil
                </button>
              </div>
              <p className="mb-6 max-w-2xl leading-relaxed" style={{ color: "#1A1A2E" }}>
                {authUser.bio ?? "Sin bio todavía."}
              </p>
              <div className="flex items-center gap-6 py-4 px-6 rounded-lg border" style={{
                borderColor: "#EDE9FA", backgroundColor: "#FAFAFA"
              }}>
                <div className="flex items-center gap-2">
                  <Users size={20} style={{ color: "#7C3AED" }} />
                  <span className="font-bold" style={{ color: "#1A1A2E" }}>{followersCount}</span>
                  <span className="text-sm" style={{ color: "#6B6880" }}>Seguidores</span>
                </div>
                <div style={{ width: "2px", height: "24px", backgroundColor: "#7C3AED", opacity: 0.2 }} />
                <div className="flex items-center gap-2">
                  <Users size={20} style={{ color: "#7C3AED" }} />
                  <span className="font-bold" style={{ color: "#1A1A2E" }}>{followingCount}</span>
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
              <h3 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Mis Proyectos</h3>
              <button onClick={() => setIsAddProjectModalOpen(true)}
                className="px-4 py-2 rounded-full font-semibold text-white transition-all hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: "#7C3AED" }}>
                <Plus size={18} />
                Nuevo Proyecto
              </button>
            </div>

            {loadingProjects && <p className="text-center py-8" style={{ color: "#9B8EC4" }}>Cargando proyectos...</p>}

            {!loadingProjects && filteredProjects.length === 0 && (
              <p className="text-center py-8" style={{ color: "#9B8EC4" }}>No tienes proyectos todavía.</p>
            )}

            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <div key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="text-left border rounded-lg p-6 transition-all relative"
                  style={{
                    borderColor: hoveredProject === project.id ? "#7C3AED" : "#EDE9FA",
                    boxShadow: hoveredProject === project.id ? "0 4px 16px rgba(124,58,237,0.12)" : "none"
                  }}>

                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1.5 rounded-lg transition-all hover:bg-red-50"
                      style={{ color: "#DC2626" }}
                      title="Eliminar proyecto"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/project/${project.id}`)}
                      className="transition-opacity"
                      style={{ color: "#7C3AED", opacity: hoveredProject === project.id ? 1 : 0 }}
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>

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
                      <div className="flex items-center gap-2">
                        <Eye size={18} />
                        <span className="text-sm">{project.views_count}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle size={18} />
                        <span className="text-sm">{project.comments_count}</span>
                      </div>
                    </div>
                    <StarRating initialRating={0} />
                  </div>
                </div>
              ))}
            </div>

            <AddProjectModal
              isOpen={isAddProjectModalOpen}
              onClose={() => setIsAddProjectModalOpen(false)}
              onSubmit={handleAddProject}
            />
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg border"
            style={{
              borderColor: "#EDE9FA",
              boxShadow: "0 8px 32px rgba(124,58,237,0.15)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "#EDE9FA" }}>
              <h2 className="text-xl font-bold" style={{ color: "#1A1A2E" }}>Editar Perfil</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                style={{ color: "#6B6880" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  BIO
                </label>
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  placeholder="Cuéntanos algo sobre ti..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                  style={{ borderColor: "#EDE9FA", backgroundColor: "#FAFAFA" }}
                />
                <p className="text-xs mt-1 text-right" style={{ color: "#9B8EC4" }}>
                  {bioInput.length}/500
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={handleSaveBio}
                disabled={savingBio}
                className="flex-1 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "#7C3AED", opacity: savingBio ? 0.7 : 1 }}
              >
                {savingBio ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-3 rounded-full font-semibold transition-all border-2"
                style={{ borderColor: "#DDD6FE", color: "#6B6880", backgroundColor: "white" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
