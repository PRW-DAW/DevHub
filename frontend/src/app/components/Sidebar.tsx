import { LayoutGrid, User, Link as LinkIcon, Briefcase } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navItems = [
  { name: "Feed", icon: LayoutGrid, path: "/feed" },
  { name: "Perfil", icon: User, path: "/profile" },
  { name: "Conectar", icon: LinkIcon, path: "/connect" },
  { name: "Empleo", icon: Briefcase, path: "/companies" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-sm flex flex-col border-r" style={{ borderColor: "#E5E0F5" }}>
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: "#EDE9FA" }}>
        <img
          src="/de-lado.svg"
          alt="DevHub Logo"
          onClick={() => navigate("/feed")}
          style={{ height: "36px", width: "auto", cursor: "pointer" }}
        />
        <p className="text-xs" style={{ color: "#9B8EC4" }}>// v2.0.1</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <p className="text-xs font-semibold mb-4 px-3" style={{ color: "#9B8EC4" }}>// NAVEGACIÓN</p>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "text-white font-semibold"
                  : "hover:bg-gray-50"
              }`}
              style={
                location.pathname === item.path
                  ? { backgroundColor: "#7C3AED", color: "white" }
                  : { color: "#1A1A2E" }
              }
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Strength Widget */}
      <div className="p-4 border-t" style={{ borderColor: "#EDE9FA" }}>
        <div className="bg-white rounded-lg p-4 border" style={{ 
          borderColor: "#EDE9FA",
          boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
        }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>Fortaleza del perfil</p>
            <p className="text-sm font-bold" style={{ color: "#7C3AED" }}>85%</p>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#EDE9FA" }}>
            <div className="h-full rounded-full" style={{ width: "85%", backgroundColor: "#7C3AED" }} />
          </div>
          <p className="text-xs mt-2" style={{ color: "#9B8EC4" }}>// Completa tu perfil</p>
        </div>
      </div>
    </div>
  );
}