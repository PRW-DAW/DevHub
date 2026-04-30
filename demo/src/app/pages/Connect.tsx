import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";
import { Users, Briefcase, UserPlus, Building2, Star, Search } from "lucide-react";
import { getTechTagColors } from "../utils/techTagColors";
import { useNavigate } from "react-router";

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

const people: Person[] = [
  {
    id: 1,
    name: "María García",
    username: "@maria_codes",
    role: "Frontend Developer",
    followers: 523,
    projects: 12,
    avatar: "M",
    isFollowing: false,
    avatarGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    rating: 5,
    tags: ["React", "TypeScript"],
  },
  {
    id: 2,
    name: "Carlos Mendez",
    username: "@carlos_dev",
    role: "Full Stack Developer",
    followers: 342,
    projects: 18,
    avatar: "C",
    isFollowing: true,
    avatarGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    rating: 4,
    tags: ["Node.js", "React"],
  },
  {
    id: 3,
    name: "Laura Sánchez",
    username: "@laura_backend",
    role: "Backend Engineer",
    followers: 456,
    projects: 9,
    avatar: "L",
    isFollowing: false,
    avatarGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    rating: 5,
    tags: ["Python", "Django"],
  },
  {
    id: 4,
    name: "Juan Pérez",
    username: "@juan_mobile",
    role: "Mobile Developer",
    followers: 289,
    projects: 15,
    avatar: "J",
    isFollowing: false,
    avatarGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    rating: 4,
    tags: ["React Native", "Flutter"],
  },
  {
    id: 5,
    name: "Sofía Rodríguez",
    username: "@sofia_design",
    role: "UI/UX Developer",
    followers: 678,
    projects: 24,
    avatar: "S",
    isFollowing: true,
    avatarGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    rating: 5,
    tags: ["Figma", "CSS"],
  },
  {
    id: 6,
    name: "Pedro Martínez",
    username: "@pedro_devops",
    role: "DevOps Engineer",
    followers: 412,
    projects: 7,
    avatar: "P",
    isFollowing: false,
    avatarGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    rating: 4,
    tags: ["Docker", "K8s"],
  },
];

const companies: Company[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Tecnología",
    employees: "500-1000",
    openPositions: 12,
    logo: "T",
    isFollowing: false,
    logoGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    name: "Digital Innovation Hub",
    industry: "Consultoría IT",
    employees: "200-500",
    openPositions: 8,
    logo: "D",
    isFollowing: true,
    logoGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 3,
    name: "StartupXYZ",
    industry: "SaaS",
    employees: "50-100",
    openPositions: 5,
    logo: "S",
    isFollowing: false,
    logoGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 4,
    name: "CloudTech Systems",
    industry: "Cloud Computing",
    employees: "1000+",
    openPositions: 15,
    logo: "C",
    isFollowing: false,
    logoGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

export default function Connect() {
  const [activeTab, setActiveTab] = useState<"people" | "companies">("people");
  const [peopleList, setPeopleList] = useState(people);
  const [companiesList, setCompaniesList] = useState(companies);
  const navigate = useNavigate();

  const toggleFollowPerson = (id: number) => {
    setPeopleList(
      peopleList.map((person) =>
        person.id === id ? { ...person, isFollowing: !person.isFollowing } : person
      )
    );
  };

  const toggleFollowCompany = (id: number) => {
    setCompaniesList(
      companiesList.map((company) =>
        company.id === id
          ? { ...company, isFollowing: !company.isFollowing }
          : company
      )
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#F5C518" : "none"}
        stroke={i < rating ? "#F5C518" : "#D1D5DB"}
      />
    ));
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
          <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Conectar
              </h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>
                // Descubre desarrolladores y empresas
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

            <AvatarDropdown />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Tabs */}
          <div className="bg-white rounded-xl p-6 mb-6 border" style={{ 
            borderColor: "#EDE9FA",
            boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
          }}>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("people")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "people"
                    ? "text-white"
                    : ""
                }`}
                style={
                  activeTab === "people" ? { backgroundColor: "#7C3AED", color: "white" } : { backgroundColor: "#F0EEFA", color: "#6B6880" }
                }
              >
                <Users size={20} />
                Personas
              </button>
              <button
                onClick={() => setActiveTab("companies")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "companies"
                    ? "text-white"
                    : ""
                }`}
                style={
                  activeTab === "companies" ? { backgroundColor: "#7C3AED", color: "white" } : { backgroundColor: "#F0EEFA", color: "#6B6880" }
                }
              >
                <Briefcase size={20} />
                Empresas
              </button>
            </div>
          </div>

          {/* People Grid */}
          {activeTab === "people" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peopleList.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-xl overflow-hidden transition-all border relative cursor-pointer hover:shadow-lg"
                  style={{ 
                    borderColor: "#EDE9FA",
                    boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
                  }}
                  onClick={() => navigate(`/user/${person.id}`)}
                >
                  {/* Top color stripe */}
                  <div 
                    style={{ 
                      height: "4px",
                      background: person.avatarGradient
                    }}
                  />
                  
                  <div style={{ padding: "14px" }}>
                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-3">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2 border-2"
                        style={{ 
                          background: person.avatarGradient,
                          borderColor: "rgba(124,58,237,0.4)"
                        }}
                      >
                        {person.avatar}
                      </div>
                      <h3 className="font-bold text-center" style={{ fontSize: "17px", color: "#1A1A2E" }}>
                        {person.name}
                      </h3>
                      <p className="text-xs mb-1" style={{ color: "#9B8EC4" }}>// {person.username}</p>
                      <p className="text-xs mb-2" style={{ color: "#6B6880" }}>{person.role}</p>
                      
                      {/* Rating */}
                      <div className="flex gap-0.5 mb-2">
                        {renderStars(person.rating)}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 justify-center mb-3">
                      {person.tags.map((tag) => {
                        const tagColors = getTechTagColors(tag);
                        return (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
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

                    {/* Stats - Compact horizontal */}
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

                    {/* Follow Button - Centered */}
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollowPerson(person.id);
                        }}
                        className={`rounded-full font-medium transition-all text-sm border ${
                          person.isFollowing
                            ? ""
                            : "text-white"
                        }`}
                        style={{
                          width: "160px",
                          height: "36px",
                          margin: "0 auto",
                          ...(person.isFollowing 
                            ? { color: "#6B6880", borderColor: "#D1D5DB", backgroundColor: "white" } 
                            : { backgroundColor: "#7C3AED", color: "white", borderColor: "#7C3AED" }
                          )
                        }}
                      >
                        {person.isFollowing ? "Siguiendo" : "Seguir"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Companies Grid */}
          {activeTab === "companies" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companiesList.map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded-xl overflow-hidden transition-all border relative cursor-pointer hover:shadow-lg"
                  style={{ 
                    borderColor: "#EDE9FA",
                    boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
                  }}
                  onClick={() => navigate(`/company/${company.id}`)}
                >
                  {/* Top color stripe */}
                  <div 
                    style={{ 
                      height: "4px",
                      background: company.logoGradient
                    }}
                  />
                  
                  <div style={{ padding: "14px" }}>
                    {/* Centered Layout - Same as People */}
                    <div className="flex flex-col items-center text-center">
                      {/* Logo - Square centered 48px */}
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-bold mb-2 border-2"
                        style={{ 
                          background: company.logoGradient,
                          borderColor: "rgba(124,58,237,0.4)"
                        }}
                      >
                        {company.logo}
                      </div>

                      {/* Name - Centered */}
                      <h3 className="font-bold text-center mb-1" style={{ fontSize: "17px", color: "#1A1A2E" }}>
                        {company.name}
                      </h3>

                      {/* Info - Centered */}
                      <div className="space-y-0.5 text-xs mb-3" style={{ color: "#6B6880" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          <Building2 size={14} />
                          {company.industry}
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <Users size={14} />
                          {company.employees} empleados
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <Briefcase size={14} />
                          {company.openPositions} posiciones abiertas
                        </div>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t mb-3" style={{ borderColor: "#EDE9FA" }} />

                    {/* Follow Button - Centered */}
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollowCompany(company.id);
                        }}
                        className={`rounded-full font-medium transition-all text-sm border ${
                          company.isFollowing
                            ? ""
                            : "text-white"
                        }`}
                        style={{
                          width: "160px",
                          height: "36px",
                          margin: "0 auto",
                          ...(company.isFollowing 
                            ? { color: "#6B6880", borderColor: "#D1D5DB", backgroundColor: "white" } 
                            : { backgroundColor: "#7C3AED", color: "white", borderColor: "#7C3AED" }
                          )
                        }}
                      >
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