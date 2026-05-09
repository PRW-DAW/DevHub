import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import { Users, Briefcase, Building2, Star, Search } from "lucide-react";
import { getTechTagColors } from "../utils/techTagColors";
import { useNavigate } from "react-router";

interface ApiUser {
  id: number;
  name: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  followers_count: number;
  projects_count: number;
  is_following: boolean;
}

interface Person {
  id: number;
  name: string;
  username: string;
  role: string;
  followers: number;
  projects: number;
  avatar: string;
  isFollowing: boolean;
  avatarGradient: string;
  rating: number;
  tags: string[];
}

interface Company {
  id: number;
  name: string;
  industry: string;
  employees: string;
  openPositions: number;
  logo: string;
  isFollowing: boolean;
  logoGradient: string;
}

const avatarGradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
];

const companies: Company[] = [
  { id: 1, name: "TechCorp Solutions", industry: "Tecnología", employees: "500-1000", openPositions: 12, logo: "T", isFollowing: false, logoGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: 2, name: "Digital Innovation Hub", industry: "Consultoría IT", employees: "200-500", openPositions: 8, logo: "D", isFollowing: true, logoGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { id: 3, name: "StartupXYZ", industry: "SaaS", employees: "50-100", openPositions: 5, logo: "S", isFollowing: false, logoGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { id: 4, name: "CloudTech Systems", industry: "Cloud Computing", employees: "1000+", openPositions: 15, logo: "C", isFollowing: false, logoGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
];

export default function Connect() {
  const [activeTab, setActiveTab] = useState<"people" | "companies">("people");
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [companiesList, setCompaniesList] = useState(companies);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();

  const mapUsers = (data: ApiUser[]): Person[] =>
    data.map((user) => ({
      id: user.id,
      name: user.name,
      username: `@${user.username}`,
      role: user.bio ?? "Developer",
      followers: user.followers_count,
      projects: user.projects_count,
      avatar: user.name[0].toUpperCase(),
      isFollowing: user.is_following,
      avatarGradient: avatarGradients[user.id % avatarGradients.length],
      rating: 0,
      tags: [],
    }));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://api.devhub.com/api/users?page=1", {
          headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPeopleList(mapUsers(data.data));
        setCurrentPage(1);
        setHasMore(data.next_page_url !== null);
      } catch {
        // silencioso
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery === "") return;
    const searchUsers = async () => {
      setSearching(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://api.devhub.com/api/users?search=${encodeURIComponent(searchQuery)}`, {
          headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPeopleList(mapUsers(data.data));
        setHasMore(false);
      } catch {
        console.error("Error al buscar usuarios");
      } finally {
        setSearching(false);
      }
    };
    const debounce = setTimeout(searchUsers, 400);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const token = localStorage.getItem("token");
      const nextPage = currentPage + 1;
      const res = await fetch(`http://api.devhub.com/api/users?page=${nextPage}`, {
        headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPeopleList((prev) => [...prev, ...mapUsers(data.data)]);
      setCurrentPage(nextPage);
      setHasMore(data.next_page_url !== null);
    } catch {
      console.error("Error al cargar más usuarios");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value === "") {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://api.devhub.com/api/users?page=1", {
          headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPeopleList(mapUsers(data.data));
        setCurrentPage(1);
        setHasMore(data.next_page_url !== null);
      } catch {
        console.error("Error al recargar usuarios");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleFollowPerson = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://api.devhub.com/api/follow/${id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPeopleList((prev) =>
        prev.map((person) =>
          person.id === id ? { ...person, isFollowing: data.following } : person
        )
      );
    } catch {
      console.error("Error al seguir/dejar de seguir");
    }
  };

  const toggleFollowCompany = (id: number) => {
    setCompaniesList(companiesList.map((company) =>
      company.id === id ? { ...company, isFollowing: !company.isFollowing } : company
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16} fill={i < rating ? "#F5C518" : "none"} stroke={i < rating ? "#F5C518" : "#D1D5DB"} />
    ));
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div style={{ height: "2px", background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 100%)" }} />
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Conectar</h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>// Descubre desarrolladores y empresas</p>
            </div>
            <div style={{ width: "220px" }}>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: "#9B8EC4" }} />
                <input type="text" value={searchQuery} onChange={handleSearchChange}
                  placeholder="Buscar developers..."
                  className="w-full pl-9 pr-3 py-2 rounded-full border focus:outline-none focus:ring-2 text-sm"
                  style={{ backgroundColor: "#F0EEFA", borderColor: "#DDD6FE", color: "#1A1A2E" }} />
              </div>
            </div>
            <AvatarDropdown />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Tabs */}
          <div className="bg-white rounded-xl p-6 mb-6 border" style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
            <div className="flex gap-4">
              <button onClick={() => setActiveTab("people")}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all"
                style={activeTab === "people" ? { backgroundColor: "#7C3AED", color: "white" } : { backgroundColor: "#F0EEFA", color: "#6B6880" }}>
                <Users size={20} />
                Personas
              </button>
              <button onClick={() => setActiveTab("companies")}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all"
                style={activeTab === "companies" ? { backgroundColor: "#7C3AED", color: "white" } : { backgroundColor: "#F0EEFA", color: "#6B6880" }}>
                <Briefcase size={20} />
                Empresas
              </button>
            </div>
          </div>

          {/* People Grid */}
          {activeTab === "people" && (
            <>
              {(loading || searching) && <p className="text-center py-12" style={{ color: "#9B8EC4" }}>{searching ? "Buscando..." : "Cargando usuarios..."}</p>}
              {!loading && !searching && peopleList.length === 0 && (
                <p className="text-center py-12" style={{ color: "#9B8EC4" }}>No hay usuarios todavía.</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!loading && !searching && peopleList.map((person) => (
                  <div key={person.id}
                    className="bg-white rounded-xl overflow-hidden transition-all border relative cursor-pointer hover:shadow-lg"
                    style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}
                    onClick={() => navigate(`/user/${person.id}`)}>
                    <div style={{ height: "4px", background: person.avatarGradient }} />
                    <div style={{ padding: "14px" }}>
                      <div className="flex flex-col items-center mb-3">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2 border-2"
                          style={{ background: person.avatarGradient, borderColor: "rgba(124,58,237,0.4)" }}>
                          {person.avatar}
                        </div>
                        <h3 className="font-bold text-center" style={{ fontSize: "17px", color: "#1A1A2E" }}>{person.name}</h3>
                        <p className="text-xs mb-1" style={{ color: "#9B8EC4" }}>// {person.username}</p>
                        <p className="text-xs mb-2" style={{ color: "#6B6880" }}>{person.role}</p>
                        <div className="flex gap-0.5 mb-2">{renderStars(person.rating)}</div>
                      </div>

                      {person.tags.length > 0 && (
                        <div className="flex gap-2 justify-center mb-3">
                          {person.tags.map((tag) => {
                            const tagColors = getTechTagColors(tag);
                            return (
                              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{ backgroundColor: tagColors.backgroundColor, color: tagColors.color }}>
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex justify-center items-center gap-2 mb-3 py-2 border-y" style={{ borderColor: "#EDE9FA", fontSize: "13px" }}>
                        <div className="flex items-center gap-1">
                          <span className="font-bold" style={{ color: "#1A1A2E" }}>{person.followers}</span>
                          <span style={{ color: "#6B6880" }}>Seguidores</span>
                        </div>
                        <span style={{ color: "#D1D5DB" }}>|</span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold" style={{ color: "#1A1A2E" }}>{person.projects}</span>
                          <span style={{ color: "#6B6880" }}>Proyectos</span>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFollowPerson(person.id); }}
                          className="rounded-full font-medium transition-all text-sm border"
                          style={{
                            width: "160px", height: "36px", margin: "0 auto",
                            ...(person.isFollowing
                              ? { color: "#6B6880", borderColor: "#D1D5DB", backgroundColor: "white" }
                              : { backgroundColor: "#7C3AED", color: "white", borderColor: "#7C3AED" })
                          }}>
                          {person.isFollowing ? "Siguiendo" : "Seguir"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && !searching && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-8 py-3 rounded-full font-semibold transition-all border-2"
                    style={{
                      borderColor: "#7C3AED",
                      color: "#7C3AED",
                      backgroundColor: "white",
                      opacity: loadingMore ? 0.7 : 1,
                    }}
                  >
                    {loadingMore ? "Cargando..." : "Ver más usuarios"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Companies Grid — sin cambios */}
          {activeTab === "companies" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companiesList.map((company) => (
                <div key={company.id}
                  className="bg-white rounded-xl overflow-hidden transition-all border relative cursor-pointer hover:shadow-lg"
                  style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}
                  onClick={() => navigate(`/company/${company.id}`)}>
                  <div style={{ height: "4px", background: company.logoGradient }} />
                  <div style={{ padding: "14px" }}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-bold mb-2 border-2"
                        style={{ background: company.logoGradient, borderColor: "rgba(124,58,237,0.4)" }}>
                        {company.logo}
                      </div>
                      <h3 className="font-bold text-center mb-1" style={{ fontSize: "17px", color: "#1A1A2E" }}>{company.name}</h3>
                      <div className="space-y-0.5 text-xs mb-3" style={{ color: "#6B6880" }}>
                        <div className="flex items-center justify-center gap-1.5"><Building2 size={14} />{company.industry}</div>
                        <div className="flex items-center justify-center gap-1.5"><Users size={14} />{company.employees} empleados</div>
                        <div className="flex items-center justify-center gap-1.5"><Briefcase size={14} />{company.openPositions} posiciones abiertas</div>
                      </div>
                    </div>
                    <div className="border-t mb-3" style={{ borderColor: "#EDE9FA" }} />
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFollowCompany(company.id); }}
                        className="rounded-full font-medium transition-all text-sm border"
                        style={{
                          width: "160px", height: "36px", margin: "0 auto",
                          ...(company.isFollowing
                            ? { color: "#6B6880", borderColor: "#D1D5DB", backgroundColor: "white" }
                            : { backgroundColor: "#7C3AED", color: "white", borderColor: "#7C3AED" })
                        }}>
                        {company.isFollowing ? "Siguiendo" : "Seguir"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}