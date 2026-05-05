import { useState, useRef, useEffect } from "react";
import { User, Settings, Palette, FileText, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";

export default function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://api.devhub.com/api/logout", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch {
      // si falla el request, el logout local sigue adelante
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const menuItems = [
    { label: "Mi Perfil", icon: User, action: () => navigate("/profile") },
    { label: "Ajustes", icon: Settings, action: () => navigate("/settings") },
    { label: "Personalización", icon: Palette, action: () => navigate("/customization") },
    { label: "Términos de Uso", icon: FileText, action: () => navigate("/terms") },
    { label: "Ayuda", icon: HelpCircle, action: () => navigate("/help") },
    { label: "Cerrar Sesión", icon: LogOut, action: handleLogout, divider: true, isLogout: true },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-all"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: "#7C3AED" }}
        >
          {authUser.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div className="text-left">
          <p className="font-semibold" style={{ color: "#1A1A2E" }}>@{authUser.username ?? "usuario"}</p>
          <p className="text-xs" style={{ color: "#6B6880" }}>Developer</p>
        </div>
        <ChevronDown
          size={16}
          style={{ color: "#6B6880" }}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.divider && <div className="border-t border-gray-200 my-2" />}
              <button
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
                style={{ color: item.isLogout ? "#DC2626" : "#1A1A2E" }}
              >
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}